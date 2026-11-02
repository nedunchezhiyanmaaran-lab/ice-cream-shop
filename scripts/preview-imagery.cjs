const puppeteer = require('puppeteer-core');

async function previewAll() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1200 }
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <body style="margin:0; background:#F5E9D9; font-family:sans-serif; padding:20px;">
      <h2>All Available Food & Atelier Imagery</h2>
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
        <div>
          <h4>brand-moodboard.jpg</h4>
          <img src="http://localhost:5173/images/brand-moodboard.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
        <div>
          <h4>hero-artisan-gelato-reference.jpg</h4>
          <img src="http://localhost:5173/images/hero-artisan-gelato-reference.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
        <div>
          <h4>hero-three-scoop-coupe.jpg</h4>
          <img src="http://localhost:5173/images/hero-three-scoop-coupe.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
        <div>
          <h4>veluto-pistachio.jpg</h4>
          <img src="http://localhost:5173/images/veluto-pistachio.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
        <div>
          <h4>creame-pint.jpg</h4>
          <img src="http://localhost:5173/images/creame-pint.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
        <div>
          <h4>vero-cup.jpg</h4>
          <img src="http://localhost:5173/images/vero-cup.jpg" style="width:100%; height:240px; object-fit:cover; border-radius:12px;"/>
        </div>
      </div>
    </body>
  `);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/preview-imagery.png' });
  await browser.close();
  console.log('Saved preview-imagery.png');
}

previewAll().catch(console.error);

