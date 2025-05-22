# 🧪 Visualización y Exportaciones de Reconstrucciones COLMAP

📅 Fecha  
2025-05-21 – Fecha de entrega

----------

### 🎯 Objetivo del Taller

Explorar el flujo de trabajo completo desde la reconstrucción 3D con COLMAP hasta su visualización en entornos interactivos como Unity o Three.js. El objetivo fue comprender el proceso de exportación de modelos y su posterior ajuste y limpieza para integrarlos en aplicaciones 3D modernas.

----------

### 🧠 Conceptos Aprendidos

-   Reconstrucción 3D con imágenes (Structure-from-Motion, MVS)
    
-   Exportación de modelos en formatos PLY, OBJ y FBX
    
-   Limpieza y ajuste de modelos 3D para visualización
    
-   Integración de escenas en entornos como Unity y Three.js
    
-   Conversión y compatibilidad de archivos 3D
    
-   Bounding box y filtrado por densidad
    

----------

### 🔧 Herramientas y Entornos

-   COLMAP (Reconstrucción 3D)
    
-   CloudCompare (Filtrado y edición)
    
-   Blender (Limpieza y exportación)
    
-   Python (Open3D para limpieza automática)
    
-   Three.js / React Three Fiber
    
-   Unity
    

----------

### 📁 Estructura del Proyecto


```
2025_05_21_proyecto_final_p1/  
├──  2025_05_21_proyecto_final_p1.pdf
├──  README.md` 
```

----------

### 🧪 Implementación

#### 🔹 Etapas realizadas

1.  **Reconstrucción 3D con COLMAP**
        
2.  **Exportación de modelos:**
    
    -   En formato `.ply` (nube), `.obj` (malla) y `.fbx` (compatibilidad Unity)
        
3.  **Limpieza de modelos:**
    
    -   Bounding box en Three.js
        
    -   CloudCompare para recortes espaciales
        
    -   Blender para eliminar geometría innecesaria
        
    -   Open3D para filtrado por densidad
        
4.  **Visualización e integración:**
    
    -   Carga en Unity y Three.js
        
    -   Ajustes de escala, rotación, limpieza y texturizado
        

#### 🔹 Código relevante

`# Limpieza con Open3D  import open3d as o3d

pcd = o3d.io.read_point_cloud("modelo.ply")
pcd_clean, ind = pcd.remove_radius_outlier(nb_points=16, radius=0.05)
o3d.io.write_point_cloud("modelo_limpio.ply", pcd_clean)` 

----------

### 🧩 Prompts Usados

_No se aplicaron prompts generativos en este taller_

----------

### 💬 Reflexión Final

Este taller permitió comprender el flujo completo de trabajo desde una reconstrucción 3D hasta su visualización interactiva. Aprendimos a exportar y adaptar modelos para distintos entornos, enfrentándonos a desafíos como la limpieza de ruido o el ajuste de escala y orientación.

La parte más interesante fue la etapa de limpieza, ya que permite transformar una nube densa cruda en un modelo optimizado para tiempo real. 

----------

### 👥 Contribuciones Grupales

**Sergio David López**   y **Carlos Camacho**

→ Introducción a COLMAP.

→ Documentación y explicación del uso de COLMAP, exportación y visualización básica en Unity.

→ Visualización e integración en Three.js, ajustes de formato y testeo multiplataforma. 


**Sebastián Muñoz**   y **Juan Daniel Ramírez**  

→ Conversión de archivos y soporte técnico en COLMAP y Blender.  

→ Limpieza y optimización de modelos exportados (Three.js, CloudCompare, Blender, Open3D):

-  Bounding box en Three.js
    
-   Limpieza por densidad en Python con Open3D
    
-   Geometría sobrante usando CloudCompare y Blender
    

----------

### ✅ Checklist de Entrega

✅ Carpeta `2025_05_21_proyecto_final_p1`  
✅ README completo y claro  
✅ Commits descriptivos en inglés
