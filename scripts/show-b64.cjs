const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function showBase64() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1600, height: 1200 }
  });
  const page = await browser.newPage();

  const files = [
    'media_1793606417930_4bdf1a98.jpg',
    'media_1793606439876_e9d21a77.jpg',
    'media_1793606454881_c1c9f737.jpg',
    'media_1793606467563_5b6da0eb.jpg',
    'media_1793606482836_69d86082.jpg',
    'media_1793608197386_26fc6581.jpg',
    'media_1793608206256_d1525811.jpg',
    'media_1793608215238_015e1ae3.jpg'
  ];

  const cards = files.map(f => {
    const p = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/' + f;
    if (fs.existsSync(p)) {
      const b64 = fs.readFileSync(p).toString('base64');
      return `
        <div style="background:#222; padding:10px; border-radius:8px;">
          <div style="font-size:11px; margin-bottom:6px;">${f}</div>
          <img src="data:image/jpeg;base64,${b64}" style="width:100%; height:250px; object-fit:cover; border-radius:6px;"/>
        </div>
      `;
    }
    return '';
  }).join('');

  await page.setContent(`<!DOCTYPE html>
  <body style="margin:0; background:#111; color:#fff; font-family:sans-serif; padding:20px;">
    <h2>Inspect User Uploads (Base64)</h2>
    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px;">
      ${cards}
    </div>
  </body>`);

  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/all-user-uploads-b64.png' });
  await browser.close();
  console.log('Saved all-user-uploads-b64.png');
}

showBase64().catch(console.error);

