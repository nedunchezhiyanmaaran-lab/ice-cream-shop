const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testRealHeroOptions() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1000 }
  });
  const page = await browser.newPage();

  // Test Option A: The real Pistachio Ceramic Bowl on Sage Plinth (Warm editorial atelier)
  // Test Option B: The real Silver Coupe with 3 scoops on slate
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background-color: #F5E9D9;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #50352F;
        padding: 40px;
      }

      h2 {
        text-align: center;
        font-family: 'Playfair Display', serif;
        margin-bottom: 30px;
      }

      .options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        max-width: 1360px;
        margin: 0 auto;
      }

      .hero-card {
        background: #FFFDF8;
        border-radius: 24px;
        padding: 36px 30px;
        box-shadow: 0 16px 40px -10px rgba(80, 53, 47, 0.08);
        border: 1px solid rgba(80, 53, 47, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .eyebrow {
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.6);
        margin-bottom: 8px;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 42px;
        font-weight: 400;
        line-height: 1.05;
        margin: 0 0 20px 0;
        color: #351F18;
      }
      h1 span.italic {
        font-style: italic;
        color: #6a463e;
      }

      .img-frame {
        width: 100%;
        height: 380px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 14px 30px -8px rgba(80, 53, 47, 0.15);
      }
      .img-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cta-btn {
        margin-top: 24px;
        background: #50352F;
        color: #FFFDF8;
        padding: 12px 28px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: none;
      }
    </style>
  </head>
  <body>
    <h2>Comparing Real Photograph Hero Options</h2>
    <div class="options-grid">
      <!-- Option 1: Pistachio Plinth -->
      <div class="hero-card">
        <div class="eyebrow">Option 1 · The Atelier Ceramic Plinth</div>
        <h1>Pure Pleasure.<br><span class="italic">Made Slowly.</span></h1>
        <div class="img-frame">
          <img src="http://localhost:5173/images/real-pistachio-plinth.jpg" />
        </div>
        <button class="cta-btn">Explore Our Flavours →</button>
      </div>

      <!-- Option 2: Antique Silver Coupe 3-Scoop -->
      <div class="hero-card">
        <div class="eyebrow">Option 2 · The 3-Scoop Silver Coupe</div>
        <h1>Pure Pleasure.<br><span class="italic">Made Slowly.</span></h1>
        <div class="img-frame">
          <img src="http://localhost:5173/images/hero-three-scoop-coupe.jpg" />
        </div>
        <button class="cta-btn">Explore Our Flavours →</button>
      </div>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/compare-real-heroes.png' });
  console.log('Saved compare-real-heroes.png');
  await browser.close();
}

testRealHeroOptions().catch(console.error);

