# Taller 8 - Importando el Mundo: Visualización y Conversión de Formatos 3D


📅 Fechas

- **2025-04-23** – Fecha de asignación 

- **2025-05-05**– Fecha de entrega

🎯 Objetivo del Taller:

Comparar y convertir entre distintos formatos de modelos 3D: .OBJ, .STL y .GLTF, y visualizar sus diferencias en geometría y materiales. El objetivo es entender la estructura interna de los archivos 3D, su compatibilidad entre entornos, y cómo se interpretan en distintas plataformas de visualización.


🧠 Conceptos Aprendidos

- Estructura interna de formatos 3D: .OBJ, .STL, .GLTF, .PLY

- Carga y análisis de modelos 3D en Python con trimesh

- Visualización interactiva de mallas 3D con plotly en Jupyter Notebooks

- Conversión de formatos 3D preservando geometría y normales

- Uso de React Three Fiber para visualizar modelos 3D en la web

- Integración de loaders específicos de three.js para diferentes formatos

- Manejo asincrónico de recursos con Suspense en React


    

_____________________________________________________

🔧 Herramientas y Entornos

-   Python (Google Colab)
    
	-   Librerías: `trimesh`, `open3d`, `numpy`, `pandas`, `plotly`
    
-   Three.js con React Three Fiber.
	- three.js (loaders: OBJLoader, STLLoader, GLTFLoader)
    

📁 Estructura del Proyecto

```
2025-04-23_taller_conversion_formatos_3d/
├── python/
├── threejs/
├── resultados/
├── README.md
```


### 🧪 Implementación


#### Python
🔹 Etapas realizadas:

1.  Carga de modelos 3D en distintos formatos con `trimesh`.
    
2.  Análisis de propiedades: cantidad de vértices, caras, existencia de normales, vértices duplicados.
    
3.  Visualización interactiva de cada modelo usando `plotly.Mesh3D`.
    
4.  Conversión de un modelo `.OBJ` a otros formatos (`.STL`, `.GLB`, `.PLY`).
    
5.  Resumen comparativo tabular usando `pandas.DataFrame`.
    

🔹 Fragmento de código relevante:

```python
#Visualizar objetos e infromación:
# Nombres de archivo
model_files = {
    "OBJ": "PhoneOBJ.obj",
    "STL": "PhoneSTL.stl",
    "GLTF": "PhoneGLTF.gltf"
}
results = {}

for name, path in model_files.items():
    print("____________________________________")
    print(f"\n Modelo: {name}")
    mesh = load_model_trimesh(path)
    results[name] = analyze_mesh(mesh)
    plot_trimesh_plotly(mesh)  #Visualización inline con Plotly






# Conversión de formato OBJ a otros
mesh = load_model_trimesh("PhoneOBJ.obj")
mesh.export("converted_from_obj.stl")
mesh.export("converted_from_obj.glb")
mesh.export("converted_from_obj.ply")
```


#### Threejs

- Visualizador 3D interactivo desarrollado con React y @react-three/fiber

- Menú desplegable para elegir el modelo según el formato

- Carga de modelos con los loaders correspondientes (OBJLoader, STLLoader, useGLTF)

- Renderizado en tiempo real con Canvas, ambientLight y OrbitControls

🔹 Fragmento de código relevante:

```jsx
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
```



# Resultados:

## Python:


Mostrar Objetos en pantalla (Fotos):

![Imagen  0](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/newplot_1.png?raw=true)


![Imagen  1](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/newplot.png?raw=true)


Mostrar Objetos en pantalla (GIF):


![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/pythonVerObjetosgif.gif?raw=true)


Comapración entre modelos:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/pythonComparaciongif.gif?raw=true)



### Objetos trasnformados:

- Der .OBJ a .GLB:
https://github.com/JuanDanielRamirezMojica/computacion-visual/raw/refs/heads/main/2025-04-23_taller_conversion_formatos_3d/resultados/converted_from_obj.glb



- Der .OBJ a .STL:
https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/converted_from_obj.stl



### Comparación:
| Formato | Vértices | Caras | Normales | Duplicados |
| ------- | -------- | ----- | -------- | ---------- |
| OBJ     | 1132     | 1920  | Sí       | No         |
| STL     | 1132     | 1920  | Sí       | No         |
| GLTF    | 1778     | 1920  | Sí       | Sí         |


## Threejs

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_conversion_formatos_3d/resultados/threejsgif.gif?raw=true)




### 🧩 Prompts Usados

- _Refactoriza este código "...."_
-  "Mejora la redacción de estos parrafos: "..".


### 💬 Reflexión Final


Este taller permitió profundizar en la comprensión de formatos de archivo 3D y su estructura interna. Fue especialmente revelador observar que muchos modelos comparten geometría idéntica a pesar de utilizar distintos contenedores de formato. La visualización interactiva facilitó la inspección de los modelos de forma intuitiva.

La parte más desafiante fue asegurar que las exportaciones conservaran las propiedades estructurales del modelo original, especialmente al trabajar con .GLTF/.GLB, donde también intervienen materiales y texturas que no siempre se migran correctamente.

Por otro lado, implementar la visualización en React Three Fiber permitió trasladar los análisis a un entorno web mucho más accesible e interactivo. Aprender a trabajar con loaders especializados y entender cómo se representan las mallas a nivel de bajo nivel en el navegador fue una experiencia enriquecedora. La posibilidad de comparar los modelos en tiempo real desde una interfaz web ofrece un complemento ideal a los análisis técnicos realizados en Python.


## ✅ Checklist de Entrega

-   ✅ Carpeta `2025-04-23_taller_conversion_formatos_3d/`
-   ✅ Código limpio y funcional
-   ✅  GIFs incluidos con nombres descriptivos
-   ✅ README completo y claro
-   ✅ Commits descriptivos en inglés
