// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.jsx
// import { useState, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, useSTL, useLoader } from "@react-three/drei";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import * as THREE from "three";
// import "./App.css";

// function ModelSelector({ format }) {
//   const obj = useLoader(OBJLoader, "/PhoneOBJ.obj");
//   const { scene: gltf } = useGLTF("/PhoneGLTF.gltf");
//   const stl = useSTL("/PhoneSTL.stl");

//   if (format === "obj") return <primitive object={obj} />;
//   if (format === "gltf") return <primitive object={gltf} />;
//   if (format === "stl")
//     return (
//       <mesh geometry={stl}>
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     );

//   return null;
// }

// function App() {
//   const [format, setFormat] = useState("obj");

//   return (
//     <>
//       <div className="controls">
//         <select onChange={(e) => setFormat(e.target.value)} value={format}>
//           <option value="obj">OBJ</option>
//           <option value="stl">STL</option>
//           <option value="gltf">GLTF</option>
//         </select>
//       </div>
//       <Canvas camera={{ position: [0, 0, 5] }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} />
//         <Suspense fallback={null}>
//           <ModelSelector format={format} />
//         </Suspense>
//         <OrbitControls />
//       </Canvas>
//     </>
//   );
// }

// export default App;


import { useState, Suspense } from "react";
import "./App.css";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PhoneOBJ from "./PhoneOBJ.jsx";
import PhoneSTL from "./PhoneSTL.jsx";
import PhoneGLTF from "./PhoneGLTF.jsx";

function App() {
  const [selectedModel, setSelectedModel] = useState("OBJ");

  const handleChange = (e) => {
    setSelectedModel(e.target.value);
  };

  // Colores dinámicos para el título según el modelo
  const titleColor =
    selectedModel === "OBJ"
      ? "#1976d2"
      : selectedModel === "STL"
      ? "#2e7d32"
      : "#d32f2f";

  return (
    <>
      {/* Menú y título */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <h1 style={{ color: titleColor }}>
          Modelo cargado en formato: {selectedModel}
        </h1>
        <select value={selectedModel} onChange={handleChange}>
          <option value="OBJ">Phone OBJ</option>
          <option value="STL">Phone STL</option>
          <option value="GLTF">Phone GLTF</option>
        </select>
      </div>

      <Canvas
        camera={{ position: [10, 0, 0], fov: 50 }}
        style={{ background: "lightblue", width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={1.8} />
        <OrbitControls />
        <Suspense fallback={null}>
          {selectedModel === "OBJ" && (
            <PhoneOBJ scale={1} position={[0, 0, 0]} />
          )}
          {selectedModel === "STL" && (
            <PhoneSTL scale={1} position={[0, 0, 0]} />
          )}
          {selectedModel === "GLTF" && (
            <PhoneGLTF scale={1} position={[0, 0, 0]} />
          )}
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;