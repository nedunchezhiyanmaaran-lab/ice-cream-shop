const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  // Copy images
  fs.copyFileSync(
    'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793615262921_86e2fa2d.jpg',
    'public/images/uploaded-ingredients.jpg'
  );
  fs.copyFileSync(
    'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793615262931_c4e2fc56.jpg',
    'public/images/uploaded-bowl-black.jpg'
  );

  const res = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

    const imgBowl = await load('/images/uploaded-bowl-black.jpg');
    const imgRing = await load('/images/uploaded-ingredients.jpg');

    return {
      bowl: { w: imgBowl.naturalWidth, h: imgBowl.naturalHeight },
      ring: { w: imgRing.naturalWidth, h: imgRing.naturalHeight }
    };
  });

  console.log(res);
  await browser.close();
}
inspect().catch(console.error);
