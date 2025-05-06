
# Taller 2 - Jerarquías y Transformaciones: El Árbol del Movimiento

📅 Fechas

- **2025-04-21** – Fecha de asignación 

- **2025-05-05**– Fecha de entrega

  
## Objetivo del taller
Aplicar estructuras jerárquicas y árboles de transformación para organizar escenas y simular movimiento relativo entre objetos. Se busca comprender cómo las transformaciones afectan a los nodos hijos en una estructura padre-hijo y cómo visualizar estos efectos en tiempo real.

---

## Actividades por entorno

### 1. Three.js con React Three Fiber

#### Descripción:

En esta implementación se utilizó **Vite** y **React Three Fiber** para crear una escena con una jerarquía de objetos. En esta escena, un grupo de objetos (padre → hijo → nieto → bisnieto → tataranieto) se transforman de manera jerárquica. Se pueden controlar las transformaciones de los objetos mediante sliders interactivos utilizando **Leva**.

![three.gif](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_jerarquias_transformaciones/threejs/threejsgif.gif)

🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_jerarquias_transformaciones/threejs)**

#### Funcionalidades:

- El objeto padre rota y se mueve en el espacio en función de los valores proporcionados por los sliders.
- Los objetos hijos se transforman con base en las transformaciones del objeto padre.
- Controles interactivos con **Leva** para la rotación y posición del objeto padre.

#### Código relevante:

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export function Scene() {

  // Controles interactivos usando Leva
  const { rotationSpeed, positionX } = useControls({
    rotationSpeed: { value: 0.5, min: 0, max: 5 }, // Valores para la velocidad de rotación
    positionX: { value: 0, min: -5, max: 5 }, // Valores para la posición en X
  });

  const parentRef = useRef();

  // Animación del padre
  useFrame(() => {
    parentRef.current.rotation.y += 0.01 * rotationSpeed;
    parentRef.current.position.x = positionX;
  });

  return (
    <group ref={parentRef}>
        
      {/* Nivel 1: Padre (cubo) */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#45CFDD" />
      </mesh>

      {/* Nivel 2: Hijo (esfera) */}
      <group position={[3, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#6527BE" />
        </mesh>

        {/* Nivel 3: Nieto (cono) */}
        <group position={[2.5, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.5, 1, 16]} />
            <meshStandardMaterial color="#86D293" />
          </mesh>

            {/* Nivel 4: Bisnieto (cubo) */}
            <group position={[2, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#FF8C9E" />
            </mesh>

            {/* Nivel 5: Tataranieto (esfera) */}
            <group position={[1.5, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#FFB400" />
              </mesh>

              {/* Nivel 6: Tataranieto (cono) */}
                <group position={[1, 0, 0]}>
                    <mesh>
                    <coneGeometry args={[0.25, 0.5, 16]} />
                    <meshStandardMaterial color="#FF6F61" />
                    </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
```

### 2. 🎮 Unity (versión LTS)

#### Descripción:

En Unity se creó una escena 3D con 5 objetos jerárquicos (padre → hijo → nieto → ... ). Se utilizó un script en **C#** para controlar las transformaciones del nodo padre mediante sliders de la UI. Los objetos hijos heredan las transformaciones del padre, lo que se puede observar tanto en la posición, rotación como en la escala.

![unity.gif](https://raw.githubusercontent.com/JuanDanielRamirezMojica/computacion-visual/refs/heads/main/2025-04-21_taller_jerarquias_transformaciones/unity/gifunity.gif)

#### Funcionalidades:

-   Los objetos hijos heredan las transformaciones aplicadas al padre.
    
-   Se utilizan sliders en la UI para controlar la rotación, posición y escala del objeto padre.
    
-   Se muestran los valores de transformación en la consola de Unity.
    
🔗 **[Ver implementación en el repositorio](https://github.com/JuanDanielRamirezMojica/computacion-visual/tree/main/2025-04-21_taller_jerarquias_transformaciones/unity)**


#### Código relevante:

```csharp
using UnityEngine;
using UnityEngine.UI;

public class Controlador : MonoBehaviour
{
    public Slider rotacionSlider;
    public Slider posicionSlider;
    public Slider escalaSlider;

    private bool animacionActiva = true;
    private float velocidadAnimacion = 30f; //Grados por segundo

    void Update()
    {
        if (animacionActiva)
        {
            // Control manual de los sliders
            transform.Rotate(rotacionSlider.value * velocidadAnimacion, 0, rotacionSlider.value * velocidadAnimacion); //rotación
            transform.position = new Vector3(posicionSlider.value, transform.position.y, transform.position.z); //posición
            transform.localScale = Vector3.one * escalaSlider.value; //tamaño
        }

        //Mostrar los valores en consola
        Debug.Log($"Posición: {transform.position}, Rotación: {transform.rotation.eulerAngles}, Escala: {transform.localScale}");
    }
}

```
----------

## Consideraciones

-   En la implementación de Three.js, se utiliza **Leva** para permitir el control en tiempo real de las transformaciones.
    
-   En Unity, se utiliza **UI Sliders** para manipular las transformaciones y mostrar los resultados de manera visual en la consola.
    
-   En ambas implementaciones, los objetos hijos heredan las transformaciones del objeto padre, lo que permite observar cómo las transformaciones afectan a toda la jerarquía.
