import { useEffect, useState } from "react";
import "./App.css";
import { DiceIcon } from "./icons/DiceIcon";

interface Advice {
  id: number;
  content: string;
}

interface AdviceFromApi {
  id: number;
  advice: string;
}

function App() {
  const [advice, setAdvice] = useState<Advice | null>(null);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        const adviceFromApi: AdviceFromApi = result.slip;
        setAdvice({
          id: adviceFromApi.id,
          content: adviceFromApi.advice,
        });
      });
  };

  if (!advice) {
    return <div>Fetching data...</div>;
  }

  return (
    <main className="card">
      <h1 className="card__title">ADVICE #{advice.id}</h1>
      <p className="card__content">"{advice.content}"</p>
      <div className="card__split"></div>
      <div className="card__button" onClick={getAdvice}>
        <DiceIcon />
      </div>
    </main>
  );
}

export default App;
