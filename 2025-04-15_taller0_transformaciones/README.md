
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


### Código relevante (Python)

A continuación, se muestra un fragmento central del código utilizado para animar el hexágono 2D:

```python
def get_transformation_matrix(t):

    if t < 4:
        # Fase 1: Movimiento circular, rotación suave, escalamiento
        scale = 1 + 0.5 * np.sin(t)   # La figura se expande y contrae, como si palpitara.
        angle = t                     # El ángulo depende del tiempo. Va creciendo.

        # Esto mueve el centro de la figura en un círculo de radio 2, a la mitad de velocidad (t/2):
        tx = 2 * np.cos(t / 2)
        ty = 2 * np.sin(t / 2)

    else:
        # Fase 2: Va más rápido, pero mantiene la posición final de Fase 1
        scale = 1 + 0.2 * (t - 4)     # -4 para que la escala siga continua desde Fase 1
        angle = 2 * (t - 4) + 4       # +4 para que la rotación siga continua desde Fase 1
        tx, ty = fase2_offset         # Mantener la posición final de Fase 1

    # Matriz de Escala (S)
    S = np.array([
        [scale, 0, 0],
        [0, scale, 0],
        [0, 0, 1]
    ])

    # Matriz de Rotación (R)
    R = np.array([
        [np.cos(angle), -np.sin(angle), 0],  # Calcula la nueva coordenada X del punto rotado
        [np.sin(angle),  np.cos(angle), 0],  # Calcula la nueva coordenada Y del punto rotado
        [0, 0, 1]
    ])

    # Matriz de Traslación (T)
    T = np.array([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ])

    return T @ R @ S  # Orden: primero escalar, luego rotar, luego trasladar
```

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


### Código relevante (Three.js con React Three Fiber)

A continuación, se muestran fragmentos del código que controlan las transformaciones geométricas del hexágono y la esfera animada. Se utilizaron combinaciones de **traslación**, **rotación**, **escalado** y **cambio de color** dinámico.

#### `App.jsx`
```jsx
<Canvas camera={{ position: [20, 20, 20], fov: 80 }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <Hexagon />
  <ColoredSphere />
  <OrbitControls />
</Canvas>
```

#### `Hexagon.jsx`

```jsx
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  const mesh = meshRef.current

  // Movimiento circular en X y Z
  const radius = 3
  mesh.position.x = Math.sin(t * 0.8) * radius
  mesh.position.z = Math.cos(t * 0.8) * radius

  // Movimiento vertical (Y)
  mesh.position.y = Math.sin(t * 2) * 1.5

  // Rotación
  mesh.rotation.y = t
  mesh.rotation.z = t * 0.5

  // Escalado dinámico en cada eje
  const scaleX = 1.5 + 0.5 * Math.sin(t * 3)
  const scaleY = 1.5 + 0.3 * Math.sin(t * 1.5)
  const scaleZ = 1.5 + 0.2 * Math.sin(t * 2)
  mesh.scale.set(scaleX, scaleY, scaleZ)

  // Cambio de color dinámico usando HSL
  const hue = (t * 40) % 360
  mesh.material.color.setHSL(hue / 360, 1, 0.5)
})

// Geometría del hexágono como un cilindro de 6 lados
const geometry = new THREE.CylinderGeometry(2, 2, 2, 6)
```


#### `ColoredSphere.jsx`
```jsx
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  const mesh = meshRef.current

  // Movimiento circular en XZ
  const radius = 20
  mesh.position.x = Math.sin(t * 2.5) * radius
  mesh.position.z = Math.cos(t * 2.5) * radius

  // Movimiento vertical en Y (de abajo hacia arriba)
  mesh.position.y = Math.sin(t * 2) * 5

  // Rotación
  mesh.rotation.y = t * 0.5
  mesh.rotation.z = t * 0.3

  // Cambio de color periódico cada segundo
  if (t - lastColorChangeTime > colorChangeInterval) {
    lastColorChangeTime = t
    colorIndex = (colorIndex + 1) % colors.length
    mesh.material.color.set(colors[colorIndex])
  }
})

```
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


### Código relevante 
Este sketch en **Processing** genera una animación 3D de un hexágono con transformaciones geométricas: **rotación**, **traslación**, **escalado** y **cambio de color** dinámico. Además, exporta automáticamente un GIF de la animación usando la librería `gifAnimation`.

```java
import gifAnimation.*; // Librería para exportar GIF

GifMaker gifExport;
int frameLimit = 480; // Total de frames (~6 segundos a 60fps)

float[][] vertices = new float[6][3];

void setup() {
  size(600, 600, P3D); // Canvas en 3D
  frameRate(60);
  
  // Inicializar exportación de GIF
  gifExport = new GifMaker(this, "Taller_1_processing_hexagono.gif");
  gifExport.setRepeat(0);      // 0 = loop infinito
  gifExport.setQuality(10);    // Calidad (1–255)
  gifExport.setDelay(16);      // Delay entre frames en ms (~60fps)
  
  // Coordenadas de los vértices del hexágono en el plano XY
  for (int i = 0; i < 6; i++) {
    float angle = TWO_PI / 6 * i;
    vertices[i][0] = cos(angle) * 100;  // X
    vertices[i][1] = sin(angle) * 100;  // Y
    vertices[i][2] = 0;                 // Z
  }
}

void draw() {
  background(#4a4e69); // Color de fondo
  float t = millis() / 1000.0; // Tiempo en segundos
  
  // Transformaciones dinámicas
  float escala = 1 + 0.3 * sin(t);         // Escalado oscilante
  float angulo = t;                        // Rotación progresiva
  float offsetX = 150 * sin(t / 2);        // Movimiento en X
  float offsetY = 100 * cos(t / 3);        // Movimiento en Y

  // Color dinámico (RGB)
  float r = 150 + 100 * sin(t);
  float g = 80;
  float b = 200 + 50 * cos(t);
  fill(r, g, b);
  
  // Aplicar transformaciones
  translate(width / 2 + offsetX, height / 2 + offsetY); // Traslación
  rotateX(angulo);   // Rotación en eje X
  rotateY(angulo);   // Rotación en eje Y
  scale(escala);     // Escalado

  // Dibujar el hexágono
  beginShape();
  for (int i = 0; i < 6; i++) {
    vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
  }
  endShape(CLOSE);
  
  // Añadir frame al GIF
  gifExport.addFrame();

  // Finalizar exportación tras alcanzar el límite
  if (frameCount == frameLimit) {
    gifExport.finish();
    println("GIF guardado");
    noLoop();
  }
}
```
