import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type NodePoint = {
  position: [number, number, number]
  radius: number
  color: string
  halo: string
}

const nodePoints: NodePoint[] = [
  { position: [-1.48, 0.44, 0.24], radius: 0.13, color: '#7DA5E7', halo: '#8BB8FF' },
  { position: [-0.92, 1.04, -0.28], radius: 0.09, color: '#BFAFFF', halo: '#D5C7FF' },
  { position: [-0.22, 0.68, 0.58], radius: 0.1, color: '#8BB8FF', halo: '#8BB8FF' },
  { position: [0.55, 1.04, 0.04], radius: 0.12, color: '#66C8BA', halo: '#78D6C6' },
  { position: [1.26, 0.42, -0.22], radius: 0.12, color: '#7DA5E7', halo: '#8BB8FF' },
  { position: [1.04, -0.38, 0.42], radius: 0.09, color: '#BFAFFF', halo: '#D5C7FF' },
  { position: [0.36, -1.0, -0.18], radius: 0.12, color: '#6CCCBC', halo: '#78D6C6' },
  { position: [-0.58, -0.86, 0.3], radius: 0.1, color: '#BFAFFF', halo: '#D5C7FF' },
  { position: [-1.2, -0.34, -0.36], radius: 0.1, color: '#66C8BA', halo: '#78D6C6' },
  { position: [-0.08, -0.08, 0.18], radius: 0.15, color: '#171A20', halo: '#8BB8FF' },
  { position: [0.55, 0.1, -0.58], radius: 0.08, color: '#E9C46A', halo: '#E9C46A' },
  { position: [-0.34, 0.18, -0.72], radius: 0.08, color: '#66C8BA', halo: '#78D6C6' },
]

const edges = [
  [0, 1],
  [0, 2],
  [0, 8],
  [0, 9],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 9],
  [2, 11],
  [3, 4],
  [3, 9],
  [3, 10],
  [4, 5],
  [4, 9],
  [5, 6],
  [5, 9],
  [6, 7],
  [6, 9],
  [7, 8],
  [7, 9],
  [8, 9],
  [10, 11],
  [10, 9],
  [11, 9],
]

function NeuralSculpture() {
  const group = useRef<THREE.Group>(null)
  const ringOne = useRef<THREE.Mesh>(null)
  const ringTwo = useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!group.current || prefersReducedMotion) return
    const time = clock.getElapsedTime()
    group.current.rotation.y = Math.sin(time * 0.32) * 0.22 + pointer.x * 0.16
    group.current.rotation.x = Math.cos(time * 0.27) * 0.1 - pointer.y * 0.1
    group.current.rotation.z = Math.sin(time * 0.22) * 0.045
    group.current.position.y = Math.sin(time * 0.72) * 0.07
    if (ringOne.current) ringOne.current.rotation.z = time * 0.12
    if (ringTwo.current) ringTwo.current.rotation.z = -time * 0.09
  })

  return (
    <group ref={group}>
      <mesh position={[-0.35, 0.26, -1.05]} scale={[1.45, 1.1, 0.14]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#8BB8FF" transparent opacity={0.12} roughness={0.5} depthWrite={false} />
      </mesh>
      <mesh position={[0.7, -0.24, -0.92]} scale={[1.05, 0.9, 0.12]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#78D6C6" transparent opacity={0.12} roughness={0.5} depthWrite={false} />
      </mesh>
      <mesh position={[-0.08, -0.62, -0.82]} scale={[0.92, 0.82, 0.12]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#D5C7FF" transparent opacity={0.13} roughness={0.5} depthWrite={false} />
      </mesh>

      <mesh ref={ringOne} rotation={[1.16, 0.16, -0.38]}>
        <torusGeometry args={[1.72, 0.01, 10, 160]} />
        <meshBasicMaterial color="#9EADC1" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh ref={ringTwo} rotation={[0.58, 1.18, 0.24]}>
        <torusGeometry args={[1.42, 0.01, 10, 160]} />
        <meshBasicMaterial color="#78D6C6" transparent opacity={0.14} depthWrite={false} />
      </mesh>

      {edges.map(([from, to]) => (
        <EdgeTube key={`${from}-${to}`} from={nodePoints[from].position} to={nodePoints[to].position} />
      ))}

      {nodePoints.map((node, index) => (
        <Node key={node.position.join(',')} node={node} index={index} />
      ))}
    </group>
  )
}

function EdgeTube({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const edge = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const direction = end.clone().sub(start)
    const length = direction.length()
    const midpoint = start.clone().add(end).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return { length, midpoint, quaternion }
  }, [from, to])

  return (
    <mesh position={edge.midpoint} quaternion={edge.quaternion}>
      <cylinderGeometry args={[0.011, 0.011, edge.length, 12]} />
      <meshStandardMaterial color="#8EA1B7" transparent opacity={0.5} roughness={0.42} />
    </mesh>
  )
}

function Node({ node, index }: { node: NodePoint; index: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.35 + index * 0.9) * 0.045
    ref.current.scale.setScalar(pulse)
  })

  return (
    <group ref={ref} position={node.position}>
      <mesh>
        <sphereGeometry args={[node.radius * 2.35, 32, 32]} />
        <meshBasicMaterial color={node.halo} transparent opacity={0.13} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[node.radius, 32, 32]} />
        <meshStandardMaterial color={node.color} roughness={0.2} metalness={0.06} emissive={node.color} emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[-node.radius * 0.26, node.radius * 0.35, node.radius * 0.62]}>
        <sphereGeometry args={[node.radius * 0.25, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0, 5.35], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.55} />
        <pointLight position={[-3, 3.5, 4]} intensity={4.6} color="#ffffff" />
        <pointLight position={[3, 1, 2]} intensity={2.8} color="#8BB8FF" />
        <pointLight position={[1.6, -2.5, 2]} intensity={2.1} color="#78D6C6" />
        <NeuralSculpture />
      </Canvas>
    </div>
  )
}
