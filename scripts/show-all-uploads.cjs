const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function showAllUserImages() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1600, height: 1200 }
  });
  const page = await browser.newPage();

  // Copy all into public/images/inspect/
  const dir = 'public/images/inspect';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const uploads = [
    'media_1793606417930_4bdf1a98.jpg',
    'media_1793606439876_e9d21a77.jpg',
    'media_1793606454881_c1c9f737.jpg',
    'media_1793606467563_5b6da0eb.jpg',
    'media_1793606482836_69d86082.jpg',
    'media_1793608197386_26fc6581.jpg',
    'media_1793608206256_d1525811.jpg',
    'media_1793608215238_015e1ae3.jpg'
  ];

  for (const file of uploads) {
    fs.copyFileSync(
      'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/' + file,
      dir + '/' + file
    );
  }

  const html = `<!DOCTYPE html>
  <body style="margin:0; background:#222; color:#fff; font-family:sans-serif; padding:20px;">
    <h2>Inspect All User Uploaded Images</h2>
    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px;">
      ${uploads.map(f => `
        <div style="background:#333; padding:10px; border-radius:8px;">
          <div style="font-size:11px; margin-bottom:6px; word-break:break-all;">${f}</div>
          <img src="http://localhost:5173/images/inspect/${f}" style="width:100%; height:260px; object-fit:cover; border-radius:6px;"/>
        </div>
      `).join('')}
    </div>
  </body>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/all-user-uploads.png' });
  await browser.close();
  console.log('Saved all-user-uploads.png');
}

showAllUserImages().catch(console.error);

