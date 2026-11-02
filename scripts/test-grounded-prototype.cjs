const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testGroundedAtelier() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  // Test HTML with realistic grounded atelier countertop, contact shadows, and layout
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      
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
        overflow: hidden;
      }
      
      .hero-grid {
        max-width: 1320px;
        width: 100%;
        display: grid;
        grid-template-columns: 5fr 7fr;
        gap: 40px;
        padding: 40px 60px;
        align-items: center;
      }

      .left-col {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .atelier-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(215, 228, 181, 0.85);
        border: 1px solid rgba(126, 156, 67, 0.25);
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #351F18;
        width: fit-content;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 74px;
        font-weight: 400;
        line-height: 1.05;
        margin: 0;
        letter-spacing: -0.02em;
      }
      h1 span.italic {
        font-style: italic;
        color: #6a463e;
      }

      p.desc {
        font-size: 17px;
        line-height: 1.6;
        color: rgba(80, 53, 47, 0.9);
        max-width: 480px;
        margin: 0;
      }

      .cta-row {
        display: flex;
        gap: 16px;
        margin-top: 8px;
      }
      .btn-primary {
        background: #50352F;
        color: #FFFDF8;
        padding: 14px 32px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
      }
      .btn-secondary {
        background: transparent;
        color: #50352F;
        padding: 14px 32px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        border: 1px solid rgba(80, 53, 47, 0.3);
        cursor: pointer;
      }

      /* Atelier Live Stats Ribbon */
      .craft-badge-row {
        display: flex;
        gap: 20px;
        padding-top: 16px;
        border-top: 1px solid rgba(80, 53, 47, 0.12);
      }
      .craft-stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .stat-label {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: rgba(80, 53, 47, 0.6);
      }
      .stat-val {
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        font-weight: 600;
        color: #50352F;
      }

      /* Right Column: Grounded Atelier Showcase */
      .atelier-stage {
        position: relative;
        width: 100%;
        max-width: 680px;
        height: 580px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Travertine Countertop Horizon */
      .countertop-slab {
        position: absolute;
        bottom: 30px;
        left: 5%;
        right: 5%;
        height: 160px;
        background: linear-gradient(180deg, rgba(239, 226, 207, 0.7) 0%, rgba(232, 217, 196, 0.4) 100%);
        border-radius: 28px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 30px 60px -20px rgba(80, 53, 47, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
        z-index: 1;
      }

      /* Realistic Contact Shadows on the stone */
      .coupe-contact-shadow {
        position: absolute;
        bottom: 58px;
        left: 50%;
        transform: translateX(-50%);
        width: 240px;
        height: 22px;
        background: radial-gradient(ellipse at 50% 50%, rgba(55, 30, 20, 0.45) 0%, rgba(80, 53, 47, 0.18) 45%, transparent 75%);
        filter: blur(4px);
        z-index: 2;
      }
      .coupe-diffuse-shadow {
        position: absolute;
        bottom: 46px;
        left: 52%;
        transform: translateX(-50%);
        width: 360px;
        height: 48px;
        background: radial-gradient(ellipse at 50% 50%, rgba(80, 53, 47, 0.22) 0%, rgba(80, 53, 47, 0.08) 50%, transparent 80%);
        filter: blur(14px);
        z-index: 2;
      }

      /* Grounded Centerpiece Container */
      .coupe-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
      }

      /* Layer 1: Tabletop Props & Golden Morning Light */
      .ingredients-layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 4;
        filter: drop-shadow(0 0 16px rgba(244, 216, 139, 0.4));
      }

      /* Layer 2: Main Grounded Gelato Coupe */
      .bowl-image {
        position: absolute;
        width: 72%;
        height: 72%;
        object-fit: contain;
        left: 14%;
        bottom: 7%;
        z-index: 6;
        filter: drop-shadow(0 20px 28px rgba(80, 53, 47, 0.14));
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Serving Style Toggle (Coupe vs Cone vs Pint) */
      .serving-selector {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        background: rgba(255, 253, 248, 0.9);
        border: 1px solid rgba(80, 53, 47, 0.15);
        border-radius: 9999px;
        padding: 4px;
        gap: 4px;
        box-shadow: 0 4px 14px rgba(80, 53, 47, 0.06);
        z-index: 20;
      }
      .serving-btn {
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        border: none;
        background: transparent;
        color: rgba(80, 53, 47, 0.7);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .serving-btn.active {
        background: #50352F;
        color: #FFFDF8;
      }

      /* Flavour Selector Pills on Right */
      .flavour-selector {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 20;
      }
      .flavour-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 253, 248, 0.92);
        border: 1px solid rgba(80, 53, 47, 0.15);
        padding: 6px 12px 6px 14px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 500;
        color: #50352F;
        box-shadow: 0 4px 10px rgba(80, 53, 47, 0.05);
        cursor: pointer;
      }
      .flavour-pill.active {
        background: #D7E4B5;
        border-color: rgba(126, 156, 67, 0.5);
        font-weight: 600;
      }
      .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 9999px;
        border: 2px solid #FFFDF8;
      }

      /* Tasting Card */
      .tasting-bar {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 253, 248, 0.92);
        border: 1px solid rgba(80, 53, 47, 0.14);
        border-radius: 18px;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 10px 24px rgba(80, 53, 47, 0.08);
        backdrop-filter: blur(10px);
        z-index: 20;
        width: 88%;
        max-width: 440px;
      }
      .tasting-dot {
        width: 10px;
        height: 10px;
        border-radius: 9999px;
        background: #8FA856;
        box-shadow: 0 0 8px rgba(143, 168, 86, 0.6);
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
        color: rgba(80, 53, 47, 0.8);
        margin-top: 1px;
      }
      .tasting-temp {
        font-size: 10px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 9999px;
        background: rgba(215, 228, 181, 0.5);
        color: #40581B;
      }
    </style>
  </head>
  <body>
    <div class="hero-grid">
      <!-- Left Column: Editorial Brand Story -->
      <div class="left-col">
        <div class="atelier-tag">
          <span>●</span>
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

        <div class="cta-row">
          <button class="btn-primary">Explore Our Flavours</button>
          <button class="btn-secondary">Visit Our Atelier</button>
        </div>

        <!-- Real Gelateria Atelier Stats -->
        <div class="craft-badge-row">
          <div class="craft-stat">
            <span class="stat-label">Daily Churn</span>
            <span class="stat-val">Batch #14 · 08:30 AM</span>
          </div>
          <div class="craft-stat">
            <span class="stat-label">Serving Temp</span>
            <span class="stat-val">-11.2°C</span>
          </div>
          <div class="craft-stat">
            <span class="stat-label">Dairy</span>
            <span class="stat-val">100% Jersey Pasture</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Grounded Atelier Showcase -->
      <div class="atelier-stage">
        <!-- Serving Style Toggle -->
        <div class="serving-selector">
          <button class="serving-btn active">
            <span>🍨</span> Coppa
          </button>
          <button class="serving-btn">
            <span>🍦</span> Cono
          </button>
          <button class="serving-btn">
            <span>📦</span> Pinta
          </button>
        </div>

        <!-- Stone Countertop Slab -->
        <div class="countertop-slab"></div>
        <div class="coupe-contact-shadow"></div>
        <div class="coupe-diffuse-shadow"></div>

        <!-- Grounded Coupe & Ingredients -->
        <div class="coupe-wrap">
          <img src="http://localhost:5173/images/ingredients-pristine.png" class="ingredients-layer" />
          <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl-image" />
        </div>

        <!-- Flavour Selector -->
        <div class="flavour-selector">
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

        <!-- Tasting Card with Churn Temp -->
        <div class="tasting-bar">
          <div class="tasting-dot"></div>
          <div class="tasting-meta">
            <div class="tasting-title">DOP Bronte Pistachio · Sicily</div>
            <div class="tasting-desc">Stone-ground volcanic pistachios & Jersey cream</div>
          </div>
          <div class="tasting-temp">-11.2°C</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/test-grounded-prototype.png' });
  console.log('Saved test-grounded-prototype.png');
  await browser.close();
}

testGroundedAtelier().catch(console.error);

