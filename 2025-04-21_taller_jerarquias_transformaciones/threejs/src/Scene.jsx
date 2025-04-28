import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export function Scene() {

  // Controles interactivos usando Leva
  const { rotationSpeed, positionX } = useControls({
    rotationSpeed: { value: 0.5, min: 0, max: 5 }, //Valores para la velocidad de rotación
    positionX: { value: 0, min: -5, max: 5 }, //Valores para la posición en X
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