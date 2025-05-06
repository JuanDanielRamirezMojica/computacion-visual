// Importando dependencias
import { useState, Suspense } from "react";
import "./App.css";

// Importando componentes de Three.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PhoneOBJ from "./PhoneOBJ.jsx";
import PhoneSTL from "./PhoneSTL.jsx";
import PhoneGLTF from "./PhoneGLTF.jsx";

// Componente principal de la aplicación
// Este componente renderiza un menú para seleccionar el modelo 3D a cargar
// y un canvas de Three.js para mostrar el modelo seleccionado
// El menú permite elegir entre tres formatos: OBJ, STL y GLTF
function App() {
  const [selectedModel, setSelectedModel] = useState("OBJ");

  const handleChange = (e) => {
    setSelectedModel(e.target.value);
  };

  // Colores dinámicos para el título según el modelo
  // Se utiliza un color diferente para cada formato de modelo
  // OBJ: azul, STL: verde, GLTF: rojo
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

      {/* Canvas de Three.js */}
      {/* Se utiliza el componente Canvas para renderizar la escena 3D */}
      {/* Se establece una luz ambiental y controles de órbita para la cámara */}
 
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