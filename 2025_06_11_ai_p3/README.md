# 🧠 ¿Qué es una Imagen para una Red Neuronal?

### 📅 Fecha

2025-06-11 – Fecha de exposición

### 🎯 Objetivo de la Presentación

Explicar cómo las imágenes son entendidas por las redes neuronales desde una perspectiva computacional, abordando su representación como tensores, las transformaciones necesarias para su procesamiento y las ventajas que ofrecen las arquitecturas modernas como las redes convolucionales (CNN) en tareas visuales complejas.

### 🧠 Conceptos Aprendidos

-   Imagen como tensor tridimensional (`alto × ancho × canales`)
    
-   Proceso de **preprocesamiento**: redimensionado, escalado y normalización
    
-   Conversión a estructuras como tensores para frameworks (TensorFlow, PyTorch)
    
-   Limitaciones de las redes densas (fully connected) en visión por computadora
    
-   Ventajas de mantener la estructura espacial con tensores
    
-   Uso de convoluciones en redes neuronales profundas (CNN)
    
-   Aplicaciones típicas: clasificación, detección de bordes, reconocimiento de texto
    
-   Relación con el aprendizaje automático tradicional (problema del aplanamiento)
    

### 🔧 Herramientas y Recursos

-   Canva (para la visualización)
    
-   Markdown (`README.md`)
    
-   Visualizaciones propias (ejemplos de imágenes con zoom tensorial, valores normalizados)
    

### 📁 Estructura del Proyecto
```
2025_06_11_ai_p3/  
├── presentación.pdf  
├── README.md
```

### 📊 Contenidos y Etapas Presentadas

🔹 **1. Representación de una imagen**

-   Las imágenes son matrices 3D: por ejemplo, una de tamaño `224x224` con 3 canales (RGB) tiene `150,528` valores.
    
-   Cada canal representa intensidades: rojo, verde, azul.
    

🔹 **2. Preprocesamiento y normalización**

-   Es fundamental preparar las imágenes:
    
    -   Escalar valores de píxel (ej. de 0-255 a 0-1)
        
    -   Normalizar para mejorar la estabilidad del entrenamiento
        
    -   Cambiar el formato a tensores (ej. `CHW` o `HWC`)
        

🔹 **3. Ejemplo visual**

-   Mostramos una imagen 10x10 con un parche 5x5 y su correspondiente visualización tensorial.
    
-   Comparación entre valores originales `[255, 120, 80]` y normalizados `[0.91, -0.12, 0.45]`.
    

🔹 **4. Redes densas vs imágenes**

-   Una red densa no puede manejar bien la estructura de una imagen:
    
    -   Requiere millones de pesos (ej. 150 millones para solo una capa de 1,000 neuronas).
        
    -   Pierde relaciones espaciales (bordes, esquinas).
        

🔹 **5. Ventajas de los tensores y CNNs**

-   Mantienen la estructura espacial.
    
-   Facilitan el uso de convoluciones que detectan patrones locales.
    
-   Son más eficientes en memoria y entrenamiento.
    
-   Se convierten en entrada estándar para clasificadores, detectores, segmentadores, etc.
    

🔹 **6. Aplicaciones típicas**

-   Clasificación de imágenes
    
-   Reconocimiento de texto en imágenes
    
-   Detección de bordes
    
-   Segmentación semántica (profundidad, objetos)
    

🔹 **7. Comparación con aprendizaje automático tradicional**

-   Modelos como SVM o regresión lineal requieren "aplanar" las imágenes a vectores.
    
-   Esto destruye la estructura 2D o 3D y reduce el desempeño.
    
-   Las CNNs evitan ese problema al trabajar directamente con píxeles organizados.
    

----------

### 💬 Reflexión Final

Esta presentación nos permitió entender que una imagen no es solo un archivo visual, sino una estructura numérica compleja que debe ser adecuadamente transformada y normalizada para ser interpretada por una red neuronal. Al estudiar los tensores y las redes convolucionales, reconocimos cómo las arquitecturas modernas logran interpretar imágenes sin perder relaciones espaciales importantes, algo que las redes densas o los modelos clásicos no podían hacer eficientemente.

La sección más interesante fue observar cómo una imagen aparentemente simple (como un parche de 5x5 píxeles) cambia su representación completamente al pasar por procesos de normalización, y cómo esto afecta su interpretación por una red neuronal.

----------

## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Cristian Medina → crmedinab@unal.edu.co 


### 👥 Contribuciones Grupales

**Temas 1,2,3, 4, 5, 6 y 7:**

-   Sebastián Muñoz, Carlos Camacho, Juan Daniel Ramírez, Sergio David López 
→ Desarrollo de conceptos teóricos.
→ Comparaciones entre modelos.
→ Beneficios de los tensores.
→ Aplicaciones modernas.
    

**Tema:**

-   Juan Daniel Ramírez Mojica:
    
    -   ¿Qué es una imagen para una red neuronal?
        
    -   Preprocesamiento y normalización
