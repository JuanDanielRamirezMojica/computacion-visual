import { useRef, useEffect, useState } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export default function GameScreen({ onBack }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [fingerCount, setFingerCount] = useState(0);
  const handsRef = useRef(null);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results) => {
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');
      
      // Primero dibujamos el frame de video
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image, 
        0, 0, canvasElement.width, canvasElement.height
      );
      
      // Luego dibujamos los landmarks encima
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, 
                         {color: '#00FF00', lineWidth: 2});
          drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
          
          const count = countFingers(landmarks);
          setFingerCount(count);
        }
      }
      canvasCtx.restore();
    });

    handsRef.current = hands;

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (handsRef.current) {
            await handsRef.current.send({image: videoRef.current});
          }
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    return () => {
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, []);

  const countFingers = (landmarks) => {
    const fingerTips = [4, 8, 12, 16, 20];
    const fingerJoints = [3, 6, 10, 14, 18];
    let count = 0;

    if (landmarks[fingerTips[0]].x < landmarks[fingerJoints[0]].x) {
      count++;
    }

    for (let i = 1; i < 5; i++) {
      if (landmarks[fingerTips[i]].y < landmarks[fingerJoints[i]].y) {
        count++;
      }
    }

    return count;
  };

  return (
    <div className="screen-container" style={{ 
      animation: 'fadeIn 1s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h2>Mostrando cámara con detección de gestos</h2>
      
      <div style={{ 
        position: 'relative',
        width: '640px',
        height: '480px',
        border: '3px solid #4a2cdc',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <video 
          ref={videoRef} 
          style={{ display: 'none' }} 
          width="640" 
          height="480"
        />
        <canvas 
          ref={canvasRef} 
          width="640" 
          height="480"
          style={{ 
            display: 'block',
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
        />
        
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          👆 Dedos extendidos: {fingerCount}
        </div>
      </div>
      
      <button 
        onClick={onBack} 
        className="back-button"
        style={{ marginTop: '10px' }}
      >
        <span className="button-text">Volver al menú</span>
        <span className="button-glow"></span>
      </button>
    </div>
  );
}