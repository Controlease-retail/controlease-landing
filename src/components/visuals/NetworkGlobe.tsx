import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export const NetworkGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random points on a sphere
  const points = useMemo(() => {
    const pts = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Create connections between close points
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 3) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    return lines;
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]} scale={1.2}>
      {/* Central Sphere */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color="#4c73e4"
          emissive="#141029"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Outer Ghost Sphere */}
      <Sphere args={[4.2, 32, 32]}>
        <meshBasicMaterial color="#4c73e4" transparent opacity={0.03} wireframe />
      </Sphere>

      {/* Nodes */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#f26672' : '#ffffff'} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#ffffff"
          transparent
          opacity={0.1}
          lineWidth={1}
        />
      ))}
    </group>
  );
};


