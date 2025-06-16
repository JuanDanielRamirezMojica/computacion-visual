# Real-time Object Detection with YOLOv8 and OpenCV
import cv2 # Se usa OpenCV para la captura de video y visualización
import time # Se usa time para calcular el FPS
from ultralytics import YOLO #Se usa la librería ultralytics para cargar el modelo YOLOv8

# Carga el modelo (YOLOv8n)
model = YOLO("yolov8n.pt")

# Filtra opcionalmente según las clases que deseas detectar
filter_labels = [None, "person", "cat", "cell phone"]

# Inicializa la captura de video
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: no se pudo acceder a la cámara.")
    cap.release()
    exit(1)

print("Presiona 'q' para salir")
print("Presiona 'f' para cambiar el modo de filtrado")

# Filtrado activado o desactivado
filter_index = 0

# Loop principal
try:
    while True:
        inicio = time.time()
        ret, frame = cap.read()
        if not ret:
            print("Error: no se pudo leer el fotograma.")
            break

        # Realiza detección de objetos en el fotograma
        resultados = model.predict(source=frame, stream=False)
        detections = resultados[0]

        # Filtra según el modo vigente
        if filter_labels[filter_index] is not None:
            filter_name = filter_labels[filter_index]
            filtered_boxes = []
            for box in detections.boxes:
                class_id = int(box.cls.item())  # el id de la detección
                class_name = model.names[class_id]  # nombre de la detección
                if class_name == filter_name:
                    filtered_boxes.append(box)
            detections.boxes = filtered_boxes

        # Dibuja las detecciones en el fotograma
        annotated = detections.plot()

        # Calcula el FPS
        fin = time.time()
        fps = 1.0 / (fin - inicio)
        fps_text = f"FPS: {fps:.2f}"

        # Muestra el modo de filtrado
        modo = filter_labels[filter_index]
        modo_txt = f"Filtro: {modo or 'Sin Filtro'}"

        color = (0, 255, 0) if filter_index == 0 else (0, 0, 255)
        cv2.putText(annotated, modo_txt, (20, 30),
                    fontFace=cv2.FONT_HERSHEY_SIMPLEX,
                    fontScale=1, color=color, thickness=2)
        cv2.putText(annotated, fps_text, (20, 60),
                    fontFace=cv2.FONT_HERSHEY_SIMPLEX,
                    fontScale=1, color=color, thickness=2)

        # Muestra el resultado
        cv2.imshow("Deteccion en Tiempo Real", annotated)

        # Control con teclado
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):  # presiona q para salir
            break
        elif key == ord('f'):  # f para cambiar el filtro
            filter_index = (filter_index + 1) % len(filter_labels)
            print(f"Filtro cambiado a: {filter_labels[filter_index] or 'Sin Filtro'}")

finally:
    cap.release()
    cv2.destroyAllWindows()

