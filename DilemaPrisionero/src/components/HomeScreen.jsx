const HomeScreen = ({ onStart }) => {
  return (
    <div className="home-screen">
      <h1 className="home-title">Dilema del Prisionero</h1>
      <p className="home-subtitle">
        <span>¿</span>
        <span className="cooperar">Cooperar</span>
        <span> o </span>
        <span className="traicionar">traicionar</span>
        <span>?</span>
      </p>
      <button className="home-button" onClick={onStart}>
        <span>Comenzar</span>
      </button>
    </div>
  );
};

export default HomeScreen;