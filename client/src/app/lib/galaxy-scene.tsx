/* eslint-disable react/display-name */
"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const GALAXY_PARAMS = {
  starCount: 16000,
  radius: 10,
  branches: 4,
  spin: 1.6,
  randomness: 0.35,
  randomnessPower: 3,
  insideColor: new THREE.Color("#ffd8a9"),
  outsideColor: new THREE.Color("#4b2e83"),
};

const SPHERE_RADIUS = 1.2;
const POINT_COUNT = 2400;
const CONNECTION_MAX_DISTANCE = 0.16;

const generateSpherePoints = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  const vectors: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.set([x, y, z], i * 3);
    vectors.push(new THREE.Vector3(x, y, z));
  }
  return { positions, vectors };
};

interface ConnectionsProps {
  vectors: THREE.Vector3[];
  maxDistance: number;
}

const Connections: React.FC<ConnectionsProps> = ({ vectors, maxDistance }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const edges = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < vectors.length; i++) {
      for (let j = i + 1; j < vectors.length; j++) {
        if (vectors[i].distanceTo(vectors[j]) <= maxDistance) {
          pairs.push([vectors[i], vectors[j]]);
        }
      }
    }
    return pairs;
  }, [vectors, maxDistance]);

  const positions = useMemo(() => {
    const posArray = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([p1, p2], i) => {
      posArray.set(p1.toArray(), i * 6);
      posArray.set(p2.toArray(), i * 6 + 3);
    });
    return posArray;
  }, [edges]);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#aabbcc" // pastel açık mavi-gri ton
        transparent
        opacity={0.03} // çok saydam, silik
        linewidth={1} // çoğu tarayıcıda yok ama bırakıyoruz
      />
    </lineSegments>
  );
};

const OuterSphere: React.FC = React.memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { positions, vectors } = useMemo(
    () => generateSpherePoints(POINT_COUNT, SPHERE_RADIUS),
    []
  );

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.5,
        ease: "power4.out",
      });
    }
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.x += 0.0005;
    gsap.to(groupRef.current.rotation, {
      x: mouse.current.y * 0.3,
      y: mouse.current.x * 0.4,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={POINT_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#7899cc"
          transparent
          opacity={0.1}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <Connections vectors={vectors} maxDistance={CONNECTION_MAX_DISTANCE} />
    </group>
  );
});

const SceneContent: React.FC = () => {
  const galaxyGroupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(GALAXY_PARAMS.starCount * 3);
    const col = new Float32Array(GALAXY_PARAMS.starCount * 3);
    const siz = new Float32Array(GALAXY_PARAMS.starCount);

    for (let i = 0; i < GALAXY_PARAMS.starCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.6) * GALAXY_PARAMS.radius;
      const branchAngle =
        ((i % GALAXY_PARAMS.branches) / GALAXY_PARAMS.branches) * Math.PI * 2;
      const spinAngle = r * GALAXY_PARAMS.spin;

      const randomX =
        Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_PARAMS.randomness *
        r;
      const randomY =
        Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_PARAMS.randomness *
        r *
        0.15;
      const randomZ =
        Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_PARAMS.randomness *
        r;

      const x = Math.cos(branchAngle + spinAngle) * r + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * r + randomZ;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      const distance = Math.sqrt(x * x + y * y + z * z);
      const intensity = 1 - distance / GALAXY_PARAMS.radius;
      const color = GALAXY_PARAMS.insideColor
        .clone()
        .lerp(GALAXY_PARAMS.outsideColor, distance / GALAXY_PARAMS.radius);
      col[i3] = color.r * intensity;
      col[i3 + 1] = color.g * intensity;
      col[i3 + 2] = color.b * intensity;
      siz[i] = 0.006 + intensity * 0.03;
    }

    return [pos, col, siz];
  }, []);

  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.2, "rgba(255,255,255,0.6)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.2)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(() => {
    if (!galaxyGroupRef.current) return;
    galaxyGroupRef.current.position.y = -0.5;
    galaxyGroupRef.current.rotation.y += 0.0015;
    galaxyGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      galaxyGroupRef.current.rotation.x,
      mouse.y * 0.1,
      0.05
    );
    galaxyGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      galaxyGroupRef.current.rotation.z,
      mouse.x * 0.1,
      0.05
    );
  });

  return (
    <group ref={galaxyGroupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            itemSize={3}
            count={colors.length / 3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={sizes}
            itemSize={1}
            count={sizes.length}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={glowTexture}
        />
      </points>
      <OuterSphere />
    </group>
  );
};

const GalaxyScene: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <SceneContent />
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
