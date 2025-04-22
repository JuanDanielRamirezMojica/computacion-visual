

# Taller 1- Construyendo el Mundo 3D: Vértices, Aristas y Caras

## Objetivo del taller
Comprender las estructuras gráficas básicas que forman los modelos 3D (mallas poligonales) y visualizar su estructura en distintas plataformas. Se explorará la diferencia entre vértice, arista y cara, así como el contenido de formatos de archivo estándar de malla como `.OBJ`, `.STL` y `.GLTF`.

---

## 1. Three.js con React Three Fiber

### Descripción:
Se ha creado un proyecto con Vite y React Three Fiber, cargando un modelo 3D en formato `.OBJ`, `.STL` o `.GLTF`. El modelo es visualizado con OrbitControls, y se resalta la estructura (vértices, aristas o caras) utilizando efectos visuales como líneas (Edges, Wireframe) o puntos (Points).

**Resultado:**
- Modelo cargado correctamente en la escena.
- Efectos visuales aplicados para resaltar las estructuras geométricas del modelo.

**Tecnologías utilizadas:**
- React Three Fiber
- Three.js
- Vite

**Código relevante:**
```jsx
<Canvas camera={{ position: [20, 20, 20], fov: 80 }}>
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
</Canvas>
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
