import "./LinhaCifra.css";
import { separarAcordes } from "../utils/cifra";

function LinhaCifra({ linha }) {

    const pedacos = separarAcordes(linha);

    return (
        <div className="linha-cifra">
            {pedacos.map((pedaco, i) => (
                <span className="pedaco" key={i}>
                    <span className={pedaco.colado ? "pedaco-acorde colado" : "pedaco-acorde"}>
                        {pedaco.acorde}
                    </span>
                    <span className="pedaco-letra">{pedaco.texto}</span>
                </span>
            ))}
        </div>
    );

}

export default LinhaCifra;