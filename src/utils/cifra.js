export function separarAcordes(linha) {

    const partes = linha.split(/\[([^\]]+)\]/);
    const pedacos = [];

    if (partes[0] !== "") {
        pedacos.push({ acorde: null, texto: partes[0] });
    }

    for (let i = 1; i < partes.length; i += 2) {
        pedacos.push({ acorde: partes[i], texto: partes[i + 1] ?? "" });
    }

    return pedacos;
    
}