# Como rodar o projeto

Este projeto usa Vite + React + TypeScript e gerenciador de pacotes Yarn 4.

## 1) Pré-requisitos

- Node.js 20+ (recomendado LTS)
- Corepack habilitado (para usar a versao do Yarn definida no projeto)

Comandos iniciais:

```bash
corepack enable
```

## 2) Instalar dependencias

Na raiz do projeto, execute:

```bash
yarn install
```

## 3) Configurar variável de ambiente

A aplicação consome a API do TMDB e precisa de um token Bearer.

Crie um arquivo `.env` na raiz com:

```env
VITE_TMDB_API_TOKEN=seu_token_tmdb_aqui
```

Sem essa variavel, as requisicoes para filmes e watchlist vao falhar. Caso não tenha um token, siga as indicações na [documentação do TMDB](https://developer.themoviedb.org/docs/getting-started).

## 4) Subir ambiente de desenvolvimento

```bash
yarn run dev
```

O servidor inicia na porta `3000`.

## Observação sobre autenticação

O login é simulado no front-end (sem backend proprio). O login deve ser feito com as seguintes credenciais:

E-mail: `lucca.covre@exemplo.com`

Senha: `123456`
