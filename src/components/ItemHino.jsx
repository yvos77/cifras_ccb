import { Link } from "react-router-dom";

function ItemHino({ hino }) {
    return (
        <li>
            <Link to={`/hino/${hino.slug}`}>
            {hino.numero}{hino.numero && <span> - </span>}{hino.nome}
            </Link>
        </li>
    );
}

export default ItemHino;