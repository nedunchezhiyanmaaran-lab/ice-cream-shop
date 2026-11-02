const puppeteer = require('puppeteer-core');

async function inspectEdgeDiff() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const diffs = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-gelato-centerpiece.png';
    await new Promise(r => { img.onload = r; });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Check perimeter alpha values
    const corners = [
      ctx.getImageData(0, 0, 1, 1).data[3],
      ctx.getImageData(img.naturalWidth - 1, 0, 1, 1).data[3],
      ctx.getImageData(0, img.naturalHeight - 1, 1, 1).data[3],
      ctx.getImageData(img.naturalWidth - 1, img.naturalHeight - 1, 1, 1).data[3]
    ];
    return { corners };
  });

  console.log('Corner alphas:', diffs);
  await browser.close();
}
inspectEdgeDiff().catch(console.error);

