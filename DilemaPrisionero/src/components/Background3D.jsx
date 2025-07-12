import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Escena y cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    mountRef.current.appendChild(renderer.domElement);

    // 3. Geometría de partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      let x, y, z, radius;
      do {
        x = (Math.random() - 0.5) * 400;
        y = (Math.random() - 0.5) * 400;
        z = (Math.random() - 0.5) * 400;
        radius = Math.sqrt(x * x + y * y + z * z);
      } while (radius < 60); // Centro más vacío

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = 0.1 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.2 + Math.random() * 0.3;

      sizes[i] = 2 + Math.random() * 1.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // 4. Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: false,
      opacity: 1,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 5. Rotación automática + seguimiento del mouse
    let baseRotationX = 0;
    let baseRotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // Movimiento base
      baseRotationX += 0.0004;
      baseRotationY += 0.0007;

      // Movimiento influenciado por mouse (más rápido)
      particles.rotation.x += (baseRotationX + targetRotationY - particles.rotation.x) * 0.07;
      particles.rotation.y += (baseRotationY + targetRotationX - particles.rotation.y) * 0.07;

      renderer.render(scene, camera);
    };
    animate();

    // 6. Seguimiento de mouse continuo
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotationX = x * 1.2;
      targetRotationY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Limpieza
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
};

export default Background3D;
