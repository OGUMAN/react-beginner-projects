import { useState } from 'react';
import './index.scss';

function App() {
  const [score, setScore] = useState(0);

  const onClickPlus = () => {
    setScore (score + 1);
  }

  const onClickMinus = () => {
    setScore (score - 1);
  }

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{score}</h1>
        <button onClick={onClickMinus} className="minus">- Минус</button>
        <button onClick={onClickPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
