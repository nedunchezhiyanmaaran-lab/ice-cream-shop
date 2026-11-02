import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createScoopGeometry, createWaffleTexture, createIceCreamNoiseTexture } from './iceCreamUtils';
import { gsap } from '../../utils/gsapConfig';

export interface FlavourConfig {
  id: string;
  name: string;
  topColor: string;
  accentColor: string;
  tagline: string;
}

interface IceCreamModelProps {
  activeFlavour: FlavourConfig;
  mousePos: { x: number; y: number };
  scrollProgress: number;
}

export const IceCreamModel: React.FC<IceCreamModelProps> = ({
  activeFlavour,
  mousePos,
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coneMeshRef = useRef<THREE.Mesh>(null);
  const scoop1Ref = useRef<THREE.Mesh>(null); // Belgian Chocolate (bottom-left)
  const scoop2Ref = useRef<THREE.Mesh>(null); // Wild Strawberry (bottom-right)
  const scoop3Ref = useRef<THREE.Mesh>(null); // Crown Scoop (Pistachio / Active)
  const topScoopMatRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Generate textures once
  const { colorMap, bumpMap } = useMemo(() => createWaffleTexture(), []);
  const noiseBump = useMemo(() => createIceCreamNoiseTexture(), []);

  // Geometries for the 3 distinct artisanal scoops
  const scoopGeom1 = useMemo(() => createScoopGeometry(0.72, 1), []);
  const scoopGeom2 = useMemo(() => createScoopGeometry(0.70, 2), []);
  const scoopGeom3 = useMemo(() => createScoopGeometry(0.76, 3), []);

  // Toasted pistachio & chocolate flake garnish on top crown
  const garnishPieces = useMemo(() => {
    const pieces: { pos: [number, number, number]; rot: [number, number, number]; scale: number; isNut: boolean }[] = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.3;
      const r = 0.3 + Math.random() * 0.28;
      pieces.push({
        pos: [Math.cos(angle) * r, 1.95 + Math.random() * 0.15, Math.sin(angle) * r + 0.04],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.045 + Math.random() * 0.03,
        isNut: i % 2 === 0,
      });
    }
    return pieces;
  }, []);

  // 1. Initial GSAP Entrance Animation
  useEffect(() => {
    if (!groupRef.current || !coneMeshRef.current || !scoop1Ref.current || !scoop2Ref.current || !scoop3Ref.current) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.25 });

    // Initial state: lowered, scaled down, scoops floating above
    gsap.set(groupRef.current.position, { y: -1.4, x: 0 });
    gsap.set(groupRef.current.scale, { x: 0.72, y: 0.72, z: 0.72 });
    gsap.set(groupRef.current.rotation, { y: -0.4, x: 0.12, z: 0.02 });

    gsap.set(coneMeshRef.current.position, { y: -2.2 });
    gsap.set(scoop1Ref.current.position, { y: 2.8, x: -0.6 });
    gsap.set(scoop2Ref.current.position, { y: 3.0, x: 0.6 });
    gsap.set(scoop3Ref.current.position, { y: 3.8 });

    // Step 1: Cone glides up & scales to full presence
    tl.to(coneMeshRef.current.position, {
      y: -0.9,
      duration: 1.0,
      ease: 'power3.out',
    });

    tl.to(
      groupRef.current.scale,
      { x: 1, y: 1, z: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.9'
    );

    tl.to(
      groupRef.current.position,
      { y: -0.2, duration: 1.1, ease: 'power3.out' },
      '-=1.0'
    );

    // Step 2: Scoops drop into position sequentially
    tl.to(
      scoop1Ref.current.position,
      { x: -0.38, y: 0.65, z: 0.16, duration: 0.75, ease: 'back.out(1.4)' },
      '-=0.55'
    );

    tl.to(
      scoop2Ref.current.position,
      { x: 0.38, y: 0.62, z: 0.12, duration: 0.75, ease: 'back.out(1.4)' },
      '-=0.5'
    );

    tl.to(
      scoop3Ref.current.position,
      { x: 0.0, y: 1.36, z: 0.02, duration: 0.85, ease: 'back.out(1.3)' },
      '-=0.45'
    );

    // Step 3: Gentle settling rotation into prime showcase angle
    tl.to(
      groupRef.current.rotation,
      { y: 0.18, x: 0.06, z: -0.03, duration: 1.2, ease: 'power2.out' },
      '-=0.6'
    );
  }, []);

  // 2. Smooth Flavour Change Transition
  useEffect(() => {
    if (!topScoopMatRef.current) return;

    const targetColor = new THREE.Color(activeFlavour.topColor);
    gsap.to(topScoopMatRef.current.color, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.7,
      ease: 'power2.inOut',
    });

    // Subtle tactile nod on change
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.position,
        { y: -0.1 },
        { y: -0.2, duration: 0.45, ease: 'bounce.out' }
      );
    }
  }, [activeFlavour]);

  // 3. Render Loop: Cursor Follow & Scroll-triggered Separation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.6) * 0.045;

    // Target rotation influenced by mouse pointer
    const targetRotY = 0.18 + mousePos.x * 0.28 + scrollProgress * 0.6;
    const targetRotX = 0.06 - mousePos.y * 0.2;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3.2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3.2);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.2 + floatY - scrollProgress * 0.35,
      delta * 3.5
    );

    // Scroll-based culinary separation (exploded view)
    const expansion = scrollProgress * 0.22;

    if (scoop1Ref.current) {
      scoop1Ref.current.position.x = -0.38 - expansion * 0.5;
      scoop1Ref.current.position.y = 0.65 + expansion * 0.35;
    }
    if (scoop2Ref.current) {
      scoop2Ref.current.position.x = 0.38 + expansion * 0.5;
      scoop2Ref.current.position.y = 0.62 + expansion * 0.35;
    }
    if (scoop3Ref.current) {
      scoop3Ref.current.position.y = 1.36 + expansion * 0.75;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. ARTISANAL WAFFLE CONE (Pointed down, wide rim at top) */}
      <mesh
        ref={coneMeshRef}
        position={[0, -0.9, 0]}
      >
        <cylinderGeometry args={[1.08, 0.06, 2.6, 48, 1, false]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.065}
          roughness={0.72}
          metalness={0.04}
        />
      </mesh>

      {/* 2. THREE ARTISANAL GELATO SCOOPS */}

      {/* Scoop 1: Belgian Chocolate (Bottom Left) */}
      <mesh
        ref={scoop1Ref}
        geometry={scoopGeom1}
        position={[-0.38, 0.65, 0.16]}
        rotation={[0.15, -0.35, 0.08]}
      >
        <meshPhysicalMaterial
          color="#351E17" // Deep 72% Criollo Dark Chocolate
          roughness={0.54}
          bumpMap={noiseBump}
          bumpScale={0.025}
          clearcoat={0.18}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* Scoop 2: Wild Strawberry (Bottom Right) */}
      <mesh
        ref={scoop2Ref}
        geometry={scoopGeom2}
        position={[0.38, 0.62, 0.12]}
        rotation={[-0.1, 0.4, -0.1]}
      >
        <meshPhysicalMaterial
          color="#D95667" // Fresh Macerated Woodland Strawberry
          roughness={0.48}
          bumpMap={noiseBump}
          bumpScale={0.025}
          clearcoat={0.22}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Scoop 3: Crown Scoop (Pistachio by default / active flavour) */}
      <mesh
        ref={scoop3Ref}
        geometry={scoopGeom3}
        position={[0.0, 1.36, 0.02]}
        rotation={[0.08, 0.15, 0.0]}
      >
        <meshPhysicalMaterial
          ref={topScoopMatRef}
          color={activeFlavour.topColor}
          roughness={0.52}
          bumpMap={noiseBump}
          bumpScale={0.03}
          clearcoat={0.25}
          clearcoatRoughness={0.28}
        />
      </mesh>

      {/* 3. ROASTED NUT & CHOCOLATE FLAKES SPRINKLED ON CROWN */}
      {garnishPieces.map((p, idx) => (
        <mesh
          key={idx}
          position={p.pos}
          rotation={p.rot}
          scale={[p.scale, p.scale * 1.4, p.scale]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={p.isNut ? '#688B38' : '#26120C'}
            roughness={0.65}
          />
        </mesh>
      ))}

      {/* 4. Contact Shadow Plane */}
      <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
};
