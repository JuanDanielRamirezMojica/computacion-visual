# Taller 3 - Ojos Digitales: Introducción a la Visión Artificial



📅 Fechas

- **2025-04-21** – Fecha de asignación 

- **2025-05-05**– Fecha de entrega


## Objetivo del taller

Entender los fundamentos de la percepción visual artificial mediante imágenes en escala de grises, filtros y detección básica de bordes. Se trabajará con OpenCV para explorar cómo los computadores interpretan imágenes visuales básicas.

## Implementación

🔗 **[Ver implementación en el repositorio]([](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_ojos_digitales))**


Video interfaz: 
https://youtu.be/_7O1launfYE



----------

## 1. Carga y visualización inicial de la imagen

### Descripción:

Se utilizó `Google Colab` para cargar una imagen desde el sistema de archivos local, visualizarla y prepararla para posteriores transformaciones.

-   Conversión de la imagen de BGR a RGB para correcta visualización.
    
-   Conversión a escala de grises para análisis de intensidad.
    

### Resultado:

**Imagen original:**

![Imagen original](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_ojos_digitales/python/Images/original_image.jpeg?raw=true)



Obtenida de: [Revenge-of-the-sith-20th-anniversary-theatrical-release](https://swtorstrategies.com/wp-content/uploads/2025/02/revenge-of-the-sith-20th-anniversary-theatrical-release_f5fb864b.jpeg)


**Imagen en escala de grises:**

![Imagen gris](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_ojos_digitales/python/Images/gray_image.jpg?raw=true)


----------

## 2. Filtros Básicos: Desenfoque, Afilado y Bordes

### Descripción:

Se aplicaron diversos filtros para modificar la apariencia de la imagen:

-   **Desenfoque Gaussiano:** Suaviza detalles utilizando un kernel configurable.
    
-   **Afilado:** Resalta detalles utilizando un filtro personalizado.
    
-   **Detección de bordes Sobel:** Detecta gradientes horizontales y verticales.
    
-   **Detección de bordes Laplaciano:** Detecta bordes basados en segundos derivados.
    

### Resultados:

**Imagen desenfocada:**

![Imagen desenfocada](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_ojos_digitales/python/Images/blurred_image.jpg?raw=true)


**Imagen con filtro de afilado:**

![Imagen afilada](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/afilada_image.jpg)


**Bordes detectados con filtro Sobel:**

![Imagen sobel](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/bordes_sobel_image.jpg)

**Bordes detectados con filtro Laplaciano:**

![Imagen Lapaciana](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_ojos_digitales/python/Images/bordes_laplace_image.jpg?raw=true)
----------
## Comparación
![Imagen Comparación](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_ojos_digitales/python/Images/comparacion.png?raw=true)


## 3. Bonus: Selector de Filtros y Sliders Dinámicos

### Descripción:

Se creó una interfaz interactiva usando `ipywidgets` que permite:

-   Seleccionar el tipo de filtro a aplicar.
    
-   Modificar dinámicamente el tamaño del **kernel** de los filtros en tiempo real.
    
-   Visualizar automáticamente los cambios en la imagen al mover el slider.
    

### Interfaz:

-   **Dropdown:** Para seleccionar entre filtros (Original, Grises, Desenfocada, Afilada, Bordes Sobel, Bordes Laplaciano).
    
-   **Slider:** Para modificar tamaño del kernel en filtros que lo permiten (Desenfoque, Sobel, Laplaciano).
    

### Ejemplo de la interfaz:

![Imagen amarilla](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/Interfaz0.png)




----------

## 4. Bonus: Cambio de Color de Imagen mediante Hue

### Descripción:

Se realizó un cambio de color manipulando el canal **Hue** de la imagen en el espacio de color **HSV**. Esto permitió transformar la imagen original a diferentes tonalidades.

Tonalidades aplicadas:

-   **0:** Rojo
    
-   **30:** Amarillo
    
-   **60:** Verde
    
-   **90:** Cian
    
-   **120:** Azul
    
-   **150:** Rosado / Magenta
    

### Resultados:


**Imagen con tono amarillo (Hue = 30):**

![Imagen amarilla](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/yellow_image.jpg)


**Imagen con tono verde (Hue = 60):**

![Imagen verde](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/green_image.jpg)


**Imagen con tono cian (Hue = 90):**

![Imagen cian](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/blue_image.jpg)

**Imagen con tono rosado (Hue = 150):**

![Imagen cian](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_ojos_digitales/python/Images/pink_image.jpg)

----------

## Tecnologías utilizadas

-   Google Colab
    
-   Python 3
    
-   OpenCV
    
-   Matplotlib
    
-   ipywidgets
    

----------

## Notas:

-   El tamaño de kernel en filtros como **Gaussiano**, **Sobel** y **Laplaciano** debe ser un número impar.
    
-   Dado que cv2.createTrackbar no funciona directamente en Colab, porque depende de ventanas OpenCV (cv2.imshow) que requieren GUI, se deben usar widgets de ipywidgets para realizar este punto.
