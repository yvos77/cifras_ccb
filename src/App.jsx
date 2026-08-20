import { useState, useEffect } from "react";
import { listarHinos } from "./data/repositorio";
import ItemHino from "./components/ItemHino";

function combina(hino, busca) {
  if (busca === "") {
    return true;
  }

  const ehNumero = /^\d+$/.test(busca);

  if (ehNumero) {
    return String(hino.numero) === busca;
  }

  return hino.nome.toLowerCase().includes(busca.toLowerCase());

}

function App() {
  const [hinos, setHinos] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    listarHinos().then((resultado) => setHinos(resultado));
  }, []);

const visiveis = hinos.filter((hino) => combina(hino, texto));

  return (
    <div>
      <h1>Cifras CCB</h1>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <ul>
        {visiveis.map((hino) => (
          <ItemHino key={hino.id} hino={hino} />
        ))}
      </ul>
    </div>
  );
}

export default App;
