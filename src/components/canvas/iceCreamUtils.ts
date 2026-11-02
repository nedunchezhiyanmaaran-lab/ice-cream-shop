import * as THREE from 'three';

/**
 * Creates an authentic, organic artisanal gelato scoop geometry with
 * gentle paddle folds, micro-ridges, and a natural ruffled base skirt.
 */
export function createScoopGeometry(radius = 0.88, seed = 1): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(radius, 80, 80);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();

  const s = seed * 4.71;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    const dir = v.clone().normalize();
    const phi = Math.atan2(dir.z, dir.x);
    const theta = Math.acos(dir.y);

    // 1. Gentle asymmetric tilt & paddle swirl
    const paddleSwirl =
      Math.sin(dir.y * 4.5 + phi * 2.0 + s) * 0.045 +
      Math.cos(dir.x * 5.0 + dir.z * 4.0 + s * 1.5) * 0.035;

    // 2. Fine surface folds (gelato paddle scrape waves)
    const microFolds =
      Math.sin(phi * 6.0 + theta * 7.0 + s) * 0.02 +
      Math.cos(dir.y * 12.0 + s) * 0.015;

    // 3. Realistic scoop skirt at the bottom (where the metal scoop cut into the gelato)
    let skirtRuffle = 0;
    if (dir.y < -0.15 && dir.y > -0.75) {
      const beltFactor = Math.sin((( -dir.y - 0.15) / 0.6) * Math.PI);
      const edgeFluting =
        Math.sin(phi * 14.0 + s) * 0.04 +
        Math.cos(phi * 28.0 + s * 2.0) * 0.02;
      skirtRuffle = beltFactor * (0.14 + edgeFluting);
    }

    // 4. Subtle flattening on the underside so it nests on cone / neighbor scoops
    let underFlattening = 0;
    if (v.y < -radius * 0.5) {
      underFlattening = (v.y + radius * 0.5) * 0.2;
    }

    const totalDisp = 1.0 + paddleSwirl + microFolds + skirtRuffle;
    v.multiplyScalar(totalDisp);
    v.y += underFlattening;

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a baked waffle cone bump and color canvas texture with
 * golden-brown diamond lattice and caramelized pocket shading.
 */
export function createWaffleTexture(): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const canvasSize = 1024;

  // 1. Color canvas
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = canvasSize;
  colorCanvas.height = canvasSize;
  const ctx = colorCanvas.getContext('2d')!;

  // Base golden-brown baked gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasSize);
  bgGrad.addColorStop(0, '#E8BA7E'); // Light golden rim
  bgGrad.addColorStop(0.3, '#DE9F58');
  bgGrad.addColorStop(0.7, '#CE8840');
  bgGrad.addColorStop(1, '#B06927'); // Caramelized tip
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // 2. Bump canvas (indented waffle pockets)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = canvasSize;
  bumpCanvas.height = canvasSize;
  const bumpCtx = bumpCanvas.getContext('2d')!;

  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, canvasSize, canvasSize);

  const step = 64;

  // Draw criss-cross grid
  ctx.strokeStyle = 'rgba(110, 50, 15, 0.45)';
  ctx.lineWidth = 7;

  bumpCtx.strokeStyle = '#FFFFFF';
  bumpCtx.lineWidth = 10;

  // Diagonal 1
  for (let x = -canvasSize; x < canvasSize * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + canvasSize, canvasSize);
    ctx.stroke();

    bumpCtx.beginPath();
    bumpCtx.moveTo(x, 0);
    bumpCtx.lineTo(x + canvasSize, canvasSize);
    bumpCtx.stroke();
  }

  // Diagonal 2
  for (let x = -canvasSize; x < canvasSize * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, canvasSize);
    ctx.lineTo(x + canvasSize, 0);
    ctx.stroke();

    bumpCtx.beginPath();
    bumpCtx.moveTo(x, canvasSize);
    bumpCtx.lineTo(x + canvasSize, 0);
    bumpCtx.stroke();
  }

  // Inner caramelized pocket shadows
  ctx.fillStyle = 'rgba(80, 35, 10, 0.3)';
  for (let y = step / 2; y < canvasSize; y += step) {
    for (let x = step / 2; x < canvasSize; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(3, 6);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3, 6);

  return { colorMap, bumpMap };
}

/**
 * Creates micro-noise bump texture for frozen churned cream crystal grain
 */
export function createIceCreamNoiseTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(size, size);
  const d = imgData.data;

  for (let i = 0; i < d.length; i += 4) {
    const n = Math.floor(128 + (Math.random() - 0.5) * 65);
    d[i] = n;
    d[i + 1] = n;
    d[i + 2] = n;
    d[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 10);
  return tex;
}
