# Taller 10 - Filtro Visual: Convoluciones Personalizadas

📅 Fecha  
**2025-04-23** – Fecha de asignación
**2025-05-02**– Fecha de entrega

----------

## 🎯 Objetivo del Taller

Diseñar e implementar filtros personalizados en imágenes para modificar bordes, difuminar o realzar detalles. Este taller busca profundizar en el concepto de convolución y su impacto visual en el procesamiento de imágenes.

----------

## 🧠 Conceptos Aprendidos

-   Convolución 2D manual en imágenes.
    
-   Repaso de filtros visuales clásicos (blur, sharpening, Sobel).
    
-   Normalización y bordes de imágenes.
       
-   Interactividad con `ipywidgets` en Colab.
    

----------

## 🔧 Herramientas y Entornos

-   Google Colab (Python 3)
    
-   OpenCV (cv2)
    
-   NumPy
    
-   Matplotlib
    
-   ipywidgets
    

📌 Todas las herramientas fueron utilizadas según sus guías de instalación oficiales y compatibles con el entorno Colab.

----------

## 📁 Estructura del Proyecto



2025-04-23_taller_convoluciones_personalizadas/

├── python/

├── resultados/

├── README.md


----------

## 🧪 Implementación

### 🔹 Etapas realizadas

1.  **Carga de imagen** en escala de grises usando `cv2` y `files.upload()` de Colab.
    
2.  **Implementación manual** de una función de convolución usando NumPy.
    
3.  **Diseño de kernels clásicos**:
    
    -   Enfoque (`sharpening`)
        
    -   Suavizado (`blur`)
        
    -   Detección de bordes (Sobel vertical)
        
4.  **Comparación visual** entre convolución manual y `cv2.filter2D`.
    
5.  **Interfaz interactiva** para aplicar kernels personalizados con sliders (`ipywidgets`).
    

----------

### 🔹 Código relevante


```python
# Función para aplicar convolución manual con un kernel
def convolucion_manual(image, kernel):
    # Obtener las dimensiones de la imagen y el kernel
    kernel_height, kernel_width = kernel.shape
    image_height, image_width = image.shape
    
    # Crear una nueva imagen para almacenar los resultados
    result = np.zeros_like(image)
    
    # Rellenar la imagen de salida con los resultados de la convolución
    for i in range(image_height):
        for j in range(image_width):
            # Definir la región de la imagen que se va a convolucionar
            region = image[i:i+kernel_height, j:j+kernel_width]
            
            # Verificar si la región se sale de los límites de la imagen.
            if region.shape == kernel.shape:
                # Aplicar la convolución (producto punto entre la región y el kernel)
                result[i, j] = np.sum(region * kernel)
``` 

----------

## 📊 Resultados Visuales

📌 Este taller requiere GIFs e imágenes comparativas. Abajo se presentan los principales resultados:

### 📷 Imagen original

![Imagen Original](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_convoluciones_personalizadas/resultados/bcsOriginal.jpg?raw=true)


### 📷 Comparación

![Imagen  Comparación](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_convoluciones_personalizadas/resultados/comparacion.png?raw=true)

## Bonus:  Interfaz Interactiva

![Bonus gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_convoluciones_personalizadas/resultados/bonus.gif?raw=true)


### 🔹 Código relevante


```python
#intalar librerias para el bonus:
import ipywidgets as widgets
from IPython.display import display
import matplotlib.pyplot as plt


# Crear sliders para cada valor del kernel 3x3

sliders = [[widgets.IntSlider(value=0, min=-5, max=5, step=1, description=f'K{i}{j}')
for j in  range(3)]  for i in  range(3)]

# Botón para aplicar el filtro
btn_aplicar = widgets.Button(description="Aplicar filtro")

# Función que extrae los valores del kernel y aplica la convolución

def  aplicar_kernel(b):
kernel = np.array([[sliders[i][j].value for j in  range(3)]  for i in  range(3)], dtype=np.float32)

resultado = convolucion_manual(image, kernel)

  

# Mostrar la imagen original y el resultado

plt.figure(figsize=(10,  4))
plt.subplot(1,  2,  1)
plt.title("Original")
plt.imshow(image, cmap='gray')
plt.axis('off')


plt.subplot(1,  2,  2)
plt.title("Filtrada (Manual)")
plt.imshow(resultado, cmap='gray')
plt.axis('off')
plt.show()


# Conectar botón
btn_aplicar.on_click(aplicar_kernel)


# Mostrar widgets
for fila in sliders:
	display(widgets.HBox(fila))
display(btn_aplicar)

```

----------

## 🧩 Prompts Usados

- _Refactoriza este código "...."_
- _Explicame como crear una función para realizar convoluciones._
-  "Mejora la redacción de estos parrafos: "..".
----------

## 💬 Reflexión Final

Este taller permitió reforzar los conceptos de procesamiento de imágenes desde cero, en especial el funcionamiento interno de una convolución. Al implementar manualmente el proceso, se comprendió en detalle cómo los kernels afectan los pixeles vecinos y cómo pequeñas variaciones en sus valores cambian el resultado visual significativamente.

Una parte interesante fue notar cómo OpenCV optimiza el rendimiento de forma notable comparado con la versión manual. Sin embargo, esta última brinda mayor flexibilidad educativa para experimentar. La interfaz con sliders añadió un nivel extra de exploración muy útil. En futuras actividades podría integrarse una opción de normalización automática o visualización 3D del kernel aplicado.
   
----------

## ✅ Checklist de Entrega

-   Carpeta `2025-04-23_taller_convoluciones_personalizadas`
    
-   Código limpio y funcional
    
-   GIFs incluidos con nombres descriptivos
    
-   Visualizaciones comparativas exportadas
    
-   README completo y claro
    
-   Commits descriptivos en inglés
