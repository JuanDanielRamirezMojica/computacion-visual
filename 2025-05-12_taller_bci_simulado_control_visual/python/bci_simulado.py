import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import butter, lfilter, welch
import pygame
from scipy.io import arff

# === 1. Cargar datos desde archivo .arff ===
data, meta = arff.loadarff("EEG_Eye_State.arff")
df = pd.DataFrame(data)

# Convertir los valores binarios (eyeDetection) a enteros
df['eyeDetection'] = df['eyeDetection'].astype(int)

# === 2. Seleccionar canal para análisis (ejemplo: O1) ===
signal = df['O1'].values
fs = 128  # Frecuencia de muestreo asumida (Hz)

# === 3. Visualizar señal en el tiempo ===
plt.figure(figsize=(10, 4))
plt.plot(signal[:1000])  # solo primeros 1000 puntos para claridad
plt.title("Señal EEG (Canal O1)")
plt.xlabel("Tiempo [muestras]")
plt.ylabel("Amplitud")
plt.grid()
plt.tight_layout()
plt.show()

# === 4. Filtro pasa banda (Alpha: 8–12 Hz) ===
def butter_bandpass(lowcut, highcut, fs, order=4):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def bandpass_filter(data, lowcut=8, highcut=12, fs=128, order=4):
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    return lfilter(b, a, data)

filtered_signal = bandpass_filter(signal)

# === 5. Calcular potencia en banda Alpha con Welch ===
f, Pxx = welch(filtered_signal, fs=fs, nperseg=256)
alpha_power = np.sum(Pxx[(f >= 8) & (f <= 12)])
print(f"Potencia Alpha estimada: {alpha_power:.2f}")

# === 6. Definir umbral para control visual ===
threshold = 1e6  # Este valor puede ajustarse

# === 7. Visualización con pygame ===
pygame.init()
win = pygame.display.set_mode((500, 300))
pygame.display.set_caption("Simulación BCI - Color por Potencia Alpha")

# Color si potencia > umbral
color = (0, 255, 0) if alpha_power > threshold else (255, 0, 0)

running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    win.fill(color)
    pygame.display.update()
    clock.tick(30)

pygame.quit()
