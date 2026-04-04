# Decisões Técnicas

Este projeto foi estruturado para manter a **separação de responsabilidades**, facilitar a **manutenção** e deixar o crescimento previsível. A ideia central foi evitar uma base monolítica de componentes e _hooks_, organizando o código por camadas de domínio e uso.

## Estrutura de pastas escolhida

A estrutura foi feita baseada em [Feature-Sliced Design](https://feature-sliced.design), utilizando o plugin `steiger` para manter as boas práticas, e segue um modelo por responsabilidade:

- `src/app`: composição global da aplicação (árvore de rotas).
- `src/pages`: montagem de telas completas, consumindo entidades e _features_.
- `src/features`: fluxos de negócio focados em uma ação específica utilizado em mais de um local (ex.: `auth/login`, `auth/logout`).
- `src/entities`: regras e integrações de domínio reutilizáveis (ex.: `movie`, `session`).
- `src/shared`: infraestrutura e base comum (API client, componentes UI, utilitários, tema).

## Roteamento e telas

Foi usado **TanStack Router** com rotas baseadas em arquivo para simplificar a navegação e as regras de acesso.

As rotas são:

- `/login`: tela inicial, com o formulário de login. Essa é a unica rota que pode ser acessada sem autenticação.
- `/discover`: tela para encontrar filmes. Permite que a pesquisa seja feita por nome, filtros ou visualização dos filmes em alta.
- `/watchlist`: tela com uma visualização em tabela dos filmes que o usuário marca com interesse de assistir.
- `/movie/$movidId`: rota que leva à tela com todos os detalhes de um filme.

## Gerenciamento de dados e cache

**TanStack Query** foi escolhido para busca e cache de dados da API do TMDB.

- _Hooks_ de dados por contexto (`use-discover-movies`, `use-movie-details`, `use-watchlist`, etc.).
- Chaves de _query_ padronizadas em `entities/movie/api/keys.ts`
- Mutações com **atualização otimista** no _toggle_ de _watchlist_, reduzindo a latência percebida na UI.

## Autenticação sem backend próprio

Como o desafio não exige _backend_ próprio, a autenticação foi tratada em duas camadas:

1.  **Login mockado no front-end:**
    - `src/features/auth/api/login.ts` valida credenciais fixas para simular a autenticação. Essas credenciais estão descritas no arquivo `INSTRUCTIONS.md`
    - O usuário autenticado é salvo no _store_ de sessão feito com o Zustand.

2.  **Sessão de convidado da API do TMDB:**
    - O plano original era utilizar a API de convidado fornecida pelo TMDB para salvar filmes na Watchlist, como descrito na documentação:

      > Guest sessions are a special kind of session that give you some of the functionality of an account, but not all. For example, some of the things you can do with a guest session are: maintain a rated list, a **watchlist** and a favourite list. [TMDB API Reference](https://developer.themoviedb.org/reference/authentication-create-guest-session)

      Contudo a implementação da API não permite isso, então a Watchlist é salva na conta do usuário desenvolvedor associado ao token que consome a API.

    - De qualquer forma, ao fazer login, um token de guest session é criado e mantido.

**Persistência da sessão:**

- **Zustand** com `persist` salva dados de usuário e _guest session_ no `localStorage`.
- Ao recarregar a página, a sessão é reidratada automaticamente.

## UI e componentes

O [Shadcn](https://ui.shadcn.com/) foi adotado para manter a consistência visual e a acessibilidade. Foi utilizado o preset disponível [aqui](https://ui.shadcn.com/create?preset=b7BYPjHVQ&template=vite&base=base&item=preview).

Antes do início do projeto, essa biblioteca foi estudada, juntamente com as possibilidades da API do TMDB e foi elaborado um mockup da [interface que seria feita, usando Figma](https://www.figma.com/design/jbwb679KohGNqxYcWWhOnH/CineDash?node-id=0-1&t=L97OnPeWVz3o3Mye-1).

## Testes

Existem testes focados em comportamento crítico:

- Validação de _schema_ e página de login;
- Comportamento de _watchlist_ (inclusão/remoção e estado visual);
- Tipos e contrato de páginas específicas.
