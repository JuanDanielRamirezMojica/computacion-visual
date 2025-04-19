
# Taller 1 – Computación Visual  
**Transformaciones Geométricas en Diferentes Entornos**

## Introducción

En este taller  se explora el uso de transformaciones  —**traslación**, **rotación** y **escalado**— en distintos entornos de programación y visualización gráfica.  
El objetivo principal es **animar objetos geométricos** aplicando dichas transformaciones en ciclos temporales, comprendiendo cómo se representan y combinan a través de matrices.  

Se implementaron estas transformaciones en tres entornos diferentes:

1. Python (con `matplotlib`, `numpy` y `imageio`)
2. Unity (pendiente)
3. Three.js usando React Three Fiber
4. Processing.

A continuación, se describen las implementaciones realizadas en cada entorno.

---

## 1. Python (matplotlib, numpy, imageio)

![python.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-15_taller1_transformaciones/python/_Taller1_TransformacionesB%C3%A1sicas_juaramirezmo.gif?raw=true)

🔗 **[Ver implementación](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-15_taller1_transformaciones/python)**

En esta implementación, se genera una animación 2D de un **hexágono regular** que se transforma en el tiempo mediante matrices de transformación homogénea. A continuación se describe el proceso:

- Se define el hexágono como una matriz `2x6` con coordenadas de vértices en el plano XY.
- Las transformaciones aplicadas incluyen:
  - **Traslación** circular (órbita) alrededor de un centro.
  - **Rotación** constante sobre el centro de masa.
  - **Escalado** dinámico, que varía con una función seno para simular una especie de “palpitación”.

- La animación se divide en dos fases:
  - **Fase 1** (t < 4): Movimiento circular + rotación + escalado oscilante (palpitante)
  - **Fase 2** (t >= 4): Mantiene posición final de fase 1, pero con mayor velocidad y escala creciente
- Se generaron 45 frames con transformaciones temporales.
- Cada frame muestra la figura transformada y su respectiva matriz.
- Finalmente se crea un GIF animado.


La animación se genera cuadro a cuadro y se almacena como un arreglo de imágenes, que luego se compilan en un GIF usando `imageio`.  
Cada cuadro de la animación incluye una visualización de la figura transformada y su **matriz de transformación** correspondiente.  
El resultado es una animación clara del efecto compuesto de las transformaciones, ilustrando cómo se combinan y afectan a la figura.

---

## 2. Unity (Transformaciones en 3D)

![unity.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-15_taller1_transformaciones/unity/Taller1_TransformacionesUnity.gif)

[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-15_taller1_transformaciones/unity)

En Unity, se creó un proyecto en 3D donde un objeto (cubo) es animado mediante transformaciones geométricas en tiempo real a través de un script en C#. Las transformaciones se aplican directamente sobre el componente `Transform`.

El comportamiento del objeto incluye:

- Rotación constante: el cubo rota de forma continua en los ejes X, Y y Z con una velocidad fija.
- Escalado oscilante: su escala varía en los tres ejes al ritmo de una función `sin`, simulando un efecto de “latido”.
- Traslación aleatoria: cada ciertos segundos, el objeto se mueve aleatoriamente a lo largo del eje X o Y, en direcciones variables.

Estas transformaciones se ejecutan en el método `Update()`, lo que permite que se actualicen cada frame en función del tiempo (`Time.deltaTime` y `Time.time`).

### Código relevante: `DynamicTransform.cs`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DynamicTransform : MonoBehaviour
{
    private float timeSinceLastMove = 0f;
    public float timeBetweenMoves = 2f;
    public float movementDistance = 3.5f;

    void Update()
    {
        // 1. Rotación constante
        transform.Rotate(new Vector3(30, 45, 60) * Time.deltaTime);

        // 2. Escalado oscilante
        float scale = 1 + 0.3f * Mathf.Sin(Time.time * 2f);
        transform.localScale = new Vector3(scale, scale, scale);

        // 3. Traslación aleatoria en X o Y
        timeSinceLastMove += Time.deltaTime;
        if (timeSinceLastMove >= timeBetweenMoves)
        {
            timeSinceLastMove = 0f;
            int axisToMove = Random.Range(0, 2);
            float randomDirection = Random.Range(-1f, 1f);
            Vector3 movement = axisToMove == 0 ?
                new Vector3(randomDirection * movementDistance, 0f, 0f) :
                new Vector3(0f, randomDirection * movementDistance, 0f);

            transform.Translate(movement, Space.World);
        }
    }
}
```

Nota: No fue posible subir el proyecto completo de Unity al repositorio debido a un error al hacer git commit, relacionado con nombres de archivo demasiado largos (Filename too long) y advertencias sobre el cambio de fin de línea (LF will be replaced by CRLF). Este error se produjo especialmente en archivos generados automáticamente por Unity en la carpeta Library. Por esta razón, solo se incluyó el script principal y una captura en formato GIF del funcionamiento del proyecto.

---

## 3. Three.js + React Three Fiber

![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-15_taller1_transformaciones/threejs/Taller_1_threejs.gif?raw=true)

🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-15_taller1_transformaciones/threejs)**

En este entorno, se diseñó una escena 3D interactiva utilizando la biblioteca React Three Fiber, una abstracción de Three.js para React.  
La escena contiene dos objetos principales:

### 🟦 Hexágono 3D (Hexagon.jsx)
- Construido usando `CylinderGeometry` con 6 lados para formar un **prisma hexagonal**.
- Su movimiento describe una **órbita circular** en el plano XZ, con una oscilación vertical en el eje Y.
- Rota constantemente en los ejes Y y Z.
- Su escala varía con el tiempo, simulando un crecimiento oscilante tridimensional.
- El color también cambia dinámicamente usando `THREE.Color().setHSL(...)`.

### 🔵 Esfera dinámica (ColoredSphere.jsx)
- Flota y rota al igual que el hexágono, siguiendo una trayectoria similar.
- Cambia de color aleatoriamente con el paso del tiempo entre una paleta predefinida.

La cámara está posicionada en perspectiva, apuntando al centro de la escena desde `[20, 20, 20]`, y se incluye un control de órbita (`OrbitControls`), permitiendo interactuar a las personas con la escena.

---

## 4. Processing (2D / 3D)

![processing.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-15_taller1_transformaciones/processing/Taller_1_processing_hexagono.gif?raw=true)

🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-15_taller1_transformaciones/processing))**

En esta implementación se utiliza **Processing** en modo 3D (`P3D`) para animar un **hexágono 3D** que rota, se traslada de forma ondulante y varía su escala de manera cíclica, todo en función del tiempo transcurrido.



- Se crea un **sketch en 3D** con `size(..., P3D)`.
- Se dibuja una figura geométrica (hexágono), calculando sus vértices manualmente sobre el plano XY.
- Las transformaciones aplicadas incluyen:
  - `translate()` para mover la figura de manera **ondulada** en los ejes X e Y.
  - `rotateX()` y `rotateY()` para hacerla **rotar suavemente** en 3D.
  - `scale()` para aplicar un **escalado oscilante** usando `sin(t)`.
- Se encapsulan las transformaciones usando `pushMatrix()` y `popMatrix()` cuando se requiera aislar transformaciones (opcional en este ejemplo).
- Se usa la librería `GifAnimation` para exportar la animación en formato GIF.

El color de la figura también cambia dinámicamente usando `sin(t)` y `cos(t)`.

