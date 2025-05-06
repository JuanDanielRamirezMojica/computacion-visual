# Taller 9 - Escenas Paramétricas: Creación de Objetos desde Datos

📅 Fechas

- **2025-04-23** – Fecha de asignación 
- **2025-05-05**– Fecha de entrega


🎯 Objetivo del Taller

Generar objetos 3D de manera programada a partir de listas de coordenadas o datos estructurados. El propósito es entender cómo crear geometría en tiempo real y de forma flexible mediante código, utilizando bucles, estructuras condicionales y exportando o renderizando las escenas generadas.


🧠 Conceptos Aprendidos

-   Generación de objetos 3D desde listas
    
-   Bucles y condicionales para instanciación paramétrica
    
-   Exportación de escenas a JSON
    
-   Interacción mediante interfaz gráfica en Unity
    

🔧 Herramientas y Entornos

-   Unity (2022.3 LTS)
    
-   Visual Studio Code
    
-   C# y UnityEngine
    
-   Editor de interfaz (Canvas, Buttons)
    
-   Python (vedo, trimesh, open3d)
    
-  Three.js con React Three Fiber
    

📁 Estructura del Proyecto

```
2025-04-23_taller_escenas_parametricas/
├── python/
├── unity/
├── threejs/
├── resultados/
├── README.md
```

🧪 Implementación

# Python

🔹 Etapas realizadas

1.  Se definió una lista de coordenadas tridimensionales como base para ubicar los objetos.
    
2.  Se implementó un bucle para generar múltiples escenas (con `random` para variar color y tamaño).
    
3.  Se asignó un tipo de objeto distinto según el índice: `Sphere`, `Cube`, `Cylinder`, `Torus` o `Star`.
    
4.  Se renderizó la escena en modo offscreen usando `vedo.Plotter`, con ejes visibles y zoom.
    
5.  Se guardó cada escena como imagen `.png` y se mostró en el notebook.
    
6.  Se exportó uno de los objetos generados a formatos `.OBJ`, `.STL` y `.GLB` usando la librería `trimesh`

    

🔹 Código relevante 




```python

# Coordenadas base para ubicar objetos 3D en el espacio
points = [
    (0, 0, 0),
    (2, 2, 0),
    (4, 0, 1),
    (-2, -2, 0.5),
    (0, 4, -1),
    (1, -3, 2),
    (-4, 1, 1),
    (0, 0, 0)
]

# Número de escenas distintas a generar 
num_escenas = 3 #(0,1,2,3)

# Bucle para crear escenas con objetos variados en color, forma y tamaño
for escena_id in range(0, num_escenas + 1):
    objects = []
    for i, (x, y, z) in enumerate(points):
        size = 0.5 + random.random()
        color = np.random.rand(3)

        if i in [0, 3, 6]:
            obj = Sphere(pos=(x, y, z), r=size, c=color)
        elif i in [1, 4]:
            obj = Cube(pos=(x, y, z), side=size, c=color)
        elif i in [2, 5]:
            obj = Cylinder(pos=(x, y, z), r=size * 0.5, height=size * 2, c=color)
        elif i == 7:
            obj = Torus(pos=(x, y, z), r1=size, r2=size * 0.3, c=color)
        else:
            obj = Star(pos=(x, y, z), c=color)

        objects.append(obj)

    plotter = Plotter(offscreen=True)
    plotter.show(objects, axes=1, interactive=False, zoom=1.2)
    plotter.screenshot(f"escena_parametrica_{escena_id}.png")
    plotter.close()
    display(Image(f"escena_parametrica_{escena_id}.png"))
```


---
Además, se exportó el primer objeto en tres formatos 3D estándar: `.OBJ`, `.STL` y `.GLB`.


🔹 Exportación a formatos 3D

```python

import trimesh
import numpy as np

# Convertir un objeto Vedo (por ejemplo, el primero) a Trimesh
faces_data = objects[0].cells
faces_array = np.asarray(faces_data, dtype=np.int64)
mesh_trimesh = trimesh.Trimesh(vertices=objects[0].points, faces=faces_array)

# Exportar a diferentes formatos
with open("objeto_trimesh_pythonOBJ.obj", "w") as f:
    f.write(trimesh.exchange.obj.export_obj(mesh_trimesh))

with open("objeto_trimesh_pythonstl.stl", "wb") as f:
    f.write(trimesh.exchange.stl.export_stl(mesh_trimesh))

with open("objeto_trimesh_pythonGLB.glb", "wb") as f:
    f.write(trimesh.exchange.gltf.export_glb(mesh_trimesh))

```



# Threejs

WIP

# Unity
🔹 Etapas realizadas

1.  Generación de una clase serializable `ParametricObject` para almacenar tipo, posición, escala y color.
    
2.  Desarrollo de `SceneController` para generar objetos usando `GameObject.CreatePrimitive()`.
    
3.  Adición de botones con UI Canvas: Regenerar, Exportar, Randomizar.
    
4.  Exportación del arreglo de objetos a JSON en el directorio `Assets/`.
    

🔹 Código relevante (fragmento)

```c#
// Crear un objeto primitivo tipo cubo
GameObject primitive = GameObject.CreatePrimitive(PrimitiveType.Cube);

// Asignar la posición desde los datos
primitive.transform.position = obj.position;

// Escalar el objeto según los valores definidos
primitive.transform.localScale = obj.scale;

// Aplicar color al material del objeto
primitive.GetComponent<Renderer>().material.color = obj.color;
```

# 📊 Resultados Visuales

## Unity:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_escenas_parametricas/resultados/unitygif.gif?raw=true)



## Python

![Imagen  0](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_escenas_parametricas/resultados/escena_parametrica_0_python.png?raw=true)


![Imagen  1](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_escenas_parametricas/resultados/escena_parametrica_1_python.png?raw=true)


![Imagen  2](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_escenas_parametricas/resultados/escena_parametrica_2_python.png?raw=true)


![Imagen  3](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_escenas_parametricas/resultados/escena_parametrica_3_python.png?raw=true)


Objetos exportados:
https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-23_taller_escenas_parametricas/resultados


## Threejs



🧩 Prompts Usados

- _Refactoriza este código "...."_
-  "Mejora la redacción de estos parrafos: "..".


💬 Reflexión Final

Este taller me permitió comprender cómo programar la creación de objetos 3D a partir de estructuras de datos, lo que se asemeja al concepto de "escena parametrizada" usado en herramientas más avanzadas. Aprendí a manejar estructuras como arrays de objetos serializables y cómo integrarlas a una interfaz de usuario.

La parte más compleja fue conectar la UI con la lógica de generación, especialmente porque Unity no provee una interfaz inmediata de serialización a JSON. Fue necesario escribir una rutina de exportación manual.

En un futuro, mejoraría el sistema implementando la funcionalidad inversa: cargar desde JSON y regenerar la escena, y usaría ScriptableObjects para mantener persistencia en el editor.


## ✅ Checklist de Entrega

-   ✅ Generación correcta de objetos 3D a partir de datos.
-   ✅ Uso adecuado de bucles, condicionales y parametrización.
-   ✅ Exportación funcional en Python o generación dinámica en Unity.
-   ✅ Escena estructurada y visualmente clara.
-   ✅ Código documentado y limpio.
-   ✅ README con explicación, prompts y evidencias visuales (GIF).
-   ✅ Commits descriptivos en inglés.
