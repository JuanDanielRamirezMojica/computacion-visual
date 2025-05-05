# Taller 6 - Rasterización desde Cero: Dibujando con Algoritmos Clásicos

📅 Fecha  
**2025-04-23** – Fecha de asignación
**2025-05-02**– Fecha de entrega

----------

### 🎯 Objetivo del Taller

El objetivo de este taller fue comprender e implementar desde cero los algoritmos clásicos de rasterización para líneas, círculos y triángulos. A través de este proceso, se buscó construir una base sólida sobre cómo se generan primitivas gráficas píxel a píxel, sin el uso de funciones gráficas de alto nivel.

----------

### 🧠 Conceptos Aprendidos

-   Rasterización de primitivas gráficas básicas
    
-   Algoritmo de Bresenham para líneas
    
-   Algoritmo del punto medio para círculos
    
-   Relleno de triángulos por interpolación y barrido vertical (scanline)
    
-   Visualización de imágenes con Pillow y matplotlib
    

----------

### 🔧 Herramientas y Entornos

-   **Python**
    
    -   `Pillow`: para manipular imágenes y píxeles
        
    -   `matplotlib.pyplot`: para visualizar los resultados
        
-   **Jupyter Notebook / Google Colab**
    

----------

### 📁 Estructura del Proyecto
```
2025-04-23_taller_algoritmos_rasterizacion_basica/
├── python/
│   └── rasterizacion_algoritmos.ipynb
├── resultados/
│   ├── linea.png
│   ├── circulo.png
│   ├── triangulo.png
├── README.md
```

----------

### 🧪 Implementación

#### 🔹 Etapas realizadas

1.  Preparación del entorno gráfico: creación de imágenes y acceso a píxeles.
    
2.  Implementación de los tres algoritmos de rasterización:
    
    -   Línea con **Bresenham**
        
    -   Círculo con **algoritmo del punto medio**
        
    -   Triángulo con **rasterización por scanline**
        
3.  Visualización y guardado de los resultados en imágenes.
    
4.  Visualización conjunta en una imagen combinada.
    

#### 🔹 Código relevante
``` python

# Algoritmo de Bresenham para dibujar líneas
def bresenham(x0, y0, x1, y1):
    # Calcular diferencias absolutas
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    
    # Determinar la dirección de incremento en x y y
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    
    # Inicializar el error
    err = dx - dy

    while True:
        # Dibujar píxel en ambas imágenes (individual y combinada)
        pixels[x0, y0] = (255, 0, 0)        # rojo en imagen combinada
        pixels_line[x0, y0] = (255, 0, 0)   # rojo en imagen individual

        # Terminar si se llega al punto final
        if x0 == x1 and y0 == y1:
            break

        # Calcular doble del error para decidir si movernos en x, y o ambos
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x0 += sx
        if e2 < dx:
            err += dx
            y0 += sy



# Algoritmo de punto medio para dibujar círculos
def midpoint_circle(x0, y0, radius):
    x = radius
    y = 0
    p = 1 - radius  # condición inicial de la decisión

    while x >= y:
      
        # Dibujar puntos simétricos del círculo (8 octantes)
        for dx, dy in [(x, y), (y, x), (-x, y), (-y, x), (-x, -y), (-y, -x), (x, -y), (y, -x)]:
            # Validar que el punto esté dentro del lienzo
            if 0 <= x0 + dx < width and 0 <= y0 + dy < height:
                pixels[x0 + dx, y0 + dy] = (0, 0, 255)        # azul en imagen combinada
                pixels_circle[x0 + dx, y0 + dy] = (0, 0, 255) # azul en imagen individual

        y += 1
        # Actualizar parámetro de decisión
        if p <= 0:
            p = p + 2*y + 1
        else:
            x -= 1
            p = p + 2*y - 2*x + 1



# Algoritmo de rasterización de triángulo por scanline

def fill_triangle(p1, p2, p3):


    # Ordenar puntos por coordenada Y (de arriba a abajo)
    pts = sorted([p1, p2, p3], key=lambda p: p[1])
    (x1, y1), (x2, y2), (x3, y3) = pts

    # Función para interpolar valores X a lo largo de un segmento vertical
    def interpolate(y0, y1, x0, x1):
        if y1 - y0 == 0: return []  # evitar división por cero
        return [int(x0 + (x1 - x0) * (y - y0) / (y1 - y0)) for y in range(y0, y1)]

    # Interpolaciones para cada segmento del triángulo
    x12 = interpolate(y1, y2, x1, x2)
    x23 = interpolate(y2, y3, x2, x3)
    x13 = interpolate(y1, y3, x1, x3)

    # Concatenar para tener los extremos del lado izquierdo
    x_left = x12 + x23

    # Rellenar línea por línea (scanline)
    for y, xl, xr in zip(range(y1, y3), x13, x_left):
        for x in range(min(xl, xr), max(xl, xr)):
            if 0 <= x < width and 0 <= y < height:
                pixels[x, y] = (0, 255, 0)         # verde en imagen combinada
                pixels_triangle[x, y] = (0, 255, 0) # verde en imagen individual
```

----------

### 📊 Resultados Visuales

📌 Las siguientes imágenes muestran la ejecución de cada algoritmo:

-   Línea con Bresenham

    ![Imagen Lineas con Bresenham](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_algoritmos_rasterizacion_basica/resultados/linea.png?raw=true)

    
-   Círculo con algoritmo de punto medio  
    
![Imagen  Círculo con algoritmo de punto medio  ](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_algoritmos_rasterizacion_basica/resultados/circulo.png?raw=true)


-   Triángulo relleno por scanline  

![Imagen  Triángulo relleno por scanline  ](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_algoritmos_rasterizacion_basica/resultados/triangulo.png?raw=true)

   
   
-   Imagen combinada con todas las figuras

   ![Imagen  Imagen combinada con todas las figuras](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_algoritmos_rasterizacion_basica/resultados/todojunto.png?raw=true)


----------

### 🧩 Prompts Usados

Para el readme se utilizó:

_Mejora la redacción de estos parrafos(...)._

----------

### 💬 Reflexión Final

Este taller me permitió entender cómo funcionan internamente los sistemas gráficos cuando dibujan formas básicas. Implementar cada algoritmo desde cero fue una oportunidad para apreciar la optimización detrás de operaciones tan simples como dibujar una línea o un círculo.

La parte más interesante fue notar cómo el algoritmo de Bresenham, a pesar de no usar operaciones de punto flotante, logra resultados precisos. En un fututo, me gustaría aplicar estos conocimientos para construir un renderizador 2D más complejo que soporte múltiples primitivas y capas de dibujo.

----------

### ✅ Checklist de Entrega

-   ✅ Carpeta `2025-04-23_taller_algoritmos_rasterizacion_basica`
    
-   ✅ Código limpio y funcional
    
-   ✅ Visualizaciones exportadas (`.png`)
    
-   ⬜ GIF opcional (no requerido ya que son imágenes)
    
-   ✅ README completo y claro
    
-   ✅ Commits descriptivos en inglés
