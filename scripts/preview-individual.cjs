const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspectImagesIndividually() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1200, height: 900 }
  });

  const files = [
    { name: 'hero-three-scoop-coupe.jpg', path: 'public/images/hero-three-scoop-coupe.jpg' },
    { name: 'real-pistachio-plinth.jpg', path: 'public/images/real-pistachio-plinth.jpg' },
    { name: 'creame-pint.jpg', path: 'public/images/creame-pint.jpg' },
    { name: 'brand-moodboard.jpg', path: 'public/images/brand-moodboard.jpg' },
  ];

  for (const f of files) {
    const page = await browser.newPage();
    const b64 = fs.readFileSync(f.path).toString('base64');
    await page.setContent(`<!DOCTYPE html>
    <body style="margin:0; background:#0e0e10; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; color:#fff;">
      <h3 style="margin-bottom:12px;">${f.name}</h3>
      <img src="data:image/jpeg;base64,${b64}" style="max-width:85vw; max-height:75vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.5);" />
    </body>`);
    await page.screenshot({ path: `scripts/preview-${f.name.replace('.jpg', '')}.png` });
    await page.close();
  }

  await browser.close();
  console.log('Saved individual previews.');
}

inspectImagesIndividually().catch(console.error);

