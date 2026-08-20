import { useParams, Link } from "react-router-dom";
import { buscarPorSlug } from "../data/repositorio";
import { useState, useEffect } from "react";

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

    return (
        <h1>{hino.nome}</h1>
    );
}

export default PaginaHino;