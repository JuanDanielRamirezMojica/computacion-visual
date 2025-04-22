# Taller 1- Construyendo el Mundo 3D: Vértices, Aristas y Caras

## Objetivo del taller
Comprender las estructuras gráficas básicas que forman los modelos 3D (mallas poligonales) y visualizar su estructura en distintas plataformas. Se explorará la diferencia entre vértice, arista y cara, así como el contenido de formatos de archivo estándar de malla como `.OBJ`, `.STL` y `.GLTF`.

---

## 1. Three.js con React Three Fiber


### Descripción:

Se desarrolló una aplicación web utilizando **Vite**, **React Three Fiber** y **Three.js**, cuyo objetivo principal es visualizar un modelo 3D (`Vaso.obj`) e identificar sus componentes fundamentales: vértices, aristas y caras. La escena incluye una cámara interactiva mediante `OrbitControls` y una interfaz para cambiar entre los distintos modos de visualización: **sólido**, **wireframe**, **vértices** y **bordes (edges)**. También se muestra información estructural básica del modelo como el número de vértices, caras y una estimación del número de aristas.


El modelo se obtuvo de: [ Vaso Reutilizable Starbucks - TurboSquid ](https://www.turbosquid.com/es/3d-models/vaso-reutilizable-starbucks-model-1872080)


### Funcionalidades implementadas:

-   Carga de modelo `.OBJ` desde la carpeta `public`.
-   Visualización en diferentes modos:
    -   **Sólido** (render clásico con material).
    -   **Wireframe** (aristas únicamente).
    -   **Vértices** (puntos blancos).
    -   **Edges** (borde resaltado en amarillo + transparencia del modelo).
        
-   Interfaz flotante para cambiar entre modos.
-   Cálculo y despliegue de información básica del modelo (vértices, caras, aristas).
-   Indicador de carga del modelo (`% loaded`).
-   Luces (ambientales y direccionales) y fondo personalizado.
-   Estadísticas de renderizado (`<Stats />` de drei).
    

### Tecnologías utilizadas:

-   Vite
-   React
-   React Three Fiber
-   Drei
-   Three.js
    

### Resultado

![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_estructuras_3d/threejs/ModeloVasoGif1.gif?raw=true)


![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_estructuras_3d/threejs/ModeloVasoGif2.gif?raw=true)


Nota: Para facilitar la implementación de la visualización 3D, en el punto:
* Resaltar vértices, aristas o caras usando efectos visuales como líneas (Edges, Wireframe) o puntos (Points).
* Bonus: crear una pequeña interfaz para cambiar entre visualización de vértices/aristas/caras y mostrar información básica del modelo (número de vértices, etc.).

se utilizaron sugerencias de código generadas con la ayuda de DeepSeek, medeiante el siguiente prompt: "De acuerdo a este código (CÓDIGO) cómo implementarías una pequeña interfaz para cambiar entre visualización de vértices/aristas/caras y mostrar información básica del modelo." la respuesta se adaptó al código que ya se tenía.

### Código relevante:

```jsx
// ________________________ MÍ CÓDIGO ________________________

// React nos da Suspense para cargar componentes de forma elegante
import { Suspense, useState, useEffect } from 'react'
// El lienzo donde vivirá nuestro mundo 3D
import { Canvas } from '@react-three/fiber'
// OrbitControls - Para mover la cámara con el mouse
// useProgress - Para saber cuánto ha cargado el modelo
// Html - Para mostrar contenido HTML en la escena 3D
import { OrbitControls, useProgress, Html, Stats } from '@react-three/drei'
// Importar modelos en formato OBJ
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// Cargar modelos y texturas
import { useLoader } from '@react-three/fiber'
// Biblioteca hace todo el trabajo 3D
import * as THREE from 'three'

// Componente de carga
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

// Componente del modelo con múltiples modos de visualización
function Model({ mode, setModelInfo }) {
  const obj = useLoader(OBJLoader, '/Vaso.obj') // Ruta del modelo OBJ
  
  useEffect(() => {
    // Calcular información del modelo cuando se carga
    let vertexCount = 0
    let faceCount = 0
    let edgeCount = 0

    // Recorrer los hijos del objeto para contar vértices, caras y aristas
    obj.traverse((child) => {
      if (child.isMesh) {
        vertexCount += child.geometry.attributes.position.count
        faceCount += child.geometry.index ? child.geometry.index.count / 3 : 0
        // Estimación de aristas (3 por cada cara triangular)
        edgeCount += faceCount * 3 / 2 // Aproximación
      }
    })

    // Guardar información del modelo
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



```


## 2. Unity (versión LTS) (Opcional)

### Descripción:

En Unity se creó una escena 3D donde se importó un archivo `.OBJ` o `.STL` y se creó un script en C# para imprimir el número de vértices, triángulos y sub-mallas del modelo. También se implementó la visualización de aristas en modo wireframe.

**Resultado:**

-   Importación exitosa del modelo 3D.
-   Funcionalidad para visualizar el modelo en modo wireframe.
    

**Tecnologías utilizadas:**

-   Unity 3D
-   C#
    
**Código relevante:**
```

```

## 3. Python (Colab o Jupyter Notebook)

### Descripción:

En esta implementación, se utilizó `trimesh` y `vedo` para cargar un archivo `.GLB` y visualizar los vértices, aristas y caras de la malla 3D. Se muestra también la información estructural del modelo.


🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_estructuras_3d/python))**


**Resultado:**

-   Carga exitosa del archivo GLB.
-   Visualización de vértices, aristas y caras con diferentes colores.
-   Información estructural (número de vértices, aristas y caras).


![python.gif](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_estructuras_3d/python/1.%20taller_construyendo_mundo_3d_python.gif?raw=true)


**Tecnologías utilizadas:**

-   Python
-   trimesh
-   vedo
-   numpy
-   matplotlib
    

**Código relevante:**

```python
# Para analizar la figura que se cargue y visualizarla.
#!pip install trimesh vedo numpy matplotlib # Para mostrar vertices y aristas.
#!pip install vedo

import trimesh

# Cargar archivo GLB
scene = trimesh.load("low_poly_mobile_phone.glb")

# Verifica qué contiene la escena
print("Elementos en la escena:")
print(scene.geometry.keys())
print("______________________________________________________________________________________")
print("Número de elementos en la escena: ", len(scene.geometry.keys()))
print("______________________________________________________________________________________")

# Extrae el primer mesh de la escena
first_mesh = list(scene.geometry.values())[0]

# Información estructural
print("Número de vértices:", len(first_mesh.vertices))
print("______________________________________________________________________________________")
print("Número de caras (triángulos):", len(first_mesh.faces))
print("______________________________________________________________________________________")
print("Número de aristas:", len(first_mesh.edges))
print("______________________________________________________________________________________")

# Visualización interactiva
first_mesh.show()

# Extrae el segundo mesh de la escena
first_mesh = list(scene.geometry.values())[1]

# Información estructural
print("Número de vértices:", len(first_mesh.vertices))
print("______________________________________________________________________________________")
print("Número de caras (triángulos):", len(first_mesh.faces))
print("______________________________________________________________________________________")
print("Número de aristas:", len(first_mesh.edges))
print("______________________________________________________________________________________")

# Visualización interactiva
first_mesh.show()

# Visualizar malla 3D con colores distintos para vértices, aristas y caras
from vedo import Mesh, Points, Lines, show, settings

settings.use_depth_peeling = True  # para transparencia

# Cargar la escena
scene = trimesh.load("low_poly_mobile_phone.glb")
first_mesh = list(scene.geometry.values())[0]

# Extraer datos
vertices = first_mesh.vertices
caras = first_mesh.faces
aristas_idx = first_mesh.edges

# Convertir índices de aristas en coordenadas
aristas = [(vertices[i], vertices[j]) for i, j in aristas_idx]

# Crear visualización con vedo
malla = Mesh([vertices, caras]).c("lightblue").alpha(0.3)
puntos = Points(vertices, r=10, c="red")
lineas = Lines(aristas, c="green")

# Mostrar todo junto
show(malla, puntos, lineas, axes=1, title="Estructura 3D: Vértices, Aristas y Caras")
```
