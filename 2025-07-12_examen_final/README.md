# **🎓 Informe Final - Examen Final de Visual Computing: Dilema del Prisionero Interactivo**


### Nombre: Juan Daniel Ramírez Mojica.
###	Número de documento: 1000954106
###	Correo institucional: juaramirezmo@unal.edu.co
----------

## ✨ Dilema del Prisionero Interactivo

**El Dilema del Prisionero: Una experiencia interactiva con teoría de juegos, visión por computador y visualización 3D.**

----------

## Vídeo Explicativo:

https://www.youtube.com/watch?v=p-yxypD-lLw

----------

##  Descripción General

Este proyecto explora la aplicación de la teoría de juegos, y en particular del clásico Dilema del Prisionero, mediante una experiencia interactiva desarrollada en React y Three.js. El objetivo fue permitir a los usuarios participar en una serie de rondas de decisiones (cooperar o traicionar), usando distintos métodos de interacción:

-   Gestos con la mano (MediaPipe)
    
-   Comandos de voz (speech_recognition)
    
-   Botones tradicionales
    

Durante cada ronda, el jugador se enfrenta a una estrategia oculta que puede ser una de 16 distintas, incluyendo estrategias clásicas como "Tit for Tat" y algunas creadas por mi mismo. Al final del juego se presentan los resultados y se visualizan en gráficas 3D personalizables.

----------

##  Experiencia Interactiva

La experiencia se compone de varias etapas:

1.  **Menú animado:** Fondo con partículas y cámara que sigue al mouse.
    
2.  **Introducción didáctica:** Explicación visual del dilema del prisionero y su matriz de pagos.
    
3.  **Selección de estrategia:** Se presentan las 16 estrategias del oponente de forma visual.
    
4.  **Juego interactivo:**
    
    -   Se puede elegir el número de rondas.
        
    -   Se muestra la cámara del jugador.
        
    -   Gestos: puño = traicionar (fondo rojo), palma = cooperar (fondo verde).
        
    -   Botón de siguiente ronda habilitado sólo con gesto de paz (2 dedos).
        
    -   Texto animado entre rondas.
        
    -   Resultados por ronda (jugada propia y del oponente).
        
    -   Efecto visual si se traiciona (fondo rojo girando).
        
5.  **Pantalla de resultados:**
    
    -   Puntaje final del jugador y del oponente.
        
    -   Nombre de la estrategia utilizada.
        
6.  **Gráficas 2D y 3D:**
    
    -   Visualización de los puntajes por ronda.
        
    -   Sliders para cambiar color y grosor de las barras/lineas.
        

----------

##  Tecnologías Utilizadas
| Componente             | Tecnología / Herramienta                                |
|------------------------|---------------------------------------------------------|
| Frontend UI            | React, TailwindCSS, Three.js, Recharts                 |
| Fondo animado          | Partículas + Movimiento cámara con Three.js            |
| Reconocimiento de voz  | `react-speech-recognition` (frontend), `speech_recognition` (backend) |
| Detección de gestos    | MediaPipe Hands (Python backend)                       |
| Procesamiento de video | OpenCV (Python backend)                                |
| Backend                | FastAPI + WebSockets                                   |
| Estrategias del juego  | Módulo en Python con 16 estrategias programadas        |


----------

##  Características Implementadas

-   Menú 3D interactivo con partículas.
    
-   Intro educativa sobre el dilema del prisionero.
    
-   Selección visual de estrategias.
    
-   Procesamiento de cámara y detección de gestos en tiempo real.
    
-   Reconocimiento continuo de voz en el backend.
    
-   Comandos de voz: "coopero", "traiciono", "siguiente".
    
-   Visualización del frame procesado en canvas.
    
-   Efectos visuales (colores y animación al traicionar).
    
-   Texto animado en cada ronda.
    
-   Gráficas 3D de los resultados del juego.
    
-   Sliders de personalización (grosor, color, separación).
    

----------

# Talleres utilizados

 ### 1. Taller 13 - Gestos con Cámara Web: Control Visual con MediaPipe
✔ Aplicación en proyecto:

Detectas manos con MediaPipe en tiempo real.

Usas el número de dedos levantados para mapear decisiones: puño cerrado = traicionar, palma abierta = cooperar, ✌️ = siguiente ronda.

Aunque no todos los gestos se conectan al backend aún, el sistema de detección funciona visualmente (efectos de color y animación), lo cual cumple con el objetivo del taller.

### 2. Taller 23 - Voz al Código: Comandos por Reconocimiento de Voz Local
✔ Aplicación en  proyecto:

Integra reconocimiento de voz con speech_recognition.

Reconoces comandos como "coopero", "traiciono", "siguiente".

Aunque en el frontend aún no se aplican las acciones automáticamente, el backend sí recibe y detecta los comandos, por lo que implementaste bien la lógica central del taller.

### 3. Taller 24 - Interfaces Multimodales: Uniendo Voz y Gestos
✔ Aplicación en tu proyecto:

Tienes una interfaz que escucha comandos de voz y detecta gestos.

Aunque no combinaste directamente ambos inputs para decisiones conjuntas (voz y gesto simultáneo), la arquitecra y la intención de tener ambos canales sí reflejan el objetivo del taller.

### 4. Taller 47/48 - Detección de Objetos en Tiempo Real con YOLO y Webcam
✔ Aplicación en proyecto:

Tienes un backend con YOLOv8 y OpenCV integrados.

Aunque acalmente no estás usando YOLO para la lógica del juego, sí está cargado y en funcionamiento (según los logs y errores previos).

Además, aplicaste filtros visuales como el fondo rojo/verde al detectar gestos, lo cual refleja los principios del taller.

### 5. Taller - WebSockets e Interacción Visual en Tiempo Real
✔ Aplicación en tu proyecto:

 comunicación entre frontend (React) y backend (FastAPI) se realiza en tiempo real usando WebSockets.

Transmites frames procesados por la cámara, resultados de detección y gestos.

Recibes feedback visual dinámico en el canvas del jugador, como en el taller.

### 6. Taller 45 - Visualización de Datos en Tiempo Real: Gráficas en Movimiento
✔ Aplicación en  proyecto:

Al final del juego, puedes ver los resultados en gráficas 3D y 2D.

Estas gráficas permiten modificar su apariencia con sliders: color, ancho, espaciado, grosor de líneas.

Estás simulando una forma de visualización interactiva de datos basada en juego real, que encaja con este taller.

### 7. Taller 65 - Colisiones y Partículas: Reacciones Visuales Interactivas
✔ Aplicación parcial / inspiración visual:

No estás usando colisiones físicas con cannon.js, pero sí usaste la idea visual de reacciones al gesto (fondo rojo, giro de cámara, transición).

 menú con fondo animado de partículas que sigue el mouse también es un guiño al uso visual del taller.

Aunque no implementas físicas, sí usas eventos visuales reactivos como cambios de color por interacción.

### 8. Dashboard Visual 3D - Sliders y Botones para Controlar Escenas
✔ Aplicación en proyecto:

En  pantalla de gráficas 3D, implementaste sliders y botones para controlar los gráficos.

Puedes cambiar colores, grosor de líneas y espaciado/barra de los gráficos.

Esto cumple totalmente el objetivo del taller de dashboards interactivos.


-------------

# Resumen talleres usados

| Taller                          | ¿Aplicado? | ¿Cómo se refleja?                                      |
|--------------------------------|------------|--------------------------------------------------------|
| T13 - Gestos con MediaPipe     | ✅         | Detección de puño, palma y ✌️                         |
| T23 - Comandos por Voz         | ✅         | "coopero", "traiciono", "siguiente"                   |
| T24 - Interfaces Multimodales  | ✅         | Combinación de gestos y voz                           |
| T47/48 - YOLO en Webcam        | ✅         | Backend con YOLO, efectos visuales                    |
| Taller WebSockets              | ✅         | Comunicación en tiempo real                           |
| T45 - Gráficas en Tiempo Real  | ✅         | Visualización final del juego                         |
| T65 - Reacciones Visuales y Partículas | ✅ Parcial | Fondo animado + feedback de gesto                     |
| Dashboard 3D                   | ✅         | Sliders y botones para modificar gráficas             |

-------------


##  Limitaciones y Retos

Aunque se integraron múltiples entradas (voz, gestos, botones), la decisión final del jugador sólo se registra si se pulsa un botón. Los comandos de voz y los gestos se detectan y muestran visualmente, pero **no logran desencadenar la jugada en el backend**, debido a que los eventos no están correctamente conectados a `processPlayerMove` o `processNextRound`.

También se intentó mostrar una **cuenta regresiva** cuando se detecta un gesto sostenido (por ejemplo, mantener el puño por 3 segundos), pero el temporizador no logró ser visible ni funcional, aunque parte de la lógica está implementada.

----------

##  Arquitectura de Solución

### Propuesta general

Sistema cliente-servidor que permite el procesamiento de cámara y voz en tiempo real, con resultados enviados por WebSocket. El frontend capra video, el backend procesa gestos y voz, y ambos se sincronizan para mostrar resultados del juego.

### Relación entre módulos y datos


| Módulo             | Funcionalidad                                         |
|--------------------|-------------------------------------------------------|
| Frontend React     | Captura video, interfaz visual, renderiza resultados  |
| WebSocket Cliente  | Envía frames y recibe respuestas del backend          |
| Backend FastAPI    | Procesa video y voz, gestiona rondas                  |
| MediaPipe          | Detecta número de dedos y tipo de gesto               |
| speech_recognition | Escucha comandos como "coopero" o "traiciono"         |
| Motor de Juego     | Evalúa jugadas, estrategias y puntajes                |
| Visualización final| Gráficas 3D y 2D con resultados del juego             |




### Diagrama PlantUML

![Diagrama.png](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-07-12_examen_final/Resultados/Diagrama.png?raw=true)

----------

# RESULTADOS 

### Inicio:

![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-07-12_examen_final/Resultados/Inicio.gif?raw=true)



### Introducción:



![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-07-12_examen_final/Resultados/Intro.gif?raw=true)



### Interacción:

![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-07-12_examen_final/Resultados/Juego.gif?raw=true)



### Resultados/Gráficas

![three.gif](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-07-12_examen_final/Resultados/Resultados.gif?raw=true)

---------
##  Conclusiones y Aprendizajes

-   Aprendí a combinar diferentes tipos de entrada (voz, gesto, botones) en una experiencia coherente.
    
-   Profundicé en la comunicación en tiempo real con WebSocket entre frontend y backend.
    
-   A pesar de limitaciones técnicas, logre una experiencia visual atractiva y funcional para el usuario.
    
-   Integré teoría de juegos, computación visual y visualización de datos en un solo entorno interactivo.
    

----------

##  Posibles Mejoras Futuras

-   Conectar los comandos de voz y gestos directamente con las funciones del juego (sin necesidad de botones).
    
-   Hacer que el temporizador de gesto sea visible y que muestre la cuenta regresiva.
    
-   Agregar sonido y narración para aumentar la inmersión.
    
-   Guardar partidas anteriores y comparar estrategias en diferentes juegos.
    

----------
