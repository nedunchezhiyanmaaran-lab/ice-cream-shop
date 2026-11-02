const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded';
const files = fs.readdirSync(uploadDir);

async function inspect() {
  for (const f of files) {
    const fullPath = path.join(uploadDir, f);
    try {
      const meta = await sharp(fullPath).metadata();
      console.log(`${f}: ${meta.width}x${meta.height}, format: ${meta.format}, size: ${fs.statSync(fullPath).size}`);
    } catch (e) {
      console.log(`${f}: error ${e.message}`);
    }
  }
}

inspect();
