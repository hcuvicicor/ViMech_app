// Validación del catálogo de ViMech.
// Uso:  node tools/validar_datos.js            (desde la carpeta de la app)
// Comprueba coherencia interna de valvesData antes de publicar cambios.
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const js = html.split('<script>')[1].split('</script>')[0];
// Ejecuta sólo la parte de datos (sin DOM)
const start = js.indexOf('const SRC =');
const end = js.indexOf('// =====================================================================\n        //  ESTADO Y UTILIDADES');
const valvesData = new Function(js.slice(start, end) + '; return valvesData;')();

const errors = [], warnings = [];
const sizeTokens = s => { const str = String(s); if (!str.includes('/')) return [str]; const [a, b] = str.split('/').map(Number); const o = []; for (let x = a; x <= b; x += 2) o.push(String(x)); return o; };
const ids = new Set();
for (const b of valvesData) {
  if (ids.has(b.id)) errors.push(`id de marca duplicado: ${b.id}`); ids.add(b.id);
  for (const pos of ['aortic', 'mitral']) for (const st of b.positions[pos] || []) {
    const n = `${b.name} | ${pos} | ${st.subtypeName.en}`;
    if (!st.subtypeName.es) errors.push(`${n}: falta nombre en español`);
    if (!st.specs || !st.specs.length) { warnings.push(`${n}: sin dimensiones todavía`); continue; }
    if (st.verified && !(st.source || []).some(s => s && s.label)) errors.push(`${n}: verified=true sin fuente`);
    const sizes = st.specs.map(r => String(r.size));
    if (new Set(sizes).size !== sizes.length) errors.push(`${n}: tallas repetidas`);
    for (let i = 1; i < st.specs.length; i++) {
      const a = st.specs[i - 1], c = st.specs[i];
      if (parseInt(c.size) <= parseInt(a.size)) errors.push(`${n}: tallas desordenadas ${a.size}→${c.size}`);
      if (typeof a.id === 'number' && typeof c.id === 'number' && c.id < a.id) errors.push(`${n}: DI decrece ${a.size}→${c.size}`);
      for (const k of ['goa', 'oa']) if (typeof a[k] === 'number' && typeof c[k] === 'number' && c[k] < a[k]) errors.push(`${n}: ${k} decrece ${a.size}→${c.size}`);
    }
    for (const r of st.specs) {
      if (typeof r.id === 'number' && typeof r.tad === 'number' && r.id > r.tad) errors.push(`${n} ${r.size}: DI mayor que TAD`);
      if (typeof r.id === 'number' && (r.id < 10 || r.id > 35)) errors.push(`${n} ${r.size}: DI fuera de rango (${r.id})`);
    }
    if (st.taviTable) {
      const spec = new Set(st.specs.flatMap(r => sizeTokens(r.size)));
      const tavi = new Set(st.taviTable.map(r => String(r.size)));
      const orphan = [...tavi].filter(s => !spec.has(s));
      const missing = sizes.filter(s => !sizeTokens(s).some(x => tavi.has(x)));
      if (orphan.length) warnings.push(`${n}: filas TAVI sin talla en specs → ${orphan.join(', ')}`);
      if (missing.length) warnings.push(`${n}: tallas sin fila TAVI → ${missing.join(', ')}`);
      for (const r of st.taviTable) for (const k of ['myval', 's3', 'evolut', 'allegra', 'navitor', 'vitaflow'])
        if (r[k] === undefined) errors.push(`${n} TAVI ${r.size}: falta ${k}`);
    }
    if (!st.verified) warnings.push(`${n}: datos sin fuente oficial`);
  }
}
console.log(`Marcas: ${valvesData.length} · Subtipos: ${valvesData.reduce((a, b) => a + b.positions.aortic.length + b.positions.mitral.length, 0)}`);
warnings.forEach(w => console.log('AVISO  ' + w));
errors.forEach(e => console.log('ERROR  ' + e));
console.log(errors.length ? `\n${errors.length} errores` : '\nSin errores');
process.exit(errors.length ? 1 : 0);
