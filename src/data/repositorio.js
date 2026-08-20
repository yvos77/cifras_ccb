import hinos from "./hinos.json";

export async function listarHinos(){
    return hinos;
}

export async function buscarPorSlug(slug){
    return hinos.find((hino) => hino.slug === slug);
}