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

function ListaHinos({ aba, setAba }) {
  const [hinos, setHinos] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    listarHinos().then((resultado) => setHinos(resultado));
  }, []);

  const buscando = texto.trim() !== "";

  const visiveis = hinos.filter((hino) => combina(hino, texto));
  const hinario = visiveis.filter((hino) => hino.colecao === "hinario");
  const avulso = visiveis.filter((hino) => hino.colecao === "avulso");

  function grupo(titulo, lista) {
    if (lista.length === 0) {
      return null;
    }

    return (
      <>
        {titulo && <h2 className="grupo-titulo">{titulo}</h2>}
        <ul>
          {lista.map((hino) => (
            <ItemHino key={hino.id} hino={hino} />
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      <h1>Cifras CCB</h1>

      <input
        className="busca"
        placeholder="Pesquisar hino"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {!buscando && (
        <div className="abas">
          <button
            className={aba === "hinario" ? "aba ativa" : "aba"}
            onClick={() => setAba("hinario")}
          >
            Hinário
          </button>
          <button
            className={aba === "avulso" ? "aba ativa" : "aba"}
            onClick={() => setAba("avulso")}
          >
            Avulsos
          </button>
        </div>
      )}

      {visiveis.length === 0 && (
        <p>Nenhum hino encontrado para "{texto}"</p>
      )}

      {buscando ? (
        <>
          {grupo("Hinário", hinario)}
          {grupo("Avulsos", avulso)}
        </>
      ) : (
        grupo(null, aba === "hinario" ? hinario : avulso)
      )}
    </div>
  );
}

export default ListaHinos;