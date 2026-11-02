const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function checkStep1037() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  });
  const page = await browser.newPage();

  const b64 = fs.readFileSync('C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793618252143_cc928eee.jpg').toString('base64');

  await page.setContent(`<!DOCTYPE html>
  <body style="margin:0; background:#000; display:flex; align-items:center; justify-content:center; height:100vh;">
    <img src="data:image/jpeg;base64,${b64}" style="max-width:90%; max-height:90%;" />
  </body>`);

  await page.screenshot({ path: 'scripts/step1037.png' });
  await browser.close();
  console.log('Saved step1037.png');
}

checkStep1037().catch(console.error);

