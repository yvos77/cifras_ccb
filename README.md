# Cifras CCB

Site mobile-first para consultar letras de hinos com as cifras de violão posicionadas acima das sílabas.

🔗 **[yvos77.github.io/cifras_ccb](https://yvos77.github.io/cifras_ccb/)**

---

## ⚠️ Projeto pessoal de aprendizado

**Este é um projeto de estudo, sem qualquer vínculo oficial com a Congregação Cristã no Brasil.**

Ele foi criado por uma pessoa aprendendo React do zero. Não é um produto, não é mantido por uma equipe, não tem garantia de funcionamento, de disponibilidade ou de correção do conteúdo musical. Se você chegou aqui procurando um site confiável de cifras, provavelmente este não é o lugar.

---

## Por que este projeto existe

O objetivo é aprender desenvolvimento web de verdade — React, roteamento, CSS mobile-first, manipulação de strings, deploy — resolvendo um problema real: tocar hino no violão lendo pelo celular, com letra e acordes alinhados e legíveis.

A ideia veio de um problema que tinha com os meus amigos/irmãos da igreja, na qual sempre ficávamos um bom tempo procurando a letra de hinos (avulsos principalmente) e alguns de autoria própria.

---

## Stack

| Camada | Escolha |
|---|---|
| Build | Vite |
| Interface | React |
| Rotas | React Router |
| Estilo | CSS puro, mobile-first |
| Dados | JSON local |
| Hospedagem | GitHub Pages |

Sem framework de CSS e sem biblioteca de componentes — de propósito, para aprender os fundamentos na mão.

## Como rodar

Requer Node.js LTS.

```bash
npm install
npm run dev
```

Para testar no celular, exponha o servidor na rede local e acesse o IP da máquina pelo aparelho:

```bash
npm run dev -- --host
```

## Publicação

```bash
npm run deploy
```

O script roda o build, copia o `index.html` para `404.html` (necessário para as rotas funcionarem ao abrir um link direto no GitHub Pages) e publica na branch `gh-pages`.

Publicar e versionar são coisas separadas — o `git push` envia o código para a `develop`; o `npm run deploy` atualiza o site.

---

## Estrutura

```
src/
├── components/
│   ├── ItemHino.jsx      Linha da lista
│   └── LinhaCifra.jsx    Um verso com acordes acima
├── pages/
│   ├── ListaHinos.jsx    Tela inicial
│   └── PaginaHino.jsx    Tela do hino
├── data/
│   ├── hinos.json        Acervo
│   └── repositorio.js    Camada de acesso aos dados
├── utils/
│   └── cifra.js          Interpreta os acordes
└── App.jsx               Rotas

arrumar_cifras/           Scripts Python de conversão
```

### Formato dos dados

Cada hino é um objeto com metadados e uma lista de seções. Os acordes ficam entre colchetes, dentro da própria linha de letra, imediatamente antes da sílaba onde entram:

```json
{
  "id": 1,
  "slug": "nome-do-hino",
  "numero": 1,
  "nome": "Nome do hino",
  "colecao": "hinario",
  "tom": "C",
  "secoes": [
    {
      "tipo": "estrofe",
      "linhas": ["[C]Primeiro verso da pri[G]meira estrofe"]
    }
  ]
}
```

A escolha é deliberada: digitar é rápido, a transposição vira aritmética sobre um valor delimitado, e o acorde acompanha a sílaba quando a linha quebra no celular. A exibição no estilo tradicional (acordes numa linha acima da letra) é montada em tempo de renderização por `utils/cifra.js`.

### Camada de acesso aos dados

Nenhum componente importa o JSON diretamente — todos passam por `repositorio.js`. As funções são `async` mesmo sem precisarem ser hoje, para que a assinatura não mude no dia em que os dados vierem de um banco. Só esse arquivo precisará ser reescrito na migração.

### Scripts de conversão

A pasta `arrumar_cifras/` tem utilitários em Python que leem cifras em texto e geram o JSON no formato acima. A saída é sempre um rascunho que precisa de revisão manual.

---

## Sobre o conteúdo

As letras dos hinos são publicação da Congregação Cristã no Brasil. Este repositório é um exercício de programação e não reivindica direitos sobre elas.

O código é de uso livre. O conteúdo dos hinos, não.

---

Feito por [@yvos77](https://github.com/yvos77) enquanto aprendia React.