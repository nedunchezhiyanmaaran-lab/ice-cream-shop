const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function renderGallery() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1800, height: 1600 }
  });
  const page = await browser.newPage();

  const dir = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded';
  const files = fs.readdirSync(dir);

  const items = files.map(f => {
    const full = path.join(dir, f);
    const b64 = fs.readFileSync(full).toString('base64');
    const ext = path.extname(f).slice(1) === 'png' ? 'image/png' : 'image/jpeg';
    return { name: f, b64: `data:${ext};base64,${b64}` };
  });

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; background: #18181b; color: #fff; font-family: system-ui, sans-serif; padding: 24px; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
      .card { background: #27272a; border-radius: 8px; overflow: hidden; padding: 10px; border: 1px solid #3f3f46; }
      .card img { width: 100%; height: 260px; object-fit: contain; background: #09090b; border-radius: 4px; }
      .card p { font-size: 11px; margin: 8px 0 0; color: #a1a1aa; word-break: break-all; }
    </style>
  </head>
  <body>
    <h2>All User Uploaded Images (${items.length} files)</h2>
    <div class="grid">
      ${items.map(item => `
        <div class="card">
          <img src="${item.b64}" />
          <p>${item.name}</p>
        </div>
      `).join('')}
    </div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/all-user-uploads-gallery.png', fullPage: true });
  await browser.close();
  console.log('Saved all-user-uploads-gallery.png');
}

renderGallery().catch(console.error);

