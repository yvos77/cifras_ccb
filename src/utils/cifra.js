export function separarAcordes(linha) {
    const partes = linha.split(/\[([^\]]+)\]/);
    const pedacos = [];

    function adicionar(acorde, texto) {
        pedacos.push({ acorde, texto, colado: !texto.endsWith(" ") });
    }

    if (partes[0] !== "") {
        adicionar(null, partes[0]);
    }

    for (let i = 1; i < partes.length; i += 2) {
        adicionar(partes[i], partes[i + 1] ?? "");
    }

    return pedacos;
}