import json
import re
import sys
import unicodedata
from pathlib import Path

PADRAO_ACORDE = re.compile(
    r"^[A-G](#|b)?(m|maj|min|dim|aug|sus|add|M)?[0-9]*(sus[0-9]+|add[0-9]+|dim|aug)?(\([^)]*\))?(/[A-G](#|b)?)?$"
)

PADRAO_SECAO = re.compile(r"^\s*(\d+)\s*\.\s*$")

PONTUACAO_FIM = set(",;.:!?")

PADRAO_TIPO = re.compile(r"^\s*\[(\w+)\]\s*$")


def gerar_slug(texto):
    normalizado = unicodedata.normalize("NFKD", texto)
    sem_acento = "".join(c for c in normalizado if not unicodedata.combining(c))
    limpo = re.sub(r"[^a-zA-Z0-9\s-]", "", sem_acento).strip().lower()
    return re.sub(r"[\s-]+", "-", limpo)


def limpar_acorde(token):
    return token.rstrip(". ").strip()


def e_acorde(token):
    if token != token.rstrip():
        return False
    candidato = limpar_acorde(token)
    if not candidato:
        return False
    return bool(PADRAO_ACORDE.match(candidato))


def normalizar_texto(token):
    return token.replace("\u2011", "").replace("\u2013", "-").replace("_", " ")


def comeca_verso(acumulado, texto):
    if not acumulado or acumulado.endswith((" ", "-")):
        return False
    primeiro = texto.lstrip()[:1]
    return primeiro.isupper()


def e_fim_de_verso(token):
    if token != token.rstrip():
        return False
    nucleo = token.strip()
    if not nucleo:
        return False
    return all(c in PONTUACAO_FIM for c in nucleo)


def converter(caminho, cabecalho):
    brutas = Path(caminho).read_text(encoding="utf-8").split("\n")

    secoes = []
    versos = []
    
    atual = ""
    pendente = None

    def fechar_verso():
        nonlocal atual
        limpo = re.sub(r"[ \t]+", " ", atual).strip()
        if limpo:
            versos.append(limpo)
        atual = ""

    def fechar_secao():
        nonlocal versos
        fechar_verso()
        if versos:
            secoes.append({"tipo": tipo_atual, "linhas": versos})
        versos = []

    for bruta in brutas:
        token = bruta.rstrip("\r")
        if not token.strip():
            continue

        marcador = PADRAO_TIPO.match(token)
        if marcador:
            fechar_secao()
            tipo_atual = marcador.group(1).strip().lower()
            pendente = None
            continue

        if PADRAO_SECAO.match(token):
            fechar_secao()
            tipo_atual = "estrofe"
            pendente = None
            continue

        if e_acorde(token) and pendente is None:
            pendente = limpar_acorde(token)
            continue

        texto = normalizar_texto(token)

        if comeca_verso(atual, texto):
            fechar_verso()

        if pendente:
            atual += f"[{pendente}]"
            pendente = None

        atual += texto

        if e_fim_de_verso(token):
            fechar_verso()

    fechar_secao()

    numero = cabecalho.get("numero")
    return {
        "id": int(cabecalho["id"]) if cabecalho.get("id") else None,
        "slug": cabecalho.get("slug") or gerar_slug(cabecalho.get("nome", "")),
        "numero": int(numero) if numero and numero.lower() != "null" else None,
        "nome": cabecalho.get("nome", ""),
        "colecao": cabecalho.get("colecao", "hinario"),
        "tom": cabecalho.get("tom", ""),
        "secoes": secoes,
    }


def main():
    if len(sys.argv) < 2:
        print("uso: python tokens.py <arquivo.txt> [chave=valor ...]")
        print("exemplo: python tokens.py h1.txt id=1 numero=1 nome='Cristo, meu Mestre' tom=C")
        return

    cabecalho = {}
    for argumento in sys.argv[2:]:
        if "=" in argumento:
            chave, valor = argumento.split("=", 1)
            cabecalho[chave.strip()] = valor.strip()

    hino = converter(sys.argv[1], cabecalho)
    texto = json.dumps(hino, ensure_ascii=False, indent=4)
    Path("saida.json").write_text(texto + "\n", encoding="utf-8")
    print(texto)

    total = sum(len(s["linhas"]) for s in hino["secoes"])
    print(f"\n{len(hino['secoes'])} secoes, {total} versos", file=sys.stderr)


if __name__ == "__main__":
    main()