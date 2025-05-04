# Taller 7 - Análisis de Figuras Geométricas: Centroide, Área y Perímetro

📅 Fecha 2025-04-23 – Fecha de asignación

🎯 Objetivo del Taller:
Detectar formas simples (círculos, cuadrados, triángulos) en imágenes binarizadas y calcular propiedades geométricas como área, perímetro y centroide. El objetivo es desarrollar habilidades para extraer métricas relevantes de contornos detectados en imágenes procesadas.


🧠 Conceptos Aprendidos

-   Segmentación binaria
    
-   Detección de contornos
    
-   Cálculo de propiedades geométricas (área, perímetro, centroide)
    
-   Clasificación de figuras según sus vértices
    
-   Visualización de métricas en imágenes
    
-   Generación de animaciones GIF
    

🔧 Herramientas y Entornos

-   Python
    
    -   opencv-python
        
    -   numpy
        
    -   matplotlib
        
    -   imageio
        
-   Google Colab
    

📁 Estructura del Proyecto 

2025-04-23_taller_analisis_figuras_geometricas/
├── python/
│   └── analisis_figuras_geometricas.ipynb
├── resultados/
│   ├── analisis_figuras_geometricas.gif
│   ├── circuloOpen.png
│	  ├── circuloPuntoMedio.png
│   ├── contornos.png
│   ├── cuadrado.png
│   ├── hexagono.png
│   ├── lienzoblanco.png
│   ├── triangulo.png
│   ├── trianguloRaste.png
├── README.md


🧪 Implementación

🔹 Etapas realizadas

1.  **Carga de imagen binarizada**: Se utilizó una imagen generada programáticamente.
    
2.  **Detección de contornos**: Con `cv2.findContours()` se identificaron las figuras presentes.
    
3.  **Cálculo de propiedades geométricas**: Para cada contorno se calcularon área (`cv2.contourArea`), perímetro (`cv2.arcLength`) y centroide (`cv2.moments`).
    
4.  **Clasificación de figuras**: Usando `cv2.approxPolyDP()` se clasificó cada figura según el número de vértices.
    
5.  **Visualización**: Se dibujaron los contornos y las métricas en la imagen.
    
6.  **Generación del GIF**: Se creó un GIF que muestra paso a paso cada figura con sus métricas superpuestas.
    

🔹 Código relevante

```
# Detección de contornos y cálculo de métricas
contornos, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
output_img = cv2.cvtColor(img.copy(), cv2.COLOR_GRAY2BGR)

for i, cnt in enumerate(contornos):
    area = cv2.contourArea(cnt)
    perim = cv2.arcLength(cnt, True)
    M = cv2.moments(cnt)
    cx = int(M["m10"] / M["m00"]) if M["m00"] != 0 else 0
    cy = int(M["m01"] / M["m00"]) if M["m00"] != 0 else 0

    approxContor = cv2.approxPolyDP(cnt, 0.04 * perim, True)
    shape = "Círculo"
    if len(approxContor) == 3:
        shape = "Triángulo"
    elif len(approxContor) == 4:
        shape = "Cuadrado"
    elif 5 <= len(approxContor) < 6:
        shape = "Otro"
    elif 6 == len(approxContor):
        shape = "Hexágono"

    print(f"[Figura {i+1}] Tipo: {shape}, Área: {area:.2f}, Perímetro: {perim:.2f}, Centroide: ({cx},{cy})")
    cv2.drawContours(output_img, [cnt], -1, (255, 0, 0), 2)
    text = f"{shape}\nA={area:.1f}, P={perim:.1f}, C=({cx},{cy})"
    for j, line in enumerate(text.split('\n')):
        cv2.putText(output_img, line, (cx - 50, cy + 20 + 15 * j),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.4, (146, 146, 255), 1)
    frames.append(output_img.copy())
```

📊 Resultados

#### 1. Lienzo en blanco:

![Imagen  Triángulo relleno por scanline  ](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/lienzoblanco.png?raw=true)


#### 2. Cuadrado:

![Imagen  Cuadrado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/cuadrado.png?raw=true)



#### 3. Circulo con OpenCV:

![Imagen  Circulo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/circuloOpen.png?raw=true)


#### 4. Triangulo:

![Imagen  Triángulo](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/triangulo.png?raw=true)



#### 5. Hexagono:

![Imagen Hexagono  ](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/hexagono.png?raw=true)
 


#### 6.  Círculo con algoritmo de punto medio:

![Imagen  Círculo con algoritmo de punto medio  ](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/circuloPuntoMedio.png?raw=true)
 
#### 7.  Triángulo por rasterización (scanline):

![Imagen  Triángulo por rasterización (scanline)](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/trianguloRaste.png?raw=true)
 
#### 8. Detección de contornos:
![Imagen  Triángulo por rasterización (scanline)](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/contornos.png?raw=true) 

  #### 9. GIF:
![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-04-23_taller_analisis_figuras_geometricas/resultados/analisis_figuras_geometricas.gif?raw=true) 

 
🧩 Prompts Usados

-   "Mejora la redacción de estos parrafos(...)."
 
💬 Reflexión: Este taller permitió reforzar el uso práctico de OpenCV para extraer información geométrica clave de figuras simples. La comprensión del uso de momentos para obtener el centroide, así como el método de aproximación de contornos para clasificar formas, resultó muy útil e interesante.

Una de las partes más interesantes fue el proceso de clasificación automática por número de vértices. La principal dificultad fue encontrar los parámetros correctos para `cv2.approxPolyDP` y organizar el código para una salida limpia y comprensible.



### ✅ Checklist de Entrega

-   ✅ Carpeta `2025-04-23_taller_analisis_figuras_geometricas/`
    
-   ✅ Código limpio y funcional
    
-   ✅ Visualizaciones exportadas (`.png`)
    
-   ✅ GIF opcional.
    
-   ✅ README completo y claro.
    
-   ✅ Commits descriptivos en inglés
