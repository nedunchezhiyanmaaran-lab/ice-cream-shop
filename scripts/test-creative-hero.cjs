const puppeteer = require('puppeteer-core');

async function testCreativeHero() {
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
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background-color: #F5E9D9;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #50352F;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
      
      .hero-section {
        max-width: 1360px;
        width: 100%;
        padding: 40px 60px;
        display: grid;
        grid-template-columns: 5.2fr 6.8fr;
        gap: 40px;
        align-items: center;
      }

      .left-col {
        display: flex;
        flex-direction: column;
        gap: 24px;
        z-index: 10;
      }

      .badge-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(215, 228, 181, 0.9);
        border: 1px solid rgba(126, 156, 67, 0.3);
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #351F18;
        width: fit-content;
      }
      .badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: #7E9C43;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 72px;
        font-weight: 400;
        line-height: 1.04;
        margin: 0;
        letter-spacing: -0.02em;
        color: #351F18;
      }
      h1 span.italic {
        font-style: italic;
        color: #6a463e;
      }

      p.desc {
        font-size: 16.5px;
        line-height: 1.6;
        color: rgba(80, 53, 47, 0.92);
        max-width: 480px;
        margin: 0;
      }

      .cta-group {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-top: 6px;
      }
      .btn-dark {
        background: #50352F;
        color: #FFFDF8;
        padding: 14px 34px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        box-shadow: 0 10px 24px -6px rgba(80, 53, 47, 0.25);
      }
      .btn-outline {
        background: transparent;
        color: #50352F;
        padding: 14px 32px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        border: 1px solid rgba(80, 53, 47, 0.3);
        cursor: pointer;
      }

      /* Atelier Craft Stats */
      .craft-stats {
        display: flex;
        gap: 28px;
        padding-top: 20px;
        border-top: 1px solid rgba(80, 53, 47, 0.12);
        margin-top: 8px;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .stat-lbl {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: rgba(80, 53, 47, 0.55);
      }
      .stat-val {
        font-family: 'Playfair Display', serif;
        font-size: 17px;
        font-weight: 600;
        color: #351F18;
      }

      /* Right Column: Atelier Countertop Grounded Display */
      .atelier-stage {
        position: relative;
        width: 100%;
        max-width: 700px;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Warm Sunbeam Atmospheric Glow */
      .sunbeam-glow {
        position: absolute;
        top: -10%;
        left: 20%;
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, rgba(244, 216, 139, 0.25) 0%, rgba(233, 165, 161, 0.12) 40%, transparent 70%);
        border-radius: 9999px;
        filter: blur(40px);
        pointer-events: none;
        z-index: 1;
      }

      /* Authentic Atelier Countertop Slab */
      .countertop-slab {
        position: absolute;
        bottom: 35px;
        left: 3%;
        right: 3%;
        height: 170px;
        background: linear-gradient(180deg, rgba(242, 231, 215, 0.85) 0%, rgba(230, 215, 195, 0.6) 100%);
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        box-shadow: 0 32px 64px -16px rgba(80, 53, 47, 0.10), inset 0 2px 4px rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        z-index: 2;
      }

      /* Deep Ground Contact Occlusion Shadows */
      .coupe-foot-shadow {
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 250px;
        height: 22px;
        background: radial-gradient(ellipse at 50% 50%, rgba(45, 25, 15, 0.5) 0%, rgba(80, 53, 47, 0.2) 45%, transparent 75%);
        filter: blur(5px);
        z-index: 3;
      }
      .coupe-ambient-shadow {
        position: absolute;
        bottom: 48px;
        left: 52%;
        transform: translateX(-50%);
        width: 400px;
        height: 52px;
        background: radial-gradient(ellipse at 50% 50%, rgba(80, 53, 47, 0.25) 0%, rgba(80, 53, 47, 0.08) 50%, transparent 80%);
        filter: blur(16px);
        z-index: 3;
      }

      /* Centerpiece Wrapper */
      .coupe-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
      }

      /* Tabletop Props Layer (Strawberries, Chocolates, Golden Morning Light, Floating Shards) */
      .ingredients-layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 4;
        filter: drop-shadow(0 0 16px rgba(244, 216, 139, 0.45));
        pointer-events: none;
      }

      /* Isolated Dessert Coupe */
      .coupe-image {
        position: absolute;
        width: 72%;
        height: 72%;
        object-fit: contain;
        left: 14%;
        bottom: 7%;
        z-index: 6;
        filter: drop-shadow(0 22px 34px rgba(80, 53, 47, 0.16));
        pointer-events: none;
      }

      /* Silver Gelato Spoon resting on the counter */
      .silver-spoon {
        position: absolute;
        bottom: 64px;
        right: 18%;
        width: 90px;
        height: 28px;
        z-index: 7;
        transform: rotate(-18deg);
        filter: drop-shadow(0 6px 10px rgba(80, 53, 47, 0.2));
        opacity: 0.92;
        pointer-events: none;
      }

      /* Cold Frost Vapor Mist */
      .cold-vapor {
        position: absolute;
        top: 24%;
        left: 45%;
        transform: translateX(-50%);
        width: 160px;
        height: 80px;
        background: radial-gradient(ellipse, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%);
        filter: blur(14px);
        pointer-events: none;
        z-index: 8;
        opacity: 0.75;
      }

      /* 360 Turntable Badge */
      .spin-badge {
        position: absolute;
        top: 52%;
        right: 8%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        background: rgba(255, 253, 248, 0.95);
        border: 1px solid rgba(80, 53, 47, 0.18);
        padding: 6px 12px;
        border-radius: 9999px;
        box-shadow: 0 4px 12px rgba(80, 53, 47, 0.08);
        z-index: 25;
        cursor: pointer;
      }
      .spin-badge span {
        font-family: 'Playfair Display', serif;
        font-size: 11px;
        font-weight: 700;
        color: #351F18;
      }
      .spin-icon {
        font-size: 11px;
        color: #50352F;
      }

      /* Flavour Selector Pills on Right */
      .flavour-pills {
        position: absolute;
        top: 48%;
        right: -8px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 25;
      }
      .flavour-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255, 253, 248, 0.95);
        border: 1px solid rgba(80, 53, 47, 0.16);
        padding: 6px 12px 6px 16px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        color: #351F18;
        box-shadow: 0 4px 12px rgba(80, 53, 47, 0.06);
        cursor: pointer;
      }
      .flavour-pill.active {
        background: #D7E4B5;
        border-color: rgba(126, 156, 67, 0.5);
        box-shadow: 0 6px 16px rgba(126, 156, 67, 0.25);
      }
      .color-dot {
        width: 22px;
        height: 22px;
        border-radius: 9999px;
        border: 2px solid #FFFDF8;
        box-shadow: 0 2px 5px rgba(0,0,0,0.15);
      }

      /* Tasting Bar on Countertop */
      .tasting-bar {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 253, 248, 0.94);
        border: 1px solid rgba(80, 53, 47, 0.15);
        border-radius: 20px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 12px 28px rgba(80, 53, 47, 0.09);
        backdrop-filter: blur(12px);
        z-index: 25;
        width: 88%;
        max-width: 460px;
      }
      .tasting-dot {
        width: 10px;
        height: 10px;
        border-radius: 9999px;
        background: #8FA856;
        box-shadow: 0 0 8px rgba(143, 168, 86, 0.7);
      }
      .tasting-meta {
        flex: 1;
      }
      .tasting-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #351F18;
      }
      .tasting-desc {
        font-size: 11px;
        color: rgba(80, 53, 47, 0.85);
        margin-top: 1px;
      }
      .tasting-temp {
        font-size: 10px;
        font-weight: 700;
        padding: 4px 9px;
        border-radius: 9999px;
        background: rgba(215, 228, 181, 0.6);
        color: #3A5016;
        letter-spacing: 0.04em;
      }
    </style>
  </head>
  <body>
    <div class="hero-section">
      <!-- Left Column -->
      <div class="left-col">
        <div class="badge-tag">
          <span class="badge-dot"></span>
          <span>Slow-Churned Italian Gelato</span>
        </div>

        <h1>
          Made slowly.<br>
          <span class="italic">Loved instantly.</span>
        </h1>

        <p class="desc">
          Thoughtfully crafted artisanal gelato, made daily with fresh Jersey pasture cream,
          DOP Bronte pistachios, and single-origin dark chocolate. Churned at low speed for pure, velvety density.
        </p>

        <div class="cta-group">
          <button class="btn-dark">Explore Our Flavours</button>
          <button class="btn-outline">Visit Our Atelier</button>
        </div>

        <div class="craft-stats">
          <div class="stat-item">
            <span class="stat-lbl">Daily Churn</span>
            <span class="stat-val">Batch #14 · 08:30 AM</span>
          </div>
          <div class="stat-item">
            <span class="stat-lbl">Serving Temp</span>
            <span class="stat-val">-11.2°C (Silky & Dense)</span>
          </div>
          <div class="stat-item">
            <span class="stat-lbl">Dairy</span>
            <span class="stat-val">100% Jersey Pasture</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Grounded Atelier Showcase -->
      <div class="atelier-stage">
        <div class="sunbeam-glow"></div>
        <div class="countertop-slab"></div>
        <div class="coupe-foot-shadow"></div>
        <div class="coupe-ambient-shadow"></div>

        <div class="coupe-wrapper">
          <img src="http://localhost:5173/images/ingredients-pristine.png" class="ingredients-layer" />
          <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="coupe-image" />
          <div class="cold-vapor"></div>
        </div>

        <!-- 360 Spin -->
        <div class="spin-badge">
          <span>360°</span>
          <span class="spin-icon">↺</span>
        </div>

        <!-- Flavour Selector -->
        <div class="flavour-pills">
          <div class="flavour-pill active">
            <span>Pistachio</span>
            <div class="color-dot" style="background:#8FA856;"></div>
          </div>
          <div class="flavour-pill">
            <span>Strawberry</span>
            <div class="color-dot" style="background:#D9566A;"></div>
          </div>
          <div class="flavour-pill">
            <span>Chocolate</span>
            <div class="color-dot" style="background:#351F18;"></div>
          </div>
        </div>

        <!-- Tasting Bar -->
        <div class="tasting-bar">
          <div class="tasting-dot"></div>
          <div class="tasting-meta">
            <div class="tasting-title">DOP Bronte Pistachio · Sicily</div>
            <div class="tasting-desc">Stone-ground volcanic pistachios & Jersey pasture cream</div>
          </div>
          <div class="tasting-temp">-11.2°C</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/test-creative-hero.png' });
  console.log('Saved test-creative-hero.png');
  await browser.close();
}

testCreativeHero().catch(console.error);

