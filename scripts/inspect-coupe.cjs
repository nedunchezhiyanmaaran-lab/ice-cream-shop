const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspectCoupe() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1200, height: 900 }
  });
  const page = await browser.newPage();

  const p2 = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793606482836_69d86082.jpg';
  const b2 = fs.readFileSync(p2).toString('base64');

  await page.setContent(`<!DOCTYPE html>
  <body style="margin:0; background:#000; display:flex; align-items:center; justify-content:center; height:100vh;">
    <img src="data:image/jpeg;base64,${b2}" style="max-height:85vh; border-radius:12px;"/>
  </body>`);

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/real-silver-coupe.png' });
  await browser.close();
  console.log('Saved real-silver-coupe.png');
}

inspectCoupe().catch(console.error);

