const puppeteer = require('puppeteer-core');

async function testServingStyles() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 900 }
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <body style="margin:0; background:#F5E9D9; display:flex; gap:30px; padding:30px; font-family:sans-serif;">
      <div>
        <h3>1. Coppa Artigianale</h3>
        <div style="width:380px; height:320px; position:relative; background:#EFE2CF; border-radius:20px; overflow:hidden;">
          <img src="http://localhost:5173/images/ingredients-pristine.png" style="width:100%; height:100%; object-fit:contain; position:absolute;"/>
          <img src="http://localhost:5173/images/dessert-bowl-isolated.png" style="width:72%; height:72%; object-fit:contain; position:absolute; left:14%; bottom:7%;"/>
        </div>
      </div>
      <div>
        <h3>2. Cono Croccante</h3>
        <div style="width:380px; height:320px; position:relative; background:#EFE2CF; border-radius:20px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
          <img src="http://localhost:5173/images/vero-cup.jpg" style="width:90%; height:90%; object-fit:cover; border-radius:14px;"/>
        </div>
      </div>
      <div>
        <h3>3. Pinta da Asporto</h3>
        <div style="width:380px; height:320px; position:relative; background:#EFE2CF; border-radius:20px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
          <img src="http://localhost:5173/images/creame-pint.jpg" style="width:90%; height:90%; object-fit:cover; border-radius:14px;"/>
        </div>
      </div>
    </body>
  `);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/test-serving-styles.png' });
  await browser.close();
  console.log('Saved test-serving-styles.png');
}

testServingStyles().catch(console.error);

