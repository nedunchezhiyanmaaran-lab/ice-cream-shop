const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function buildPhotorealisticGLB() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const glbBase64 = await page.evaluate(async () => {
    // Dynamic import Three.js and GLTFExporter
    // In browser, we can use the bundled modules or load Three
    // Let's check window.THREE or import
    const THREE = await import('/src/utils/gsapConfig.ts').then(async () => {
      // Let's import three from vite
      return await import('three');
    });
    const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

    const scene = new THREE.Scene();

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = await new Promise((resolve) => {
      textureLoader.load('/images/hero-artisan-dessert-transparent.png', resolve);
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    // Create a 3D curved relief mesh that maps the photorealistic texture:
    // Width = 2.4, Height = 1.6 (aspect ratio 1.5 matching 1024x682)
    const geom = new THREE.PlaneGeometry(2.4, 1.6, 64, 64);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    // Add subtle cylindrical curvature (convex curve toward camera)
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const distFromCenter = Math.abs(v.x) / 1.2;
      const depth = -Math.pow(distFromCenter, 2) * 0.28;
      pos.setZ(i, depth);
    }
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.75,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = 'ArtisanalGelatoCoupe';
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // Export GLB
    const exporter = new GLTFExporter();
    return new Promise((resolve, reject) => {
      exporter.parse(
        scene,
        (result) => {
          const bytes = new Uint8Array(result);
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
          }
          resolve(btoa(binary));
        },
        (error) => reject(error),
        { binary: true }
      );
    });
  });

  const buffer = Buffer.from(glbBase64, 'base64');
  fs.writeFileSync('public/models/gelato-dessert-coupe.glb', buffer);
  console.log('Successfully created photorealistic GLB! Size:', buffer.length);
  await browser.close();
}

buildPhotorealisticGLB().catch(console.error);

