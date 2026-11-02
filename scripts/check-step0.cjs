const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function checkStep0Images() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 900 }
  });
  const page = await browser.newPage();

  const files = [
    'media_1793606417930_4bdf1a98.jpg',
    'media_1793606439876_e9d21a77.jpg',
    'media_1793606454881_c1c9f737.jpg',
    'media_1793606467563_5b6da0eb.jpg',
    'media_1793606482836_69d86082.jpg'
  ];

  const html = `<!DOCTYPE html>
  <body style="margin:0; background:#111; color:#fff; font-family:sans-serif; padding:20px; display:grid; grid-template-columns:repeat(5, 1fr); gap:12px;">
    ${files.map(f => {
      const b64 = fs.readFileSync('C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/' + f).toString('base64');
      return `<div>
        <p style="font-size:10px;">${f}</p>
        <img src="data:image/jpeg;base64,${b64}" style="width:100%; height:250px; object-fit:contain; background:#222;" />
      </div>`;
    }).join('')}
  </body>`;

  await page.setContent(html);
  await page.screenshot({ path: 'scripts/step0-images.png' });
  await browser.close();
  console.log('Saved step0-images.png');
}

checkStep0Images().catch(console.error);

