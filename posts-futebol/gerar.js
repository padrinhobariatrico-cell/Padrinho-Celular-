// Gera um PNG 1080x1080 para cada <section class="post"> de posts.html
// Uso: node gerar.js
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'posts.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const posts = await page.$$('section.post');
  for (const post of posts) {
    const id = await post.getAttribute('id');
    const out = path.join(__dirname, 'imagens', `post-${id.slice(1).padStart(2, '0')}.png`);
    await post.screenshot({ path: out });
    console.log('ok', out);
  }
  await browser.close();
})();
