function ItemHino({ hino }) {
    return (
        <li>
            {hino.numero}{hino.numero && <span> - </span>}{hino.nome}
        </li>
    );
}

export default ItemHino;