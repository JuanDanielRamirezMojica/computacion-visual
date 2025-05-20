#PRIMERO,INSTALAR EN LA TERMINAL: pip install numpy pandas scipy matplotlib pygame liac-arff
# tambien isntalar: pip install liac-arff
#C:/Users/ASUS/AppData/Local/Programs/Python/Python310/python.exe -m pip install liac-arff
#C:/Users/ASUS/AppData/Local/Programs/Python/Python310/python.exe -m pip install numpy pandas scipy matplotlib pygame liac-arff


import arff
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import butter, lfilter
import pygame
import time

# --- Cargar archivo ARFF ---
with open("EEG Eye State.arff", 'r') as f:
    dataset = arff.load(f)

df = pd.DataFrame(dataset['data'], columns=[attr[0] for attr in dataset['attributes']])
df = df.astype(float)

# --- Visualizar señal cruda ---
plt.figure(figsize=(10, 4))
plt.plot(df["AF3"][:500], label="Canal AF3")
plt.title("Señal EEG (cruda)")
plt.xlabel("Tiempo [muestras]")
plt.ylabel("Amplitud")
plt.legend()
plt.tight_layout()
plt.show()

# --- Filtro pasa banda (8-12 Hz) para Alpha ---
def butter_bandpass(lowcut, highcut, fs, order=5):
    nyq = 0.5 * fs
    low, high = lowcut / nyq, highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def bandpass_filter(data, lowcut=8, highcut=12, fs=128, order=4):
    b, a = butter_bandpass(lowcut, highcut, fs, order)
    y = lfilter(b, a, data)
    return y

# Parámetros
fs = 128  # frecuencia de muestreo estimada
alpha_signal = bandpass_filter(df["AF3"], lowcut=8, highcut=12, fs=fs)

# --- Calcular potencia de la señal Alpha ---
window_size = fs  # 1 segundo
alpha_power = np.array([
    np.mean(alpha_signal[i:i+window_size]**2)
    for i in range(0, len(alpha_signal)-window_size)
])

# --- Umbral para detectar "atención" ---
threshold = np.percentile(alpha_power, 75)
attention = alpha_power > threshold

# --- Visualización de potencia Alpha y atención ---
plt.figure(figsize=(10, 4))
plt.plot(alpha_power, label="Potencia Alpha")
plt.axhline(y=threshold, color='r', linestyle='--', label="Umbral de atención")
plt.fill_between(range(len(attention)), 0, alpha_power[:len(attention)],
                 where=attention, color='green', alpha=0.3, label="Atención")
plt.title("Potencia Alpha y detección de atención")
plt.xlabel("Ventanas de 1 segundo")
plt.ylabel("Potencia")
plt.legend()
plt.tight_layout()
plt.show()

# --- Simulación visual en Pygame ---
pygame.init()
WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Simulación BCI - Atención visual")

# Colores
active_color = (0, 255, 0)    # Verde si hay atención
inactive_color = (50, 50, 50) # Gris si no hay atención

clock = pygame.time.Clock()
i = 0
running = True

print("Iniciando simulación... (cierra la ventana para terminar)")
while running and i < len(attention):
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    color = active_color if attention[i] else inactive_color
    screen.fill(color)
    pygame.display.flip()
    clock.tick(10)  # 10 FPS para simular ~1s por muestra

    i += 1

pygame.quit()
print("Simulación terminada.")

