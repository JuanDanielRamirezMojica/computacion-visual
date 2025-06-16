# #Primero toca instalar esto en la terminal:
# # pip install opencv-python ultralytics numpy
# #python.exe -m pip install ultralytics opencv-python numpy
# from ultralytics import YOLO



# # Carga el modelo (por ejemplo el preentrenado yolov8n.pt)
# model = YOLO("yolov8n.pt")  # o yolov8s.pt según tus recursos



# import cv2
# import numpy as np

# # Encender la cámara
# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Error: no se puede acceder a la cámara.")
#     cap.release()
#     exit()


# # Filros
# def aplicar_filtros(frame, opc=0):
#     """
#     opc == 0 -> sin filtro
#     opc == 1 -> escala de grises
#     opc == 2 -> binarización
#     opc == 3 -> detección de bordes
#     """
#     if opc == 1:
#         return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     elif opc == 2:
#         gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         _, umbral = cv2.threshold(gris, 128, 255, cv2.THRESH_BINARY)
#         return umbral
#     elif opc == 3:
#         gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         bordes = cv2.Canny(gris, 100, 200)
#         return bordes
#     return frame


# # Loop principal
# filter_option = 0
# running = True

# while running:
#     ret, frame = cap.read()
#     if not ret:
#         print("Error: no se pudo leer el fotograma.")
#         break
    
#     # Aplicar filtro
#     filtro = aplicar_filtros(frame.copy(), filter_option)

#     # Realizar detección de objetos
#     resultados = model(frame)
#     detections = resultados[0]

#     # dibujar detecciones en el frame original
#     deteccion = detections.plot()

#     #Mostrar varias ventanas
#     cv2.imshow("Original con deteccion", deteccion)
#     cv2.imshow("Filtro Aplicado", filtro)

#     # Control con teclado
#     key = cv2.waitKey(1) & 0xFF
#     if key == ord('q'):  # presiona q para salir
#         running = False
#     elif key == ord('f'):  # f para cambiar de filtro
#         filter_option = (filter_option + 1) % 4
#     elif key == ord('s'):  # guardar captura
#         cv2.imwrite("captura.jpg", deteccion)
#         print("Captura guardada.")


# cap.release()
# cv2.destroyAllWindows()


import cv2
import numpy as np
from ultralytics import YOLO

# Carga el modelo
model = YOLO("yolov8n.pt")  # o el que estás utilizando

def aplicar_filtros(frame, opc):
    """Aplica el filtro elegido al frame."""
    if opc == 0:
        return frame.copy()
    elif opc == 1:
        return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    elif opc == 2:
        _, binaria = cv2.threshold(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), 128, 255, cv2.THRESH_BINARY)
        return binaria
    elif opc == 3:
        return cv2.Canny(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), 100, 200)
    elif opc == 4:
        # Filtro dinámico: Canny si detectamos alguien
        resultados = model(frame)
        detections = resultados[0]
        classes = detections.boxes.cls
        person_count = (classes == 0).sum()
        if person_count > 0:
            return cv2.Canny(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), 100, 200)
        return frame.copy()
    return frame.copy()


def nombre_filtro(opc):
    """Devuelve el nombre del filtro según opc."""
    return {
        0: "Sin Filtro",
        1: "Escala de Grises",
        2: "Binarización",
        3: "Canny (Bordes)", 
        4: "Dinámico (Canny si Persona)"
    }[opc]


# Loop principal
filter_option = 0
running = True

# Capture de video
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: no se pudo acceder a la cámara.")
    cap.release()
    exit()

while running:
    ret, frame = cap.read()
    if not ret:
        print("Error: no se pudo leer el fotograma.")
        break
    
    # Aplicar filtro
    filtro = aplicar_filtros(frame.copy(), filter_option)

    # Realizar detección de objetos
    resultados = model(frame)
    detections = resultados[0]
    deteccion = detections.plot()

    # Contar personas u objetos
    classes = detections.boxes.cls
    person_count = (classes == 0).sum()
    text = f'{person_count} Persona(s) detectada(s)'    

    # Poner el nombre del filtro en pantalla
    cv2.putText(deteccion, f"Filtro actual: {nombre_filtro(filter_option)}",
                (20, 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 
                1, 
                (0, 0, 255), 
                2)
    # Poner el conteo de personas
    cv2.putText(deteccion, text,
                (20, 80), 
                cv2.FONT_HERSHEY_SIMPLEX, 
                1, 
                (0, 0, 255), 
                2)

    #Mostrar varias ventanas
    if filter_option == 1 or filter_option == 2 or filter_option == 3 or filter_option == 4:
        cv2.imshow("Filtro Aplicado", filtro)
    else:
        # si sin filtro, simplemente muestro el original
        cv2.imshow("Filtro Aplicado", frame)
    cv2.imshow("Original con deteccion", deteccion)


    # Control con teclado
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):  # presiona q para salir
        running = False
    elif key == ord('f'):  # f para cambiar de filtro
        filter_option = (filter_option + 1) % 5
    elif key == ord('s'):  # guardar captura
        cv2.imwrite("captura.jpg", deteccion)
        print("Captura guardada.")


cap.release()
cv2.destroyAllWindows()

