import { Link } from "react-router-dom";
import "./ItemHino.css";

function ItemHino({ hino }) {
    return (
        <li className="item-hino">
            <Link to={`/hino/${hino.slug}`} className="item-link">
                <span className="item-numero">{hino.numero}</span>
                <span className="item-nome">{hino.nome}</span>
            </Link>
        </li>
    );
}

export default ItemHino;