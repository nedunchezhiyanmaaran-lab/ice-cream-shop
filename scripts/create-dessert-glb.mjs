class FileReaderPolyfill {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
      if (this.onload) this.onload({ target: this });
    });
  }
}
if (!globalThis.FileReader) {
  globalThis.FileReader = FileReaderPolyfill;
}

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

if (!fs.existsSync('public/models')) {
  fs.mkdirSync('public/models', { recursive: true });
}

const scene = new THREE.Scene();

// 1. Stoneware Pedestal Coupe Geometry (Lathe)
const points = [];
// Footed Base
points.push(new THREE.Vector2(0.0, 0.0));
points.push(new THREE.Vector2(0.55, 0.0));
points.push(new THREE.Vector2(0.58, 0.04));
points.push(new THREE.Vector2(0.55, 0.08));
points.push(new THREE.Vector2(0.42, 0.12));
// Tapered Pedestal Stem
points.push(new THREE.Vector2(0.24, 0.28));
points.push(new THREE.Vector2(0.22, 0.44));
points.push(new THREE.Vector2(0.28, 0.58));
// Flared Coupe Body
points.push(new THREE.Vector2(0.48, 0.72));
points.push(new THREE.Vector2(0.85, 0.92));
points.push(new THREE.Vector2(1.28, 1.12));
// Rounded Lip Rim
points.push(new THREE.Vector2(1.30, 1.15));
points.push(new THREE.Vector2(1.28, 1.18));
points.push(new THREE.Vector2(1.22, 1.17));
// Inner Basin
points.push(new THREE.Vector2(0.82, 0.96));
points.push(new THREE.Vector2(0.45, 0.76));
points.push(new THREE.Vector2(0.12, 0.62));
points.push(new THREE.Vector2(0.0, 0.60));

const bowlGeom = new THREE.LatheGeometry(points, 48);
bowlGeom.computeVertexNormals();

const bowlMat = new THREE.MeshStandardMaterial({
  color: 0xEDE2D2,
  roughness: 0.62,
  metalness: 0.06,
});
const bowlMesh = new THREE.Mesh(bowlGeom, bowlMat);
bowlMesh.name = 'PedestalCoupe';
bowlMesh.castShadow = true;
bowlMesh.receiveShadow = true;
scene.add(bowlMesh);

// Helper: Deform sphere to create natural churned gelato scoop
const createOrganicScoop = (radius, color, seed) => {
  const geom = new THREE.SphereGeometry(radius, 40, 40);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // Churn grooves and organic scoop ripples
    const angle = Math.atan2(v.z, v.x);
    const elevation = v.y / radius;
    const swirl = Math.sin(angle * 3.5 + elevation * 4.0 + seed) * 0.05 * radius;
    const microNoise = Math.sin(v.x * 12 + seed) * Math.cos(v.y * 12) * 0.028 * radius;
    const roughnessOffset = Math.sin(v.z * 18 + elevation * 10) * 0.016 * radius;

    // Flatten bottom slightly so it nests inside the bowl
    const bottomFlatten = v.y < -0.1 ? (v.y + 0.1) * 0.25 : 0;

    const totalDisp = 1.0 + (swirl + microNoise + roughnessOffset) / radius;
    v.multiplyScalar(totalDisp);
    v.y -= bottomFlatten;

    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geom.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.82,
    metalness: 0.04,
  });

  return new THREE.Mesh(geom, mat);
};

// 2. Strawberry Gelato Scoop (Front Left)
const strawberryScoop = createOrganicScoop(0.58, 0xD9566A, 1.4);
strawberryScoop.name = 'StrawberryScoop';
strawberryScoop.position.set(-0.44, 1.24, 0.22);
strawberryScoop.rotation.set(0.2, 0.4, -0.15);
strawberryScoop.castShadow = true;
scene.add(strawberryScoop);

// Melting Strawberry Drip cascading over the bowl rim
const dripCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-0.68, 1.20, 0.45),
  new THREE.Vector3(-0.88, 1.16, 0.62),
  new THREE.Vector3(-0.95, 1.10, 0.68),
  new THREE.Vector3(-0.96, 0.94, 0.66),
  new THREE.Vector3(-0.94, 0.82, 0.64),
]);
const dripGeom = new THREE.TubeGeometry(dripCurve, 24, 0.042, 12, false);
const dripMat = new THREE.MeshStandardMaterial({
  color: 0xDB586D,
  roughness: 0.72,
  metalness: 0.06,
});
const dripMesh = new THREE.Mesh(dripGeom, dripMat);
dripMesh.name = 'StrawberryDrip';
scene.add(dripMesh);

// 3. Dark Chocolate Gelato Scoop (Front Right)
const chocolateScoop = createOrganicScoop(0.56, 0x382019, 2.8);
chocolateScoop.name = 'ChocolateScoop';
chocolateScoop.position.set(0.44, 1.22, 0.20);
chocolateScoop.rotation.set(0.1, -0.5, 0.1);
chocolateScoop.castShadow = true;
scene.add(chocolateScoop);

// 4. Pistachio Gelato Crown Scoop (Top Center)
const pistachioScoop = createOrganicScoop(0.62, 0x8DAA54, 4.2);
pistachioScoop.name = 'PistachioScoop';
pistachioScoop.position.set(0.0, 1.62, -0.06);
pistachioScoop.rotation.set(-0.1, 0.2, 0.05);
pistachioScoop.castShadow = true;
scene.add(pistachioScoop);

// 5. Pistachio Crushed Nut Pieces on top of Pistachio scoop
const nutMat = new THREE.MeshStandardMaterial({ color: 0x98B75C, roughness: 0.65 });
const nutGeom = new THREE.DodecahedronGeometry(0.045);
for (let i = 0; i < 9; i++) {
  const nutMesh = new THREE.Mesh(nutGeom, nutMat);
  const angle = (i / 9) * Math.PI * 2;
  const r = 0.22 + (i % 3) * 0.08;
  nutMesh.position.set(
    Math.cos(angle) * r,
    1.98 + Math.sin(i * 1.5) * 0.08,
    Math.sin(angle) * r - 0.06
  );
  nutMesh.rotation.set(i * 0.6, i * 0.8, i * 0.4);
  scene.add(nutMesh);
}

// 6. Chocolate Curls on Chocolate Scoop
const curlMat = new THREE.MeshStandardMaterial({ color: 0x22130E, roughness: 0.7 });
const curlGeom = new THREE.BoxGeometry(0.08, 0.02, 0.05);
for (let i = 0; i < 6; i++) {
  const curl = new THREE.Mesh(curlGeom, curlMat);
  curl.position.set(
    0.42 + (i % 3) * 0.09,
    1.52 + Math.sin(i) * 0.06,
    0.28 + (i % 2) * 0.08
  );
  curl.rotation.set(0.3 + i * 0.4, i * 0.7, -0.2);
  scene.add(curl);
}

// Export to binary GLB
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (result) => {
    const buffer = Buffer.from(result);
    fs.writeFileSync('public/models/gelato-dessert-coupe.glb', buffer);
    console.log('Successfully generated public/models/gelato-dessert-coupe.glb! Size:', buffer.length);
  },
  (error) => {
    console.error('Error exporting GLB:', error);
  },
  { binary: true }
);
