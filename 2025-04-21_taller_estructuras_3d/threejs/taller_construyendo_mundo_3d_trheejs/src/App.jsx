// ________________________ MÍ CÓDIGO ________________________

// // React nos da Suspense para cargar componentes de forma elegante
// import { Suspense } from 'react'
// // El lienzo donde vivirá nuestro mundo 3D
// import { Canvas } from '@react-three/fiber'
// // OrbitControls - Para mover la cámara con el mouse
// // useProgress - Para saber cuánto ha cargado el modelo
// // Html - Para mostrar contenido HTML en la escena 3D
// import { OrbitControls, useProgress, Html } from '@react-three/drei'
// //Importar modelos en formato OBJ
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// //Cargar modelos y texturas
// import { useLoader } from '@react-three/fiber'
// // Biblioteca hace todo el trabajo 3D
// import * as THREE from 'three'


// // Carga el modelo OBJ y muestra el progreso de carga
// function Loader() {
//   const { progress } = useProgress()
//   return <Html center>{progress} % loaded</Html>
// }


// // Carga el modelo OBJ y aplica materiales
// // El objeto debe quedar guardado en la carpeta public
// function Model() {
//   const obj = useLoader(OBJLoader, '/Vaso.obj')



//   // Verifica que el modelo se cargue correctamente
//   console.log("Model loaded:", obj)

//   // Asigna material y ajusta escala/posición
//   obj.traverse((child) => {
//     if (child.isMesh) {
//       child.material = new THREE.MeshStandardMaterial({
//         color: "#c0c0c0",
//         roughness: 0.7,
//         metalness: 0.3
//       })
//       child.castShadow = true
//       child.receiveShadow = true
//     }
//   })

//   return <primitive 
//     object={obj} 
//     scale={0.1}  //Ajustar el tamaño de tu modelo
//     position={[0, -1, 0]} 
//     rotation={[0, Math.PI / 4, 0]}
//   />
// }


// export default function App() {

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5], fov: 50 }}
//       >
        
//         <color attach="background" args={['#45C4B0']} />  {/* Color de fondo */}
//         <ambientLight intensity={0.5} />
//         <directionalLight
//           position={[10, 10, 5]}
//           intensity={1}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <Suspense fallback={<Loader />}>
//           <Model />
//           <OrbitControls 
//             enablePan={true}
//             enableZoom={true}
//             enableRotate={true}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   )
// }





// ________________________ CÓDIGO Obtenido Con DeepSeek y Mejorado Por Mi ________________________

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useProgress, Html, Stats } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

// Componente de carga
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

// Componente del modelo con múltiples modos de visualización
function Model({ mode, setModelInfo }) {
  const obj = useLoader(OBJLoader, '/Vaso.obj')
  
  useEffect(() => {
    // Calcular información del modelo cuando se carga
    let vertexCount = 0
    let faceCount = 0
    let edgeCount = 0

    obj.traverse((child) => {
      if (child.isMesh) {
        vertexCount += child.geometry.attributes.position.count
        faceCount += child.geometry.index ? child.geometry.index.count / 3 : 0
        // Estimación de aristas (3 por cada cara triangular)
        edgeCount += faceCount * 3 / 2 // Aproximación
      }
    })

    setModelInfo({
      vertices: vertexCount,
      faces: faceCount,
      edges: Math.round(edgeCount)
    })
  }, [obj, setModelInfo])

  return (
    <>
      {obj.children.map((child, index) => {
        if (!child.isMesh) return null
        
        const geometry = child.geometry
        
        // Modo normal (caras sólidas)
        if (mode === 'solid') {
          return (
            <mesh key={index} geometry={geometry}>
              <meshStandardMaterial 
                color="#c0c0c0"
                roughness={0.7}
                metalness={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          )
        }
        
        // Modo wireframe (solo aristas)
        if (mode === 'wireframe') {
          return (
            <lineSegments key={index} geometry={new THREE.WireframeGeometry(geometry)}>
              <lineBasicMaterial color="white" linewidth={1} />
            </lineSegments>
          )
        }
        
        // Modo vértices (puntos)
        if (mode === 'vertices') {
          return (
            <points key={index} geometry={geometry}>
              <pointsMaterial color="white" size={0.05} sizeAttenuation={true} />
            </points>
          )
        }
        
        // Modo edges (bordes destacados)
        if (mode === 'edges') {
          const edges = new THREE.EdgesGeometry(geometry, 15)
          return (
            <>
              <mesh geometry={geometry}>
                <meshStandardMaterial 
                  color="#c0c0c0"
                  roughness={0.7}
                  metalness={0.3}
                  transparent
                  opacity={0.3}
                />
              </mesh>
              <lineSegments geometry={edges}>
                <lineBasicMaterial color="yellow" linewidth={2} />
              </lineSegments>
            </>
          )
        }
        
        return null
      })}
    </>
  )
}

// Interfaz de usuario
function Controls({ mode, setMode, modelInfo }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 100
    }}>
      <h3>Controles del Modelo</h3>
      <div>
        <button onClick={() => setMode('solid')} style={{background: mode === 'solid' ? '#45C4B0' : ''}}>Sólido</button>
        <button onClick={() => setMode('wireframe')} style={{background: mode === 'wireframe' ? '#45C4B0' : ''}}>Wireframe</button>
        <button onClick={() => setMode('vertices')} style={{background: mode === 'vertices' ? '#45C4B0' : ''}}>Vértices</button>
        <button onClick={() => setMode('edges')} style={{background: mode === 'edges' ? '#45C4B0' : ''}}>Bordes</button>
      </div>
      
      {modelInfo && (
        <div style={{marginTop: '10px'}}>
          <h4>Información del Modelo:</h4>
          <p>Vértices: {modelInfo.vertices}</p>
          <p>Caras: {modelInfo.faces}</p>
          <p>Aristas: {modelInfo.edges}</p>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState('solid')
  const [modelInfo, setModelInfo] = useState(null)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Controls mode={mode} setMode={setMode} modelInfo={modelInfo} />
      
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <color attach="background" args={['#45C4B0']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Suspense fallback={<Loader />}>
          <Model mode={mode} setModelInfo={setModelInfo} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  )
}