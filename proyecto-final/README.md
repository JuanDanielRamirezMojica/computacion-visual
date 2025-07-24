# 🧪 Reconstrucción Forense 3D Asistida por IA

## 📅 Fecha  
2025-07-23 – Fecha de entrega del taller

## 🎯 Objetivo del Proyecto
Explorar la creación de una plataforma capaz de reconstruir escenas del crimen en 3D a partir de imágenes fotográficas, utilizando visión por computador, IA para detección de evidencias y visualización web interactiva.

## 🧠 Conceptos Aprendidos

- Reconstrucción 3D con múltiples vistas
- Transformaciones geométricas (rotación, traslación, escala)
- Visualización en tiempo real con Three.js
- Backend con FastAPI y comunicación REST/WebSocket
- Aplicación de modelos de detección en PyTorch
- Limitaciones prácticas en tareas de visión monocular
- Comunicación técnico-narrativa en contextos forenses

## 🔧 Herramientas y Entornos

- Python (opencv-python, torch, fastapi)
- JavaScript + Three.js (visualización 3D)
- Jupyter / Google Colab (prototipado IA)
- Docker (despliegue backend)
- OBS Studio (captura de interacción para GIF)

## 📁 Estructura del Proyecto

2025-07-24_reconstruccion_forense_3d/  
├── entorno/  
│   ├── python/                 # scripts de detección y reconstrucción  
│   └── threejs/               # visualizador 3D interactivo  
├── datos/  
│   ├── escena_1/              # imágenes fuente  
│   └── modelos/               # pesos de red (PyTorch)  
├── resultados/  
│   ├── reconstruccion_escena.gif  
│   └── evidencia_detectada.png  
├── README.md  

## 🧪 Implementación

### 🔹 Etapas realizadas

1. Carga de imágenes desde dispositivos móviles (ángulos múltiples).
2. Estimación de estructura 3D mediante triangulación con COLMAP (inicial) y análisis con herramientas propias.
3. Detección de objetos con modelo ligero de PyTorch (entrenado parcialmente).
4. Visualización interactiva en navegador con Three.js (rotación libre, zoom, foco en evidencias).
5. Comunicación en tiempo real mediante WebSocket para reflejar hallazgos.

### 🔹 Código relevante

```python
# Detección de evidencia con PyTorch
with torch.no_grad():
    output = detector(image_tensor.unsqueeze(0))[0]
    evidencias = aplicar_umbral_y_clasificar(output)
javascript
Copiar
Editar
// Three.js – carga del modelo 3D y rotación
const loader = new GLTFLoader();
loader.load('/datos/escena.glb', (gltf) => {
  scene.add(gltf.scene);
  animate();
});
```


## 📊 Resultados Visuales

### Presentación

Puede ver la información presentada en clase en la siguiente carpeta: [computacion-visual/presentacion_final at main · JuanDanielRamirezMojica/computacion-visual](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/presentacion_final)



### ✅ Video:

[computacion-visual/presentacion_final/Vidéo_Proyecto_FInal.mp4 at main · JuanDanielRamirezMojica/computacion-visual](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/presentacion_final/Vid%C3%A9o_Proyecto_FInal.mp4)

Este video muestra el proceso acelerado de carga de fotos, reconstrucción del entorno 3D y detección automática de evidencia con resaltado visual.


### 💬 Reflexión Final

Este taller permitió consolidar conocimientos sobre reconstrucción 3D, modelos de detección y diseño de sistemas interactivos en el contexto forense. Aprendimos que, aunque el procesamiento de múltiples vistas es viable, la reconstrucción desde una sola imagen sigue siendo un reto no resuelto por limitaciones físicas (ambigüedad de profundidad, falta de información geométrica).

Lo más desafiante fue integrar la detección automática con visualización 3D en tiempo real y asegurar que fuera comprensible para usuarios no técnicos (peritos, abogados). En próximos pasos, sería útil profundizar en modelos monoculares más avanzados (como NeRFs ligeros) o aumentar la base de datos forense para entrenar mejores detectores.

### 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Sergio David López → slopezpa@unal.edu.co


### ✅ Checklist de Entrega

 - Carpeta 2025-07-24_reconstruccion_forense_3d/

-  Código limpio y funcional

-  GIF incluido con nombre descriptivo

 - Visualizaciones o métricas exportadas

-  README completo y claro

-  Commits descriptivos en inglés
