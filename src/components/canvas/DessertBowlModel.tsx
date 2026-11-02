import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  createPedestalBowlGeometry,
  createCeramicBowlTexture,
  createGelatoScoopGeometry,
  createStrawberryWedgeGeometry,
  createPistachioNutGeometry,
  createChocolateChunkGeometry,
} from './dessertBowlUtils';
import { createIceCreamNoiseTexture } from './iceCreamUtils';
import { gsap } from '../../utils/gsapConfig';

export type ActiveFlavourType = 'pistachio' | 'strawberry' | 'chocolate';

interface DessertBowlModelProps {
  activeFlavour: ActiveFlavourType;
  mousePos: { x: number; y: number };
  scrollProgress: number;
}

export const DessertBowlModel: React.FC<DessertBowlModelProps> = ({
  activeFlavour,
  mousePos,
  scrollProgress,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const bowlMeshRef = useRef<THREE.Mesh>(null);
  const scoopPistachioRef = useRef<THREE.Mesh>(null);
  const scoopStrawberryRef = useRef<THREE.Mesh>(null);
  const scoopChocolateRef = useRef<THREE.Mesh>(null);
  const floatingGroupRef = useRef<THREE.Group>(null);
  const haloRingRef = useRef<THREE.Mesh>(null);

  // Textures
  const { colorMap: bowlColor, bumpMap: bowlBump } = useMemo(() => createCeramicBowlTexture(), []);
  const noiseBump = useMemo(() => createIceCreamNoiseTexture(), []);

  // Geometries
  const bowlGeom = useMemo(() => createPedestalBowlGeometry(), []);
  const strawberryScoopGeom = useMemo(() => createGelatoScoopGeometry(0.75, 1), []);
  const chocolateScoopGeom = useMemo(() => createGelatoScoopGeometry(0.74, 2), []);
  const pistachioScoopGeom = useMemo(() => createGelatoScoopGeometry(0.82, 3), []);

  const strawberryWedgeGeom = useMemo(() => createStrawberryWedgeGeometry(), []);
  const pistachioNutGeom = useMemo(() => createPistachioNutGeometry(), []);
  const chocolateChunkGeom = useMemo(() => createChocolateChunkGeometry(), []);

  // 1. Initial GSAP Entrance Animation
  useEffect(() => {
    if (
      !rootGroupRef.current ||
      !bowlMeshRef.current ||
      !scoopPistachioRef.current ||
      !scoopStrawberryRef.current ||
      !scoopChocolateRef.current ||
      !floatingGroupRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });

    // Initial hidden / assembled positions
    gsap.set(rootGroupRef.current.position, { y: -1.2, x: 0 });
    gsap.set(rootGroupRef.current.scale, { x: 0.68, y: 0.68, z: 0.68 });
    gsap.set(rootGroupRef.current.rotation, { y: -0.3, x: 0.08 });

    gsap.set(bowlMeshRef.current.position, { y: -1.6 });
    gsap.set(scoopChocolateRef.current.position, { y: 2.5, x: 0.8 });
    gsap.set(scoopStrawberryRef.current.position, { y: 2.7, x: -0.8 });
    gsap.set(scoopPistachioRef.current.position, { y: 3.4 });
    gsap.set(floatingGroupRef.current.scale, { x: 0, y: 0, z: 0 });

    // Step 1: Pedestal Bowl Rises & Settles
    tl.to(bowlMeshRef.current.position, {
      y: -0.35,
      duration: 1.0,
      ease: 'power3.out',
    });

    tl.to(
      rootGroupRef.current.scale,
      { x: 0.86, y: 0.86, z: 0.86, duration: 1.2, ease: 'power3.out' },
      '-=0.85'
    );

    tl.to(
      rootGroupRef.current.position,
      { y: -0.05, duration: 1.1, ease: 'power3.out' },
      '-=0.95'
    );

    // Step 2: Scoops drop into position sequentially
    tl.to(
      scoopChocolateRef.current.position,
      { x: 0.58, y: 0.42, z: 0.2, duration: 0.75, ease: 'back.out(1.4)' },
      '-=0.55'
    );

    tl.to(
      scoopStrawberryRef.current.position,
      { x: -0.58, y: 0.45, z: 0.25, duration: 0.75, ease: 'back.out(1.4)' },
      '-=0.5'
    );

    tl.to(
      scoopPistachioRef.current.position,
      { x: 0.0, y: 1.15, z: -0.05, duration: 0.85, ease: 'back.out(1.3)' },
      '-=0.45'
    );

    // Step 3: Floating ingredients bloom outward
    tl.to(
      floatingGroupRef.current.scale,
      { x: 1, y: 1, z: 1, duration: 1.1, ease: 'back.out(1.5)' },
      '-=0.6'
    );

    // Step 4: Settle rotation to hero presentation angle
    tl.to(
      rootGroupRef.current.rotation,
      { y: 0.1, x: 0.06, z: 0, duration: 1.2, ease: 'power2.out' },
      '-=0.8'
    );
  }, []);

  // 2. Active Flavour Selection Interaction
  useEffect(() => {
    if (!rootGroupRef.current) return;

    let targetTiltY = 0.1;
    let targetTiltX = 0.06;

    if (activeFlavour === 'strawberry') {
      targetTiltY = -0.2; // Tilt toward left front scoop
      targetTiltX = 0.12;
    } else if (activeFlavour === 'chocolate') {
      targetTiltY = 0.32; // Tilt toward right front scoop
      targetTiltX = 0.1;
    } else if (activeFlavour === 'pistachio') {
      targetTiltY = 0.04; // Center crown scoop
      targetTiltX = 0.03;
    }

    gsap.to(rootGroupRef.current.rotation, {
      y: targetTiltY,
      x: targetTiltX,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Tactile nod
    gsap.fromTo(
      rootGroupRef.current.position,
      { y: 0.04 },
      { y: -0.05, duration: 0.45, ease: 'bounce.out' }
    );
  }, [activeFlavour]);

  // 3. Render Loop: Cursor Follow & Scroll-triggered Separation
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.5) * 0.03;

    // Target rotation influenced by mouse cursor
    const mouseRotY = mousePos.x * 0.25 + scrollProgress * 0.55;
    const mouseRotX = -mousePos.y * 0.16;

    rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.y,
      0.1 + mouseRotY,
      delta * 3.2
    );
    rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.x,
      0.06 + mouseRotX,
      delta * 3.2
    );
    rootGroupRef.current.position.y = THREE.MathUtils.lerp(
      rootGroupRef.current.position.y,
      -0.05 + floatY - scrollProgress * 0.3,
      delta * 3.5
    );

    // Floating orbital ring spin
    if (haloRingRef.current) {
      haloRingRef.current.rotation.z = time * 0.22;
      haloRingRef.current.rotation.y = time * 0.14;
    }

    // Scroll-based culinary depth separation
    const expansion = scrollProgress * 0.22;

    if (scoopStrawberryRef.current) {
      scoopStrawberryRef.current.position.x = -0.58 - expansion * 0.45;
      scoopStrawberryRef.current.position.y = 0.45 + expansion * 0.32;
    }
    if (scoopChocolateRef.current) {
      scoopChocolateRef.current.position.x = 0.58 + expansion * 0.45;
      scoopChocolateRef.current.position.y = 0.42 + expansion * 0.32;
    }
    if (scoopPistachioRef.current) {
      scoopPistachioRef.current.position.y = 1.15 + expansion * 0.65;
    }
  });

  return (
    <group ref={rootGroupRef} dispose={null} scale={[0.86, 0.86, 0.86]}>
      {/* 1. CERAMIC PEDESTAL DESSERT BOWL */}
      <mesh ref={bowlMeshRef} geometry={bowlGeom} position={[0, -0.35, 0]}>
        <meshStandardMaterial
          map={bowlColor}
          bumpMap={bowlBump}
          bumpScale={0.045}
          roughness={0.62}
          metalness={0.05}
        />
      </mesh>

      {/* 2. THREE ARTISANAL GELATO SCOOPS */}

      {/* Front-Left Scoop: Wild Strawberry */}
      <mesh
        ref={scoopStrawberryRef}
        geometry={strawberryScoopGeom}
        position={[-0.58, 0.45, 0.25]}
        rotation={[0.1, -0.25, 0.15]}
      >
        <meshPhysicalMaterial
          color="#DB5469"
          roughness={0.46}
          bumpMap={noiseBump}
          bumpScale={0.025}
          clearcoat={0.24}
          clearcoatRoughness={0.3}
          emissive="#7A1828"
          emissiveIntensity={activeFlavour === 'strawberry' ? 0.22 : 0.0}
        />
      </mesh>

      {/* Strawberry Melt Drip over Bowl Rim */}
      <mesh position={[-1.22, 0.36, 0.44]} rotation={[0.4, -0.3, 0.6]} scale={[0.15, 0.3, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial
          color="#DB5469"
          roughness={0.4}
          clearcoat={0.4}
        />
      </mesh>

      {/* Front-Right Scoop: Belgian Chocolate */}
      <mesh
        ref={scoopChocolateRef}
        geometry={chocolateScoopGeom}
        position={[0.58, 0.42, 0.2]}
        rotation={[-0.1, 0.3, -0.1]}
      >
        <meshPhysicalMaterial
          color="#341E17"
          roughness={0.52}
          bumpMap={noiseBump}
          bumpScale={0.025}
          clearcoat={0.2}
          clearcoatRoughness={0.35}
          emissive="#2A1009"
          emissiveIntensity={activeFlavour === 'chocolate' ? 0.28 : 0.0}
        />
      </mesh>

      {/* Top Crown Scoop: Sicilian Bronte Pistachio */}
      <mesh
        ref={scoopPistachioRef}
        geometry={pistachioScoopGeom}
        position={[0.0, 1.15, -0.05]}
        rotation={[0.08, 0.15, 0.0]}
      >
        <meshPhysicalMaterial
          color="#8DA855"
          roughness={0.5}
          bumpMap={noiseBump}
          bumpScale={0.03}
          clearcoat={0.25}
          clearcoatRoughness={0.28}
          emissive="#455B1E"
          emissiveIntensity={activeFlavour === 'pistachio' ? 0.22 : 0.0}
        />
      </mesh>

      {/* 3. FLOATING INGREDIENTS IN 3D ORBIT */}
      <group ref={floatingGroupRef}>
        {/* Floating Pistachio Kernels in Air */}
        <mesh geometry={pistachioNutGeom} position={[-0.45, 2.1, 0.25]} rotation={[0.4, 0.6, 0.2]}>
          <meshStandardMaterial color="#688B38" roughness={0.65} />
        </mesh>
        <mesh geometry={pistachioNutGeom} position={[0.7, 2.0, -0.2]} rotation={[-0.3, 0.8, -0.5]}>
          <meshStandardMaterial color="#688B38" roughness={0.65} />
        </mesh>
        {/* Whole Pistachio in Shell floating */}
        <mesh position={[-0.2, 2.25, 0.35]} rotation={[0.8, 0.2, 0.5]} scale={[0.17, 0.24, 0.17]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#D7C4A3" roughness={0.7} />
        </mesh>
        <mesh position={[0.9, 1.8, 0.3]} rotation={[0.5, -0.4, 0.8]} scale={[0.15, 0.22, 0.15]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#D7C4A3" roughness={0.7} />
        </mesh>

        {/* Floating Fresh Strawberry Slices */}
        {/* Strawberry slice resting on left bowl rim */}
        <mesh
          geometry={strawberryWedgeGeom}
          position={[-1.38, 0.62, 0.42]}
          rotation={[0.2, 0.5, -0.6]}
          scale={[1.05, 1.05, 1.05]}
        >
          <meshStandardMaterial color="#D92231" roughness={0.4} />
        </mesh>

        {/* Floating Strawberry Slice in mid-air */}
        <mesh
          geometry={strawberryWedgeGeom}
          position={[-1.65, 1.3, 0.55]}
          rotation={[0.6, -0.4, 0.8]}
          scale={[0.9, 0.9, 0.9]}
        >
          <meshStandardMaterial color="#D92231" roughness={0.4} />
        </mesh>

        {/* Floating Dark Chocolate Chunks */}
        <mesh geometry={chocolateChunkGeom} position={[1.38, 1.6, 0.28]} rotation={[0.5, 0.7, 0.2]}>
          <meshStandardMaterial color="#22120D" roughness={0.5} />
        </mesh>
        <mesh geometry={chocolateChunkGeom} position={[1.55, 0.9, 0.45]} rotation={[-0.4, 0.6, -0.3]}>
          <meshStandardMaterial color="#22120D" roughness={0.5} />
        </mesh>
        <mesh geometry={chocolateChunkGeom} position={[1.1, 0.8, 0.75]} rotation={[0.8, -0.2, 0.4]}>
          <meshStandardMaterial color="#22120D" roughness={0.5} />
        </mesh>

        {/* Roasted Pistachio bits on top crown scoop */}
        {[
          [-0.18, 1.82, 0.15],
          [0.14, 1.88, 0.1],
          [-0.05, 1.92, -0.08],
          [0.22, 1.8, -0.15],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} scale={[0.042, 0.06, 0.042]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#5E7E2C" roughness={0.6} />
          </mesh>
        ))}

        {/* Chocolate flakes on chocolate scoop */}
        {[
          [0.42, 0.92, 0.35],
          [0.68, 0.85, 0.28],
          [0.62, 0.72, 0.48],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} scale={[0.042, 0.038, 0.055]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#1E0E0A" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 4. LUMINOUS GOLDEN ORBITAL HALO RING */}
      <mesh
        ref={haloRingRef}
        position={[0, 0.52, 0]}
        rotation={[Math.PI / 3.2, 0.2, 0]}
      >
        <torusGeometry args={[1.88, 0.011, 16, 64]} />
        <meshBasicMaterial
          color="#FCE19B"
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* 5. TABLETOP / FLOOR INGREDIENTS PROPS */}
      {/* Cut strawberry on the ground */}
      <mesh
        geometry={strawberryWedgeGeom}
        position={[-0.42, -1.22, 1.1]}
        rotation={[Math.PI / 2 - 0.2, 0.1, -0.4]}
        scale={[1.1, 1.1, 1.1]}
      >
        <meshStandardMaterial color="#D92231" roughness={0.4} />
      </mesh>

      {/* Whole Pistachio in shell on ground */}
      <mesh position={[-0.9, -1.22, 0.85]} rotation={[0.1, 0.8, 0.2]} scale={[0.18, 0.25, 0.18]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#D7C4A3" roughness={0.7} />
      </mesh>
      {/* Scattered pistachio kernel on ground */}
      <mesh geometry={pistachioNutGeom} position={[-0.68, -1.24, 1.2]} rotation={[0, 0.5, 0]}>
        <meshStandardMaterial color="#688B38" roughness={0.65} />
      </mesh>

      {/* Dark chocolate blocks on the ground */}
      <mesh geometry={chocolateChunkGeom} position={[1.18, -1.23, 0.9]} rotation={[0, 0.4, 0]} scale={[1.35, 1.15, 1.15]}>
        <meshStandardMaterial color="#22120D" roughness={0.5} />
      </mesh>
      <mesh geometry={chocolateChunkGeom} position={[1.45, -1.23, 0.65]} rotation={[0.3, 0.8, -0.2]}>
        <meshStandardMaterial color="#22120D" roughness={0.5} />
      </mesh>

      {/* 6. Contact Shadow Plane */}
      <mesh position={[0, -1.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 4.6]} />
        <shadowMaterial opacity={0.17} />
      </mesh>
    </group>
  );
};
