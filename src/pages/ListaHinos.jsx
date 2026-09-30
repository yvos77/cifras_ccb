import { useState, useEffect } from "react";
import { listarHinos } from "../data/repositorio";
import ItemHino from "../components/ItemHino";

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

function ListaHinos() {
  const [hinos, setHinos] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    listarHinos().then((resultado) => setHinos(resultado));
  }, []);

const visiveis = hinos.filter((hino) => combina(hino, texto));
const hinario = visiveis.filter((hino) => hino.colecao === "hinario");
const avulso = visiveis.filter((hino) => hino.colecao === "avulso");


  return (
    <div>
      <h1>Cifras CCB</h1>
      <input className="busca" placeholder="Pesquisar hino" value={texto} onChange={(e) => setTexto(e.target.value)} />
      {visiveis.length === 0 && (
        <>
          <p>Nenhum hino encontrado para "{texto}"</p>
        </>
      )}
      {hinario.length > 0 && (
        <>
          <h2>Hinário</h2>
          <ul>
            {hinario.map((hino) => (
              <ItemHino key={hino.id} hino={hino} />
            ))}
          </ul>
        </>
      )}
      {avulso.length > 0 && (
        <>
          <h2>Avulsos</h2>
          <ul>
            {avulso.map((hino) => (
              <ItemHino key={hino.id} hino={hino} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ListaHinos;