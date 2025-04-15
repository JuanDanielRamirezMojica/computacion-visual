

/*



ESTE CÓDIGO NO FUE IMPLEMENTADO, SE DEJA PARA REVISAR EN FUTURASA VERSIONES.


*/

/*


import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ColoredHexagon() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const mesh = meshRef.current

    // Movimiento circular
    const radius = 20
    mesh.position.x = Math.sin(t * 5.5) * radius
    mesh.position.z = Math.cos(t * 5.5) * radius

    // Rotación
    mesh.rotation.y = t * 0.5
    mesh.rotation.z = t * 0.3
  })

  // Crear geometría con colores en cada cara
  const geometry = new THREE.CylinderGeometry(2, 2, 2, 6, 1, true)
  const materialArray = [
    new THREE.MeshStandardMaterial({ color: 'red' }),
    new THREE.MeshStandardMaterial({ color: 'green' }),
    new THREE.MeshStandardMaterial({ color: 'blue' }),
    new THREE.MeshStandardMaterial({ color: 'yellow' }),
    new THREE.MeshStandardMaterial({ color: 'purple' }),
    new THREE.MeshStandardMaterial({ color: 'orange' }),
  ]

  // Crear un grupo de materiales para las caras
  const materials = materialArray.map((material) => material)

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {materials.map((material, index) => (
        <primitive attachArray="material" object={material} key={index} />
      ))}
    </mesh>
  )
}

*/