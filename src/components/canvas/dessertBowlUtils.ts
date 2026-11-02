import * as THREE from 'three';

/**
 * Creates an elegant ceramic pedestal dessert chalice/bowl using LatheGeometry.
 * Profile: flared circular base, slender tapered stem, and a generous flaring bowl basin.
 */
export function createPedestalBowlGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];

  // Pedestal Base Foot (bottom)
  points.push(new THREE.Vector2(0.0, -1.3));
  points.push(new THREE.Vector2(0.85, -1.3));
  points.push(new THREE.Vector2(0.88, -1.22));
  points.push(new THREE.Vector2(0.75, -1.18));
  points.push(new THREE.Vector2(0.38, -1.0));

  // Slender Stem
  points.push(new THREE.Vector2(0.28, -0.75));
  points.push(new THREE.Vector2(0.26, -0.45));
  points.push(new THREE.Vector2(0.32, -0.2));

  // Bowl Basin Bottom & Upward Flare
  points.push(new THREE.Vector2(0.55, 0.0));
  points.push(new THREE.Vector2(0.95, 0.25));
  points.push(new THREE.Vector2(1.35, 0.5));
  points.push(new THREE.Vector2(1.68, 0.75)); // Outer Rim
  points.push(new THREE.Vector2(1.65, 0.77)); // Rim thickness
  points.push(new THREE.Vector2(1.60, 0.73));

  // Inner Bowl Cavity
  points.push(new THREE.Vector2(1.25, 0.45));
  points.push(new THREE.Vector2(0.85, 0.22));
  points.push(new THREE.Vector2(0.4, 0.05));
  points.push(new THREE.Vector2(0.0, 0.0));

  const geom = new THREE.LatheGeometry(points, 64);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a realistic textured stoneware / ceramic bowl canvas texture
 */
export function createCeramicBowlTexture(): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Warm beige stoneware with subtle speckling
  ctx.fillStyle = '#E3D3BE';
  ctx.fillRect(0, 0, size, size);

  // Subtle ceramic wheel turn lines
  ctx.strokeStyle = 'rgba(180, 155, 130, 0.15)';
  ctx.lineWidth = 2;
  for (let y = 0; y < size; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // Micro earthenware mineral specks
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(120, 95, 75, 0.25)' : 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bump canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, size, size);

  const imgData = bumpCtx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = Math.floor(128 + (Math.random() - 0.5) * 40);
    d[i] = n;
    d[i + 1] = n;
    d[i + 2] = n;
    d[i + 3] = 255;
  }
  bumpCtx.putImageData(imgData, 0, 0);

  const colorMap = new THREE.CanvasTexture(canvas);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(2, 2);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(4, 4);

  return { colorMap, bumpMap };
}

/**
 * Creates an organic sculpted gelato scoop with natural paddle ripples,
 * crevices, and a ruffled melt edge.
 */
export function createGelatoScoopGeometry(radius = 0.82, seed = 1): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(radius, 72, 72);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();

  const s = seed * 5.23;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    const dir = v.clone().normalize();
    const phi = Math.atan2(dir.z, dir.x);
    const theta = Math.acos(dir.y);

    // 1. Organic paddle scrape lines
    const scrapeNoise =
      Math.sin(dir.y * 5.0 + phi * 2.5 + s) * 0.05 +
      Math.cos(dir.x * 6.0 + dir.z * 5.0 + s) * 0.035;

    // 2. Micro surface folds
    const microFolds =
      Math.sin(phi * 8.0 + theta * 9.0 + s) * 0.025 +
      Math.cos(dir.y * 14.0 + s) * 0.015;

    // 3. Ruffled skirt at the base of the scoop
    let skirtRuffle = 0;
    if (dir.y < -0.1 && dir.y > -0.7) {
      const beltFactor = Math.sin(((-dir.y - 0.1) / 0.6) * Math.PI);
      const edgeFluting =
        Math.sin(phi * 12.0 + s) * 0.045 +
        Math.cos(phi * 24.0 + s * 1.5) * 0.025;
      skirtRuffle = beltFactor * (0.12 + edgeFluting);
    }

    // 4. Flatten underside where it rests in the bowl
    let underFlattening = 0;
    if (v.y < -radius * 0.4) {
      underFlattening = (v.y + radius * 0.4) * 0.22;
    }

    const totalDisp = 1.0 + scrapeNoise + microFolds + skirtRuffle;
    v.multiplyScalar(totalDisp);
    v.y += underFlattening;

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a cut strawberry wedge geometry with red textured outer skin and seed face
 */
export function createStrawberryWedgeGeometry(): THREE.BufferGeometry {
  const geom = new THREE.ConeGeometry(0.24, 0.45, 16);
  // Flatten slightly on Z to create wedge profile
  geom.scale(1.1, 1.0, 0.65);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a pistachio nut geometry (curved kernel with organic oval shape)
 */
export function createPistachioNutGeometry(): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(0.18, 16, 16);
  geom.scale(0.8, 1.3, 0.6);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a chocolate chunk geometry (irregular faceted cocoa shard)
 */
export function createChocolateChunkGeometry(): THREE.BufferGeometry {
  const geom = new THREE.DodecahedronGeometry(0.16, 0);
  geom.scale(1.2, 0.8, 0.7);
  geom.computeVertexNormals();
  return geom;
}

