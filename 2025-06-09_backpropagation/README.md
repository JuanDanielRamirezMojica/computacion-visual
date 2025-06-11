# Backpropagation -  ¿Cómo Aprenden las Redes Neuronales? 

### 📅 Fecha

2025-06-09 – Fecha de asignación

### 🎯 Objetivo del Taller

Comprender el algoritmo de **retropropagación (backpropagation)** como el núcleo del aprendizaje en redes neuronales, explorando cómo se aplica la regla de la cadena para ajustar los pesos y minimizar el error de predicción mediante descenso de gradiente.

### 🧠 Conceptos Aprendidos

-   Definición de retropropagación como aplicación de la regla de la cadena.
-   Flujo de información hacia adelante y hacia atrás en una red neuronal.
-   Cálculo de derivadas parciales de la función de costo con respecto a cada peso.
-   Interpretación de la función de costo como una medida de error.
-   Uso del gradiente para actualizar pesos mediante descenso de gradiente.
-   Extensión del algoritmo a redes con múltiples neuronas por capa.
-   Influencia de una neurona sobre el costo a través de múltiples rutas.
-   Visualización de la sensibilidad del costo a través de capas conectadas.

### 🔧 Herramientas y Entornos

-   Canva (edición visual de diapositivas)
-   Markdown (`README.md`)
-   Notación matemática en LaTeX

### 📁 Estructura del Proyecto

2025-06-09_backpropagation/  
├── Presentación Backpropagation/  
├── README.md  

### 🧪 Implementación

🔹 **Etapas realizadas**

-   Introducción a la regla de la cadena aplicada al aprendizaje profundo.
-   Explicación visual del flujo hacia adelante y hacia atrás en la red.
-   Derivación de la sensibilidad del costo respecto a pesos y activaciones.
-   Cálculo del gradiente y su interpretación como dirección de aprendizaje.
-   Inclusión de casos con múltiples neuronas por capa y cómo cambia la notación.
-   Ejemplos animados y visuales que refuerzan el aprendizaje intuitivo.

🔹 **Fragmento relevante del contenido**

```latex
\frac{\partial C}{\partial a^{(L-1)}_k} = \sum_j \frac{\partial C}{\partial z^{(L)}_j} \cdot \frac{\partial z^{(L)}_j}{\partial a^{(L-1)}_k}
```

_“Cada neurona en una capa oculta puede influir en múltiples neuronas en la siguiente capa. El gradiente se obtiene sumando todas estas influencias posibles.”_

### 📊 Resultados Visuales

✅ La presentación incluyó:

-   Visualización paso a paso del flujo de derivadas.
    
-   Comparación entre una red con una sola neurona por capa vs. varias.
    
-   Representaciones de las derivadas aplicando la regla de la cadena.
    
-   Ilustraciones del descenso de gradiente como “bajar una colina de error”.
    

_Nota: no se requirió código ni herramientas interactivas._

----------

### 💬 Reflexión Final

Este taller me permitió entender que el aprendizaje en redes neuronales no es mágico: está basado en matemáticas claras, específicamente la regla de la cadena. Lo más desafiante fue visualizar cómo las derivadas se propagan hacia atrás, especialmente cuando hay varias neuronas por capa y múltiples rutas de influencia.

Lo más valioso fue lograr representar el proceso completo con fórmulas y esquemas comprensibles. A futuro me gustaría implementar este algoritmo paso a paso en código Python para afianzar lo aprendido y experimentar con redes reales.

----------

### 👥 Contribuciones Grupales

**Estructura, Visualización y Redacción General:**

-   Sebastián Muñoz
-  Juan Daniel Ramírez Mojica:   

**Derivadas, Fórmulas y Múltiples Neuronas:**
    
    - Explicación teórica.
    - Explicaición de fórmulas.
    - Desarrollo de ejemplos con múltiples neuronas.      
    - Redacción de explicación paso a paso de la derivada general.
    - Formulación de las expresiones matemáticas en LaTeX.
        

----------

### ✅ Checklist de Entrega

✔ Carpeta `2025-06-09_backpropagation`  
✔ README completo y estructurado  
✔ Presentación en Canva organizada y clara  
✔ Fórmulas relevantes en LaTeX  
✔ Contribución detallada por integrante  
✔ Contenido alineado al video base de 3Blue1Brown  
✔ Vocabulario matemático preciso y visual
