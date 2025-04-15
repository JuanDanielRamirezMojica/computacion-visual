// // Hexágono animado con movimiento circular, rotación y escalado dinámico


import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Hexagon from './Hexagon'
//import ColoredHexagon from './ColoredHexagon'
import ColoredSphere from './ColoredSphere' // Cambiado


function App() {
  return (
    <Canvas camera={{ position: [20, 20, 20], fov: 80 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Renderiza el componente Hexagon */}
      <Hexagon />

      {/* Renderiza el componente ColoredSphere */}
      <ColoredSphere />
      <OrbitControls />
    </Canvas>
  )
}
//      <ColoredHexagon />

export default App

