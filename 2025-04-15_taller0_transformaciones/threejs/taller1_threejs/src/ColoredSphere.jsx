import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ColoredSphere() {
  const meshRef = useRef()
  //const colors = ['#57cc99', '#a663cc', '#006992', '#f94144', 'purple']
  const colors = ['#57cc99', '#a663cc', '#006992', '#caffbf', '#f94144'] 
  const colorChangeInterval = 1 // Intervalo de cambio de color en seg.
  let lastColorChangeTime = 0 // Tiempo último cambio color
  let colorIndex = 0 //Índice color actual

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const mesh = meshRef.current

    //Movimiento circular en x y z
    const radius = 20
    mesh.position.x = Math.sin(t * 2.5) * radius
    mesh.position.z = Math.cos(t * 2.5) * radius

    // Movimiento oscilante en y (de abajo hacia arriba)
    mesh.position.y = Math.sin(t * 2) * 5 // Oscila entre -5 y 5

    // Rotación
    mesh.rotation.y = t * 0.5
    mesh.rotation.z = t * 0.3

    // ambio de color cada `colorChangeInterval` segundos
    if (t - lastColorChangeTime > colorChangeInterval) {
      lastColorChangeTime = t
      colorIndex = (colorIndex + 1) % colors.length // Cambia al siguiente
      mesh.material.color.set(colors[colorIndex]) // Actualiza el color del material
    }
  })

  return (
    <mesh ref={meshRef}>
        {/*Esfera con radio 2 y 32 segmentos */}
      <sphereGeometry args={[2, 32, 32]} />

        {/*Empeiza con el color de la pos 0*/}
      <meshStandardMaterial color={colors[0]} />
    </mesh>
  )
}