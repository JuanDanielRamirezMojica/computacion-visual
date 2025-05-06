# Taller 5 - De Pixels a Coordenadas: Explorando la Imagen como Matriz


📅 Fechas

- **2025-04-21** – Fecha de asignación 

- **2025-05-05**– Fecha de entrega


## Objetivo del taller

Comprender cómo se representa una imagen digital como una matriz numérica y manipular sus componentes a nivel de píxel. Se abordará cómo trabajar con los valores de color y brillo directamente, accediendo a regiones específicas de la imagen para su análisis o modificación.

## Implementación

🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_imagen_matriz_pixeles)**

----------

## 1. Carga y visualización inicial de la imagen

### Descripción:

Se cargó una imagen en color utilizando `cv2.imread()`. Luego se visualizó la imagen en su formato original para inspeccionarla antes de realizar cualquier transformación.

### Resultado:

**Imagen Original:**
![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/DeathStrandingOriginal.jpg?raw=true)
----------

## 2. Separación de Canales RGB y HSV

### Descripción:

Se separaron los canales individuales de color (Rojo, Verde y Azul) y también los componentes del espacio de color HSV (Tono, Saturación y Valor).

-   **RGB:** Se extrajo cada canal y se visualizó tanto en escala de grises como "coloreado" simulando su color real.
    
-   **HSV:** Se visualizaron los canales H, S y V por separado para estudiar su representación.
    

### Resultados:

**Canal R (escala de grises y rojo real):**


![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20R2.png?raw=true)


![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20R3.png?raw=true)

**Canal G (escala de grises y verde real):**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20G2.png?raw=true)

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20G3.png?raw=true)

**Canal B (escala de grises y azul real):**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20B2.png?raw=true)

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20B3.png?raw=true)

**Canal H:**


![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20H.png?raw=true)

**Canal S:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20S.png?raw=true)

**Canal V:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/Canal%20V.png?raw=true)
----------

## 3. Modificación de Regiones Específicas

### Descripción:

Se utilizó slicing de matrices para modificar regiones específicas de la imagen:

-   Se crearon varias áreas rectangulares de distintos colores sobre la imagen original.
    
-   Se copió una región de la imagen y se trasladó a otra ubicación.
    
-   Se sustituyó la mitad derecha de la imagen por la mitad izquierda.
    

### Resultados:

**Imagen con bloques de colores modificados:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/mod_colorblocks.jpg?raw=true)	

**Imagen con región copiada:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/copybabyface.jpg?raw=true)

**Imagen con sustitución de mitades:**

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/halflefthalfright.jpg?raw=true)

----------

## 4. Cálculo y Visualización de Histograma de Intensidades

### Descripción:

Se calculó el histograma de intensidades en escala de grises de la imagen usando `matplotlib.pyplot.hist()`. Esto permitió analizar la distribución de los valores de píxel.

### Resultado:

**Histograma de Intensidades:**
![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/histograma.png?raw=true)

----------

## 5. Ajustes de Brillo y Contraste

### Descripción:

Se realizaron ajustes de brillo y contraste utilizando dos métodos:

-   **Método Manual:** Aplicando la fórmula `cv2.convertScaleAbs()` con factores definidos.

![Imagen con Contornos](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/brilloContraste.jpg?raw=true)    

-   **Método Interactivo (Bonus):** Creando sliders con `ipywidgets` para modificar brillo y contraste en tiempo real.
    
    ![Gif contraste y brillo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-21_taller_imagen_matriz_pixeles/python/images/GifBonus.gif?raw=true)


----------

## Tecnologías utilizadas

-   **Python 3**
    
-   **OpenCV**
    
-   **NumPy**
    
-   **Matplotlib**
    
-   **Google Colab**
    
-   **ipywidgets** (para el bonus de sliders interactivos)
    
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

##### 2. Separación y visualización de canales RGB y HSV


```python

 # Separar canales r, g, b = cv2.split(original)
hsv = cv2.cvtColor(original, cv2.COLOR_RGB2HSV)
h, s, v = cv2.split(hsv) # Visualizar canal rojo en escala de grises plt.imshow(r, cmap='Reds')
plt.title('Canal R (Rojo)')
plt.axis('off')
plt.show() # Canal rojo como imagen en color real imagen_roja = np.zeros_like(original)
imagen_roja[:, :, 0] = r
plt.imshow(imagen_roja)
plt.title('Canal R (Rojo real)')
plt.axis('off')
plt.show()` 
```

----------

##### 3. Modificación de regiones específicas con slicing


```python

imagen_modificada = cv2.cvtColor(original, cv2.COLOR_BGR2RGB).copy() # Modificar diferentes áreas rectangulares con colores puros
imagen_modificada[50:150, 50:150] = [255, 0, 0] # Rojo 
imagen_modificada[200:300, 100:200] = [0, 255, 0] # Verde 
imagen_modificada[100:200, 300:400] = [0, 0, 255] # Azul 
imagen_modificada[250:350, 250:350] = [255, 255, 0] #Amarillo
imagen_modificada[100:200, 500:900] = [0, 255, 255] # Cian 
imagen_modificada[700:850, 850:950] = [255, 255, 127] # Amarillo claro` 
```
----------

##### 4. Sustitución de una región por otra


```python
 # Copiar una región region = original[700:900, 700:900].copy() # Pegarla en una nueva posición imagen_modificada[700:900, 200:400] = region` 
```
----------

##### 5. Sustitución de media imagen


```python
 # Dividir imagen en mitades height, width, _ = original.shape
left_half = original[:, :width // 2] # Sustituir mitad derecha por la izquierda slicingsustitucion = original.copy()
slicingsustitucion[:, width // 2:] = left_half`
```

----------

## Comentarios personales

Definiciones que considero importantes:

- Slicing:
Selección de una subregión rectangular de una imagen usando índices de filas y columnas.

- Capa H (Hue):
Representa el matiz o tono de color en un espacio de color HSV.

- Capa S (Saturation):
Indica la intensidad o pureza del color en un espacio de color HSV.

- Capa V (Value):
Define el brillo o luminosidad del color en un espacio de color HSV.

- Capa R (Red):
Componente de intensidad del color rojo en un modelo RGB.

- Capa G (Green):
Componente de intensidad del color verde en un modelo RGB.

- Capa B (Blue):
Componente de intensidad del color azul en un modelo RGB.

- Espacio de color RGB:
Modelo de representación de imágenes basado en la combinación de rojo, verde y azul.

- Espacio de color HSV:
Modelo de representación de imágenes basado en matiz, saturación y valor de brillo.

- Segmentación por color:
Proceso de separar regiones de una imagen basándose en rangos específicos de color.

**Dificultades:**  
Tuve algunas dificultades iniciales entendiendo cómo visualizar correctamente los canales individuales de RGB, ya que al separarlos pierden su color real y hay que reconstruir imágenes "simuladas" para apreciarlo visualmente. 
