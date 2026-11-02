const puppeteer = require('puppeteer-core');

async function testChangeover() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

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
        overflow: hidden;
        position: relative;
      }

      /* Navbar */
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32px 64px;
        z-index: 50;
      }
      .logo {
        font-family: 'Playfair Display', serif;
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #351F18;
      }
      .nav-links {
        display: flex;
        gap: 40px;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.75);
      }
      .order-pill {
        background: #50352F;
        color: #FFFDF8;
        padding: 10px 24px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      /* Giant Muted Watermark Typography */
      .watermark-bg {
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Playfair Display', serif;
        font-size: 260px;
        font-weight: 400;
        letter-spacing: 0.15em;
        color: rgba(80, 53, 47, 0.04);
        pointer-events: none;
        white-space: nowrap;
        z-index: 1;
        user-select: none;
      }

      /* Hero Content Container */
      .hero-stage {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
        padding: 0 40px;
      }

      .eyebrow {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.6);
        margin-bottom: 12px;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 84px;
        font-weight: 400;
        line-height: 0.95;
        letter-spacing: -0.02em;
        color: #351F18;
        text-align: center;
        margin: 0;
      }
      h1 span.italic {
        font-style: italic;
        font-family: 'Playfair Display', serif;
        color: #6a463e;
      }

      /* Centerpiece Composition */
      .centerpiece-box {
        position: relative;
        width: 640px;
        height: 480px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -20px;
        margin-bottom: -10px;
      }

      .ambient-glow {
        position: absolute;
        width: 480px;
        height: 380px;
        background: radial-gradient(ellipse at 50% 50%, rgba(244, 216, 139, 0.35) 0%, rgba(233, 165, 161, 0.18) 40%, transparent 70%);
        border-radius: 9999px;
        filter: blur(40px);
        pointer-events: none;
        z-index: 1;
      }

      /* Ground Shadow under the coupe foot */
      .ground-shadow {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 340px;
        height: 36px;
        background: radial-gradient(ellipse at 50% 50%, rgba(55, 30, 20, 0.35) 0%, rgba(80, 53, 47, 0.12) 45%, transparent 75%);
        filter: blur(10px);
        z-index: 2;
      }

      .img-orbit {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 3;
        filter: drop-shadow(0 0 16px rgba(244, 216, 139, 0.4));
      }

      .img-coupe {
        position: absolute;
        width: 72%;
        height: 72%;
        object-fit: contain;
        left: 14%;
        bottom: 7%;
        z-index: 5;
        filter: drop-shadow(0 20px 30px rgba(80, 53, 47, 0.16));
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Minimal Flavour Selector (3 Clean Floating Pills) */
      .flavour-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 20;
      }
      .flavour-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 253, 248, 0.9);
        border: 1px solid rgba(80, 53, 47, 0.14);
        padding: 8px 18px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        color: #351F18;
        letter-spacing: 0.04em;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(80, 53, 47, 0.04);
        transition: all 0.3s ease;
      }
      .flavour-chip.active {
        background: #50352F;
        color: #FFFDF8;
        border-color: #50352F;
        box-shadow: 0 8px 20px -4px rgba(80, 53, 47, 0.25);
        transform: translateY(-2px);
      }
      .chip-dot {
        width: 8px;
        height: 8px;
        border-radius: 9999px;
      }

      /* Bottom Footer Row */
      .hero-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 64px 32px;
        z-index: 20;
      }
      .footer-side {
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(80, 53, 47, 0.6);
      }
      .cta-btn {
        background: transparent;
        color: #50352F;
        border: 1px solid rgba(80, 53, 47, 0.25);
        padding: 10px 28px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        cursor: pointer;
      }
      .cta-btn:hover {
        background: #50352F;
        color: #FFFDF8;
      }
    </style>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">Creamé</div>
      <div class="nav-links">
        <span>Flavours</span>
        <span>Craft</span>
        <span>Atelier</span>
        <span>About</span>
      </div>
      <div class="order-pill">Order Online</div>
    </nav>

    <!-- Giant Muted Watermark -->
    <div class="watermark-bg">CREAMÉ</div>

    <!-- Centered Editorial Hero Stage -->
    <main class="hero-stage">
      <div class="eyebrow">Artisanal Italian Gelato · Small Batch Churn</div>

      <h1>
        Pure Pleasure.<br>
        <span class="italic">Made Slowly.</span>
      </h1>

      <!-- Centerpiece Composition -->
      <div class="centerpiece-box">
        <div class="ambient-glow"></div>
        <div class="ground-shadow"></div>
        <img src="http://localhost:5173/images/ingredients-pristine.png" class="img-orbit" />
        <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="img-coupe" />
      </div>

      <!-- Minimal 3-Flavour Selector -->
      <div class="flavour-bar">
        <div class="flavour-chip active">
          <span class="chip-dot" style="background:#8FA856;"></span>
          <span>Bronte Pistachio</span>
        </div>
        <div class="flavour-chip">
          <span class="chip-dot" style="background:#D9566A;"></span>
          <span>Wild Strawberry</span>
        </div>
        <div class="flavour-chip">
          <span class="chip-dot" style="background:#351F18;"></span>
          <span>Dark Chocolate 70%</span>
        </div>
      </div>
    </main>

    <!-- Minimal Bottom Row -->
    <footer class="hero-footer">
      <div class="footer-side">Florence & Milan Atelier</div>
      <button class="cta-btn">Explore Menu →</button>
      <div class="footer-side">100% Jersey Pasture Cream</div>
    </footer>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/prototype-changeover.png' });
  console.log('Saved prototype-changeover.png');
  await browser.close();
}

testChangeover().catch(console.error);

