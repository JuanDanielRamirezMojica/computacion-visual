import { useState, useRef } from 'react';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import Background3D from './components/Background3D';
import './styles/styles.css';

function App() {
  const [started, setStarted] = useState(false);
  const [transition, setTransition] = useState(false);
  const transitionRef = useRef(null);

  const handleStart = () => {
    setTransition(true);
    setTimeout(() => {
      setStarted(true);
      setTransition(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <Background3D />
      
      <div
        ref={transitionRef}
        className={`transition-overlay ${transition ? 'active' : ''}`}
      />
      
      <div className="content-container">
        <div>
          {!started ? (
            <HomeScreen onStart={handleStart} />
          ) : (
            <GameScreen onBack={() => setStarted(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;