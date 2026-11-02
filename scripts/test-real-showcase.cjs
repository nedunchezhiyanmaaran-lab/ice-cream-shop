const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testInteractiveReal() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  const imgCoupe = fs.readFileSync('public/images/hero-three-scoop-coupe.jpg').toString('base64');
  const imgPlinth = fs.readFileSync('public/images/real-pistachio-plinth.jpg').toString('base64');
  const imgPint = fs.readFileSync('public/images/creame-pint.jpg').toString('base64');

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
        overflow: hidden;
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
      }
      .logo {
        font-family: 'Playfair Display', serif;
        font-size: 26px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-weight: 600;
        color: #351F18;
      }
      .nav-links {
        display: flex;
        gap: 36px;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.75);
      }
      .pill {
        background: #50352F;
        color: #FFFDF8;
        padding: 10px 24px;
        border-radius: 9999px;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-weight: 600;
      }

      .main-grid {
        display: grid;
        grid-template-columns: 5fr 7fr;
        gap: 50px;
        align-items: center;
        max-width: 1320px;
        margin: auto;
        width: 100%;
        z-index: 10;
      }

      .left {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(80, 53, 47, 0.7);
      }
      .tag-dot {
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: #7E9C43;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 76px;
        line-height: 0.98;
        letter-spacing: -0.025em;
        margin: 0;
        color: #351F18;
      }
      h1 span.italic {
        font-style: italic;
        color: #6a463e;
      }
      p.sub {
        font-size: 16.5px;
        line-height: 1.6;
        color: rgba(80, 53, 47, 0.88);
        max-width: 440px;
        margin: 0;
      }
      .cta-row {
        display: flex;
        gap: 16px;
        align-items: center;
      }
      .cta-primary {
        background: #50352F;
        color: #FFFDF8;
        padding: 14px 32px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        box-shadow: 0 10px 24px -6px rgba(80, 53, 47, 0.25);
      }
      .cta-secondary {
        background: transparent;
        color: #50352F;
        padding: 14px 30px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: 1px solid rgba(80, 53, 47, 0.25);
      }

      /* Right: Editorial Real Photography Showcase */
      .right-showcase {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
        width: 100%;
      }

      .photo-frame {
        position: relative;
        width: 100%;
        max-width: 620px;
        height: 480px;
        border-radius: 32px;
        overflow: hidden;
        box-shadow: 0 28px 60px -14px rgba(80, 53, 47, 0.22);
        border: 6px solid #FFFDF8;
        background: #351F18;
      }
      .photo-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Floating Pill Overlay on Image */
      .img-caption {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 253, 248, 0.95);
        border: 1px solid rgba(80, 53, 47, 0.12);
        padding: 8px 18px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #351F18;
        box-shadow: 0 8px 20px rgba(0,0,0,0.14);
        backdrop-filter: blur(8px);
      }

      /* Interactive Real Photography Switcher */
      .photo-tabs {
        display: flex;
        gap: 10px;
      }
      .tab-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 18px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: #50352F;
        background: rgba(255, 253, 248, 0.9);
        border: 1px solid rgba(80, 53, 47, 0.15);
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(80, 53, 47, 0.04);
      }
      .tab-btn.active {
        background: #50352F;
        color: #FFFDF8;
        border-color: #50352F;
        box-shadow: 0 6px 18px -4px rgba(80, 53, 47, 0.25);
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.6);
        font-weight: 600;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <div class="logo">Creamé</div>
      <div class="nav-links">
        <span>Our Flavours</span>
        <span>The Craft</span>
        <span>Atelier</span>
      </div>
      <div class="pill">Order Online</div>
    </div>

    <div class="main-grid">
      <div class="left">
        <div class="tag">
          <span class="tag-dot"></span>
          <span>Artisanal Italian Gelato</span>
        </div>

        <h1>
          Pure Pleasure.<br>
          <span class="italic">Made Slowly.</span>
        </h1>

        <p class="sub">
          Slow-churned daily in small batches with DOP Bronte pistachios, organic Jersey pasture cream, and single-origin dark chocolate.
        </p>

        <div class="cta-row">
          <div class="cta-primary">Explore Our Flavours →</div>
          <div class="cta-secondary">Our Story</div>
        </div>
      </div>

      <div class="right-showcase">
        <div class="photo-frame">
          <img src="data:image/jpeg;base64,${imgCoupe}" />
          <div class="img-caption">The Signature Silver Coupe · 3 Artisanal Scoops</div>
        </div>

        <div class="photo-tabs">
          <div class="tab-btn active">
            <span>🍨</span> Signature Coupe
          </div>
          <div class="tab-btn">
            <span>🥣</span> Pistachio Plinth
          </div>
          <div class="tab-btn">
            <span>📦</span> Takeaway Pint
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
  await page.screenshot({ path: 'scripts/test-real-interactive-showcase.png' });
  console.log('Saved test-real-interactive-showcase.png');
  await browser.close();
}

testInteractiveReal().catch(console.error);

