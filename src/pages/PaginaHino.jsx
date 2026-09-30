import { useParams, Link } from "react-router-dom";
import { buscarPorSlug } from "../data/repositorio";
import { useState, useEffect } from "react";
import LinhaCifra from "../components/LinhaCifra";

function ordenar(secoes) {

    const estrofes = secoes.filter((secao) => secao.tipo === "estrofe");
    const coros = secoes.filter((secao) => secao.tipo === "coro");
    const finais = secoes.filter((secao) => secao.tipo === "final");

    const conhecidos = ["estrofe", "coro", "final"];
    const outros = secoes.filter((secao) => !conhecidos.includes(secao.tipo))

    return [
        ...estrofes.slice(0, 1),
        ...coros,
        ...estrofes.slice(1),
        ... finais,
        ...outros,
    ];
}

function PaginaHino() {
    const { slug } = useParams();
    const [hino, setHino] = useState(null);

    useEffect(() => {
        buscarPorSlug(slug).then((resultado) => setHino(resultado))
    }, [slug]);

    if (hino === null) {
        return <p>Carregando...</p>;
    }

    if (hino === undefined) {
        return (
            <div>
                <h1>Hino não encontrado</h1>
                <Link to="/">Voltar para a lista</Link>
            </div>
        )
    }

    const secoesExibidas = ordenar(hino.secoes);

    return (
        <div>
            <Link to="/" className="voltar">{"«"}</Link>
            <h1>{hino.numero ? `${hino.numero}. ${hino.nome}` : hino.nome}</h1>
            <div>
                <p style={{"margin-bottom": "1rem"}}>Tonalidade: <span className="tomHino">{hino.tom}</span></p>
                {secoesExibidas.map((secao, i) => (
                    <div className="secao" key={i}>
                        <h2>
                            {secao.tipo}
                        </h2>
                        {secao.linhas.map((linha, j) => (
                            <LinhaCifra key={j} linha={linha} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaginaHino;