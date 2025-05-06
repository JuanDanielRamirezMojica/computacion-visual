# Taller 4 - Segmentando el Mundo: Binarización y Reconocimiento de Formas



📅 Fechas

- **2025-04-21** – Fecha de asignación 

- **2025-05-05**– Fecha de entrega


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

![Imagen Original](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/books_original.jpg?raw=true)



**Imagen en escala de grises:**

![Imagen Gris](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/original.jpg?raw=true)


![Imagen Gris](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/original_books.jpg?raw=true)
----------

## 2. Segmentación Umbral

### Descripción:

Para segmentar la imagen, se aplicaron dos tipos de umbralización:

1. **Umbral fijo:** Utilizando un valor de umbral de 127.5. (la mitad de 255)
2. **Umbral adaptativo:** Usando el método de media local para segmentar la imagen.

### Resultados:

**Imagen con Umbral Fijo (127.5):**

![Imagen Umbral Fijo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralFijo.jpg?raw=true)


![Imagen Umbral Fijo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralFijo_books.jpg?raw=true)



**Imagen con Umbral Adaptativo:**

![Imagen Umbral Adaptativo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralAdaptativo.jpg?raw=true)


![Imagen Umbral Adaptativo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/umbralAdaptativo_books.jpg?raw=true)


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


![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/contornos_books%20(2).jpg?raw=true)

**Imagen con Centros de Masa:**

![Imagen con Centros de Masa](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/centros_masa.jpg?raw=true)


![Imagen con Centros de Masa](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/centros_masa_books.jpg?raw=true)


**Imagen con Bounding Boxes:**

![Imagen con Bounding Boxes](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/bounding_boxes.jpg?raw=true)

![Imagen con Bounding Boxes](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/bounding_boxes_books.jpg?raw=true)


**Imagen con todo junto (Contornos, Centros y Boxes):**

![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/todo_junto.jpg?raw=true)

![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/todo_junto_books.jpg?raw=true)

**Comparación:**

![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/Comparacion.png?raw=true)


![Imagen Todo Junto](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_segmentacion_formas/python/images/comp_books.png?raw=true)


----------

## 4. Métricas: Área y Perímetro Promedio

### Descripción:

Se calcularon métricas para cada forma detectada: **área** y **perímetro**. Estas métricas se utilizaron para calcular el promedio de todas las formas detectadas.

### Resultados:

#### Ethan Winters:
- **Número de formas detectadas:** 82
- **Área promedio:** 2098.43
- **Perímetro promedio:** 327.58

#### Books:
- **Número de formas detectadas:** 34
- **Área promedio:** 5272.93
- **Perímetro promedio:** 327.68
----------

## Tecnologías utilizadas

- **Python 3**
- **OpenCV**
- **Matplotlib**
- **Google Colab**

  
----------

#### Código relevante:


##### 1. Función propia para mostrar y descargar imágenes
```python
def  show_download_img(image, name, title):
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    plt.title(title)
    plt.axis('off')
    plt.show() # Guardar la imagen procesada output_path = '/content/' + name + '.jpg' cv2.imwrite(output_path, image) # Descargar la imagen procesada files.download(output_path)` 
```
----------

##### 2. Procesamiento de imágenes
```python
#Umbral adaptativo
thresh_adaptive = cv2.adaptiveThreshold(original, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)


# Binarizar con umbral fijo

umbral_value, thresh_fixed = cv2.threshold(original,  127.5,  255, cv2.THRESH_BINARY)

  

# Detectar contornos

contornos_det, jerarquia = cv2.findContours(thresh_fixed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

  

#nota: jerarquia --> Valor que me devuelve la función pero no me interesa

  

# Crear imagen en negro del mismo tamaño

contornos = np.zeros_like(original)

  

# Dibujar solo los contornos en blanco

cv2.drawContours(contornos, contornos_det,  -1,  (255),  1)

show_download_img(contornos,'contornos'  ,'Imagen con contornos')





#Definición de fotos a dibujar:

contornos_img = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)

centros_img = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)

bounding_boxes_img = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)

todo_junto_img = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)

  
  
  

contours_fixed, junk = cv2.findContours(thresh_fixed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

  

areas = []  #Areas detectadas de la imagne

perimeters = []  #Perimetros detectados de la imagne

  
  

for i in contours_fixed:

  

if cv2.contourArea(i) > 50:  # ignorar ruido pequeño

  

# Dibujar Contorno

cv2.drawContours(contornos_img,  [i],  -1,  (0,255,0),  2)

cv2.drawContours(todo_junto_img,  [i],  -1,  (0,255,0),  2)

  

# Dibujar Centro de masa

M = cv2.moments(i)

  

#Si el área del contorno es diferente de cero

if M["m00"] != 0:

  

# Calcular las coordenadas del centro de masa (cx, cy)

cx = int(M["m10"] / M["m00"])

cy = int(M["m01"] / M["m00"])

  
  

# Dibujar un círculo rojo (255,0,0) en el centro de masa en 'todo_junto_img'

cv2.circle(centros_img,  (cx, cy),  5,  (255,0,0),  -1)

  

# Dibujar un círculo rojo (255,0,0) en el centro de masa en 'todo_junto_img'

cv2.circle(todo_junto_img,  (cx, cy),  5,  (255,0,0),  -1)

  
  

# Dibujar Bounding Box

# Calcular las coordenadas y dimensiones del rectángulo delimitador (Bounding Box)

x, y, w, h = cv2.boundingRect(i)

  

# Dibujar el rectángulo delimitador en 'bounding_boxes_img'.

cv2.rectangle(bounding_boxes_img,  (x, y),  (x+w, y+h),  (0,0,255),  2)

# Dibujar el rectángulo delimitador en 'todo_junto_img'.

cv2.rectangle(todo_junto_img,  (x, y),  (x+w, y+h),  (0,0,255),  2)

  
  
  

# Guardar Métricas

  

# Calcular y almacenar el área

areas.append(cv2.contourArea(i))

  

# Calcular y almacenar el perímetro

perimeters.append(cv2.arcLength(i,  True))



fig, axes = plt.subplots(2,  3, figsize=(15,  8))

  

# Mostrar imagen original

# axes[0, 0].imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)) # Convierte BGR a RGB - NO SE PONE porque sino invierte los colores.

axes[0,  0].imshow(cv2.cvtColor(original, cv2.COLOR_BGR2RGB))

#axes[0, 0].imshow(original) # YA está en RGB

axes[0,  0].set_title("Imagen Original")

axes[0,  0].axis('off')

  

# Mostrar imagen Umbral Fijo

axes[0,  1].imshow(thresh_fixed, cmap='gray')

axes[0,  1].set_title("Umbral Fijo")

axes[0,  1].axis('off')

  

# Mostrar imagen umbral adaptativo

axes[0,  2].imshow(thresh_adaptive, cmap='gray')

axes[0,  2].set_title("Umbral Adaptativo")

axes[0,  2].axis('off')

  

# Mostrar imagen con contornos

axes[1,  0].imshow(contornos, cmap='gray')

axes[1,  0].set_title("Imagen Contornos")

axes[1,  0].axis('off')

  

# Mostrar bordes usando Bounding boxes

axes[1,  1].imshow(bounding_boxes_img, cmap='gray')

axes[1,  1].set_title("Bounding boxes")

axes[1,  1].axis('off')

  
  

# Mostrar bordes usando Bounding boxes, centro de masa

axes[1,  2].imshow(todo_junto_img, cmap='gray')

axes[1,  2].set_title("Bounding boxes y Centro de masa")

axes[1,  2].axis('off')

  
plt.show()
```


##### 3. Función métricas
```python
num_formas = len(areas)
area_promedio = np.mean(areas) if areas else 0
perimetro_promedio = np.mean(perimeters) if perimeters else 0

print(f'Número de formas detectadas: {num_formas}')
print(f'Área promedio: {area_promedio:.2f}')
print(f'Perímetro promedio: {perimetro_promedio:.2f}') 
```
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


