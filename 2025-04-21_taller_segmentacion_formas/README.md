# Taller 4 - Segmentando el Mundo: Binarización y Reconocimiento de Formas

## Objetivo del taller

Aplicar técnicas básicas de segmentación en imágenes mediante umbralización y detección de formas simples. El objetivo es comprender cómo identificar regiones de interés en imágenes mediante procesos de binarización y análisis morfológico.

## Implementación

🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_segmentacion_formas)**

Video interfaz: 
[Video de la interfaz en acción](https://youtu.be/N1qbyfOUMs4)

----------

## 1. Carga y visualización inicial de la imagen

### Descripción:

Se cargó una imagen desde el computador, la cual se convirtió a **escala de grises** para realizar análisis y transformaciones.

- **Escala de grises:** Se convierte la imagen original a escala de grises para simplificar el procesamiento.
  
### Resultado:

**Imagen original:**

![Imagen Original](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/img_original_re.jpg?raw=true)

**Imagen en escala de grises:**

![Imagen Gris](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/original.jpg?raw=true)

----------

## 2. Segmentación Umbral

### Descripción:

Para segmentar la imagen, se aplicaron dos tipos de umbralización:

1. **Umbral fijo:** Utilizando un valor de umbral de 127.5. (la mitad de 255)
2. **Umbral adaptativo:** Usando el método de media local para segmentar la imagen.

### Resultados:

**Imagen con Umbral Fijo (127.5):**

![Imagen Umbral Fijo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralFijo.jpg?raw=true)

**Imagen con Umbral Adaptativo:**

![Imagen Umbral Adaptativo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralAdaptativo.jpg?raw=true)

----------

## 3. Detección de Contornos y Análisis

### Descripción:

Con la imagen binarizada, se detectaron los contornos utilizando `cv2.findContours`. Luego, se calcularon y dibujaron los **centros de masa** y las **bounding boxes** de las formas detectadas.

- **Contornos:** Los contornos de las formas fueron extraídos y dibujados en la imagen.
- **Centros de masa:** Se calculó el centro de masa de cada contorno usando momentos de la imagen (`cv2.moments`).
- **Bounding boxes:** Se calculó el rectángulo delimitador de cada contorno con `cv2.boundingRect`.

### Resultados:

**Imagen con Contornos:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/contornos.jpg?raw=true)


**Imagen con Centros de Masa:**

![Imagen con Centros de Masa](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/centros_masa.jpg?raw=true)

**Imagen con Bounding Boxes:**

![Imagen con Bounding Boxes](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/bounding_boxes.jpg?raw=true)

**Imagen con todo junto (Contornos, Centros y Boxes):**

![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/todo_junto.jpg?raw=true)


**Comparación:**

![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/Comparacion.png?raw=true)

----------

## 4. Métricas: Área y Perímetro Promedio

### Descripción:

Se calcularon métricas para cada forma detectada: **área** y **perímetro**. Estas métricas se utilizaron para calcular el promedio de todas las formas detectadas.

### Resultados:

- **Número de formas detectadas:** 82
- **Área promedio:** 2098.43
- **Perímetro promedio:** 327.58
----------

## Tecnologías utilizadas

- **Python 3**
- **OpenCV**
- **Matplotlib**
- **Google Colab**

  
----------

## Comentarios personales

Estos conceptos me parecen importantes de recordar y explicar, ya que pueden llegar a ser confusos para alguien que no los haya utilizado:

- Segmentación binaria: Divide una imagen en dos partes: una que representa las regiones de interés (con un valor de píxel máximo) y otra que representa el fondo (con valor mínimo). Se suele usar el umbral fijo y el umbral adaptativo. 
	- El umbral fijo toma un valor constante para todos los píxeles.
	- El umbral adaptativo ajusta el umbral según las características locales de la imagen (como la iluminación).

- Contornos: Son las líneas que delimitan las formas detectadas en una imagen. Se usa cv2.findContours() para detectar los contornos de las formas en una imagen binarizada. 
	- Esta función también devuelve una 'jerarquía', pero en este caso, no la estamos utilizando directamente.
	- La jerarquía describe las relaciones entre los contornos (si hay contornos dentro de otros, etc.), pero no siempre es necesaria en tareas básicas de segmentación (como lo fue este caso).

- Centro de masa (Momentos): Es una forma de calcular el centro geométrico de una forma detectada. Se usacv2.moments() para calcularlo, y a partir de esos momentos, se obtienen las coordenadas (cx, cy) que indican la ubicación del centro de la forma.

- Bounding Boxes: Son cajas rectangulares que delimitan cada contorno detectado. Se pueden calcular utilizando cv2.boundingRect(), y nos ayudan a ubicar el contorno dentro de la imagen y a calcular métricas como el área y el perímetro.

