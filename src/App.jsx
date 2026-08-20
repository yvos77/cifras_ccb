import { useState, useEffect } from "react";
import { listarHinos } from "./data/repositorio";

function App() {
  const [hinos, setHinos] = useState([]);

  useEffect(() => {
    listarHinos().then((resultado) => setHinos(resultado));
  }, []);

  return (
    <div>
      <h1>Cifras CCB</h1>
      <ul>
        {hinos.map((hino) => (
          <li key={hino.id}>
            {hino.numero}{hino.numero && <span> - </span>}{hino.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
