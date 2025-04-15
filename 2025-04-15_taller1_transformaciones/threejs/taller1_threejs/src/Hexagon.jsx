

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Hexagon() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const mesh = meshRef.current

    // Movimiento circular en X y Z
    const radius = 3 // antes era 0.5
    mesh.position.x = Math.sin(t * 0.8) * radius
    mesh.position.z = Math.cos(t * 0.8) * radius

    //Movimiento vertical Y
    mesh.position.y = Math.sin(t * 2) * 1.5 // antes 0.5

    //Rotación
    mesh.rotation.y = t
    mesh.rotation.z = t * 0.5

    //Escalado dinámico en cada eje
    const scaleX = 1.5 + 0.5 * Math.sin(t*3)
    const scaleY = 1.5 + 0.3 * Math.sin(t * 1.5)
    const scaleZ = 1.5 + 0.2 * Math.sin(t * 2)
    mesh.scale.set(scaleX, scaleY, scaleZ)

    //Cambio de color dinámico
    const hue = (t * 40) % 360
    mesh.material.color.setHSL(hue / 360, 1, 0.5)
  })

  //Hexagono
  const geometry = new THREE.CylinderGeometry(2, 2, 2, 6)

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  )
}
