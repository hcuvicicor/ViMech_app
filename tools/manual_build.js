// Genera el manual PDF. Uso: node tools/manual_build.js <carpeta_build> <lang> <salida.pdf>
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const [dir, lang, out] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, locale: lang });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const url = 'file://' + path.join(dir, 'index.html');
  await p.goto(url); await p.evaluate(l => { localStorage.setItem('valve-app-language', l); localStorage.setItem('valve-app-theme2', 'light'); }, lang);
  await p.goto(url); await p.waitForTimeout(600);
  await p.addScriptTag({ content: fs.readFileSync(path.join(__dirname, 'manual_content.js'), 'utf8') });
  await p.evaluate(l => buildManual(l), lang);
  await p.evaluate(async () => { await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  const broken = await p.evaluate(() => [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')));
  await p.emulateMedia({ media: 'print' });
  await p.pdf({ path: out, format: 'A4', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="font-size:7pt;color:#6f7c94;width:100%;padding:0 14mm;display:flex;justify-content:space-between;font-family:Segoe UI,Arial,sans-serif"><span>ViMech — ${lang === 'es' ? 'Manual de usuario' : 'User manual'} · hcuvicicor.github.io/ViMech_app</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' } });
  console.log(lang, 'errors', errs, 'broken', broken);
  await b.close();
})();
