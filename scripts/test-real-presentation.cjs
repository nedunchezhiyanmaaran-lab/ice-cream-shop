const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testPresentation() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  const imgCoupe = fs.readFileSync('public/images/hero-three-scoop-coupe.jpg').toString('base64');
  const imgPlinth = fs.readFileSync('public/images/real-pistachio-plinth.jpg').toString('base64');
  const imgPint = fs.readFileSync('public/images/creame-pint.jpg').toString('base64');

  // Let's create an editorial luxury hero layout with the real photographs!
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background-color: #F5E9D9;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #50352F;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px 60px;
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        font-family: 'Playfair Display', serif;
        font-size: 26px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-weight: 600;
      }
      .pill {
        background: #50352F;
        color: #FFFDF8;
        padding: 8px 22px;
        border-radius: 9999px;
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 600;
      }

      .main-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
        max-width: 1300px;
        margin: auto;
        width: 100%;
      }

      .left {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .tag {
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(80, 53, 47, 0.65);
      }
      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 70px;
        line-height: 1.02;
        letter-spacing: -0.02em;
        margin: 0;
        color: #351F18;
      }
      h1 span.italic {
        font-style: italic;
        color: #6a463e;
      }
      p.sub {
        font-size: 16px;
        line-height: 1.6;
        color: rgba(80, 53, 47, 0.85);
        max-width: 440px;
        margin: 0;
      }
      .cta {
        display: inline-block;
        background: #50352F;
        color: #FFFDF8;
        padding: 14px 34px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        width: fit-content;
      }

      /* Right: Editorial Real Photography Frame with Organic Curves */
      .photo-container {
        position: relative;
        width: 100%;
        max-width: 560px;
        height: 520px;
        margin: 0 auto;
      }
      .photo-frame {
        width: 100%;
        height: 100%;
        border-radius: 36px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 24px 50px -12px rgba(80, 53, 47, 0.25);
        border: 8px solid #FFFDF8;
      }
      .photo-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Floating Accent Tag */
      .accent-tag {
        position: absolute;
        bottom: 24px;
        left: 24px;
        background: rgba(255, 253, 248, 0.94);
        padding: 10px 18px;
        border-radius: 16px;
        backdrop-filter: blur(8px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .accent-tag .title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .accent-tag .desc {
        font-size: 10px;
        color: rgba(80, 53, 47, 0.7);
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.6);
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <div class="logo">Creamé</div>
      <div class="pill">Order Online</div>
    </div>

    <div class="main-grid">
      <div class="left">
        <div class="tag">Artisanal Italian Gelato</div>
        <h1>
          Pure Pleasure.<br>
          <span class="italic">Made Slowly.</span>
        </h1>
        <p class="sub">
          Crafted daily with DOP Bronte pistachios, organic Jersey pasture cream, and grand cru dark chocolate.
        </p>
        <div class="cta">Explore Flavours →</div>
      </div>

      <div class="photo-container">
        <div class="photo-frame">
          <img src="data:image/jpeg;base64,${imgCoupe}" />
        </div>
        <div class="accent-tag">
          <div>
            <div class="title">The Signature Silver Coupe</div>
            <div class="desc">Bronte Pistachio · Wild Strawberry · Guanaja 70%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-row">
      <span>Florence & Milan Atelier</span>
      <span>100% Jersey Pasture Cream</span>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/test-real-editorial.png' });
  console.log('Saved test-real-editorial.png');
  await browser.close();
}

testPresentation().catch(console.error);

