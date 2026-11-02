const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspectOtherReal() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1000 }
  });
  const page = await browser.newPage();

  const img1 = fs.readFileSync('public/images/veluto-pistachio.jpg').toString('base64');
  const img2 = fs.readFileSync('public/images/vero-cup.jpg').toString('base64');
  const img3 = fs.readFileSync('public/images/creame-pint.jpg').toString('base64');
  const img4 = fs.readFileSync('public/images/hero-three-scoop-coupe.jpg').toString('base64');

  await page.setContent(`<!DOCTYPE html>
  <body style="margin:0; background:#F5E9D9; display:grid; grid-template-columns:1fr 1fr; gap:20px; padding:20px; font-family:sans-serif;">
    <div>
      <h4>1. veluto-pistachio.jpg</h4>
      <img src="data:image/jpeg;base64,${img1}" style="width:100%; height:320px; object-fit:cover; border-radius:12px;"/>
    </div>
    <div>
      <h4>2. vero-cup.jpg</h4>
      <img src="data:image/jpeg;base64,${img2}" style="width:100%; height:320px; object-fit:cover; border-radius:12px;"/>
    </div>
    <div>
      <h4>3. creame-pint.jpg</h4>
      <img src="data:image/jpeg;base64,${img3}" style="width:100%; height:320px; object-fit:cover; border-radius:12px;"/>
    </div>
    <div>
      <h4>4. hero-three-scoop-coupe.jpg</h4>
      <img src="data:image/jpeg;base64,${img4}" style="width:100%; height:320px; object-fit:cover; border-radius:12px;"/>
    </div>
  </body>`);

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/inspect-other-real.png' });
  await browser.close();
  console.log('Saved inspect-other-real.png');
}

inspectOtherReal().catch(console.error);

