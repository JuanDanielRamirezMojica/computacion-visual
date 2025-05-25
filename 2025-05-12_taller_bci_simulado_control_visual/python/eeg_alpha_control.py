import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import butter, lfilter, welch
import pygame
import time
from scipy.io import arff

# ---------- CARGA Y FILTRADO DE DATOS ----------

def cargar_datos_arff(path):
    data, meta = arff.loadarff(path)
    df = pd.DataFrame(data)
    # Convertir a numérico si es necesario
    for col in df.columns:
        if df[col].dtype == object:
            df[col] = df[col].apply(lambda x: float(x.decode("utf-8")))
    return df

def butter_bandpass(lowcut, highcut, fs, order=5):
    nyq = 0.5 * fs
    low, high = lowcut / nyq, highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def aplicar_filtro(data, lowcut, highcut, fs, order=5):
    b, a = butter_bandpass(lowcut, highcut, fs, order)
    return lfilter(b, a, data)

def calcular_potencia_alpha(senal, fs):
    freqs, psd = welch(senal, fs, nperseg=256)
    alpha_band = np.logical_and(freqs >= 8, freqs <= 12)
    potencia_alpha = np.trapz(psd[alpha_band], freqs[alpha_band])
    return potencia_alpha

# ---------- PARÁMETROS ----------
archivo = 'EEG_Eye_State.arff'
canal = 'AF3'  # Puedes cambiar por 'O1', 'O2', etc.
fs = 128  # Frecuencia de muestreo simulada
ventana_segundos = 2
paso_segundos = 0.5
umbral = 0.5  # Umbral de activación cerebral (ajustable)

# ---------- CARGA Y PREPROCESAMIENTO ----------
df = cargar_datos_arff(archivo)
senal = df[canal].values
tiempo = np.arange(len(senal)) / fs

# ---------- VISUALIZACIÓN DE SEÑAL ----------
plt.plot(tiempo, senal)
plt.title(f'Señal EEG - Canal {canal}')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.grid(True)
plt.show()

# ---------- INICIALIZAR PYGAME ----------
pygame.init()
ancho, alto = 800, 400
ventana = pygame.display.set_mode((ancho, alto))
pygame.display.set_caption("Control con Señal EEG - Potencia Alpha")

blanco = (255, 255, 255)
verde = (0, 255, 0)
rojo = (255, 0, 0)
azul = (0, 0, 255)

radio = 20
x_pos = ancho // 2
y_pos = alto // 2

# ---------- SIMULACIÓN EN TIEMPO REAL ----------
t_actual = 0
duracion_total = len(senal) / fs
ventana_muestras = int(fs * ventana_segundos)
paso_muestras = int(fs * paso_segundos)

ejecutando = True
reloj = pygame.time.Clock()

while ejecutando and t_actual + ventana_muestras <= len(senal):
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    # Extraer ventana de señal y filtrar
    segmento = senal[t_actual:t_actual + ventana_muestras]
    segmento_filtrado = aplicar_filtro(segmento, 8, 12, fs)

    # Calcular potencia Alpha
    potencia = calcular_potencia_alpha(segmento_filtrado, fs)

    # Actualizar color y posición
    if potencia > umbral:
        color_fondo = verde
        x_pos += 10
    else:
        color_fondo = rojo
        x_pos -= 5

    # Limitar posición
    x_pos = max(radio, min(ancho - radio, x_pos))

    # Dibujar
    ventana.fill(color_fondo)
    pygame.draw.circle(ventana, azul, (x_pos, y_pos), radio)
    pygame.display.flip()

    # Esperar tiempo simulado
    reloj.tick(1 / paso_segundos)
    t_actual += paso_muestras

pygame.quit()
