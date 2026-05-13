import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type NodePoint = {
  position: [number, number, number]
  radius: number
  color: string
}

const nodePoints: NodePoint[] = [
  { position: [-1.35, 0.38, 0.2], radius: 0.11, color: '#8BB8FF' },
  { position: [-0.56, 1.12, -0.1], radius: 0.09, color: '#D5C7FF' },
  { position: [0.56, 0.82, 0.16], radius: 0.1, color: '#78D6C6' },
  { position: [1.18, 0.05, -0.04], radius: 0.12, color: '#8BB8FF' },
  { position: [0.42, -0.9, 0.12], radius: 0.09, color: '#D5C7FF' },
  { position: [-1.02, -0.72, -0.16], radius: 0.1, color: '#78D6C6' },
  { position: [-0.08, 0.0, 0.34], radius: 0.14, color: '#16181D' },
]

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 6],
  [2, 6],
  [4, 6],
  [5, 6],
]

function NeuralSculpture() {
  const group = useRef<THREE.Group>(null)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!group.current || prefersReducedMotion) return
    const time = clock.getElapsedTime()
    group.current.rotation.y = Math.sin(time * 0.35) * 0.18 + pointer.x * 0.12
    group.current.rotation.x = Math.cos(time * 0.28) * 0.08 - pointer.y * 0.08
    group.current.rotation.z = Math.sin(time * 0.2) * 0.04
    group.current.position.y = Math.sin(time * 0.75) * 0.08
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.74, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.16}
          metalness={0.03}
          transmission={0.28}
          transparent
          opacity={0.42}
          depthWrite={false}
          clearcoat={0.65}
          clearcoatRoughness={0.28}
        />
      </mesh>

      <mesh position={[-0.44, 0.42, -0.36]}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshStandardMaterial color="#8BB8FF" transparent opacity={0.3} roughness={0.36} />
      </mesh>
      <mesh position={[0.72, -0.14, -0.18]}>
        <sphereGeometry args={[0.66, 48, 48]} />
        <meshStandardMaterial color="#78D6C6" transparent opacity={0.28} roughness={0.42} />
      </mesh>
      <mesh position={[-0.06, -0.82, -0.18]}>
        <sphereGeometry args={[0.56, 48, 48]} />
        <meshStandardMaterial color="#D5C7FF" transparent opacity={0.32} roughness={0.38} />
      </mesh>

      {edges.map(([from, to]) => (
        <EdgeLine key={`${from}-${to}`} from={nodePoints[from].position} to={nodePoints[to].position} />
      ))}

      {nodePoints.map((node) => (
        <mesh key={node.position.join(',')} position={node.position}>
          <sphereGeometry args={[node.radius, 32, 32]} />
          <meshStandardMaterial color={node.color} roughness={0.24} metalness={0.04} />
        </mesh>
      ))}
    </group>
  )
}

function EdgeLine({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const lineObject = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: '#7F91A8',
      transparent: true,
      opacity: 0.78,
      depthTest: false,
    })
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)])
    const line = new THREE.Line(geometry, material)
    line.renderOrder = 2
    return line
  }, [from, to])

  return <primitive object={lineObject} />
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0, 5.6], fov: 39 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.4} />
        <pointLight position={[-3, 3.5, 4]} intensity={4.4} color="#ffffff" />
        <pointLight position={[3, 1, 2]} intensity={2.6} color="#8BB8FF" />
        <pointLight position={[1.6, -2.5, 2]} intensity={1.9} color="#78D6C6" />
        <NeuralSculpture />
      </Canvas>
    </div>
  )
}
