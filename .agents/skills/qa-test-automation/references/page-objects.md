# Page Objects

Um Page Object representa uma tela e expõe o que o usuário faz nela. O teste deve ler como o cenário.

Pastas e registro seguem `docs/arquitetura.md` e `playwright/support/`.

## Onde colocar

| Situação | Destino |
|---|---|
| Tela do Mission Control | `playwright/support/pages/mission-control/` |
| Tela do Storefront | `playwright/support/pages/storefront/` |
| Componente usado por **mais de um** módulo | `playwright/support/pages/shared/` (hoje: `toast.ts`) |
| Componente de um módulo só (ex.: navbar) | Pasta do próprio módulo |

Arquivos atuais: `login.page.ts`, `dash.page.ts`, `register.page.ts`, `navbar.ts`, `home.page.ts`, `toast.ts`. Siga a nomenclatura vizinha (`*.page.ts` para páginas; componente pode omitir o sufixo).

Imports internos: tipos e helpers de `playwright/support/` (ex.: `../../types`, `../../helpers`), nunca de pastas na raiz.

## Registro na fixture

Em `playwright/support/index.ts`, importe o Page Object e acrescente em `createApp`:

- Mission Control → `mission: { ... }`
- Storefront → `store: { ... }`
- Compartilhado entre módulos → ao lado de `toast`, no mesmo nível
- Módulo novo → novo grupo, no roteiro da seção 5 de `docs/arquitetura.md`

Os testes **não** instanciam com `new LoginPage(page)`. Usam `{ app }`.

## Regras para Page Objects novos

1. **Um arquivo por tela**, classe `<Tela>Page`, construtor com `page: Page`.
2. **Locators como propriedades `readonly`**, criados no construtor, na ordem de `descoberta-de-tela.md`.
3. **Elementos que dependem de dado viram método.** Exemplo: card de uma missão específica devolve um `Locator`.
4. **Métodos são ações do usuário:** `go()`, `login(email, password)`, `submit(mission)`. Recebem dados por parâmetro.
5. **Navegação por caminho relativo**, apoiada no `baseURL` do project. Não copie o `http://localhost:3000/...` dos Page Objects antigos para código novo.
6. **Sem `expect` dentro do Page Object novo.** Asserções ficam no spec, sobre os locators expostos. Não remova `expect` já presente em `LoginPage` ou `RegisterPage`.
7. **Sem dados de teste nem credenciais** no Page Object.
8. **Sem espera fixa.**
9. Siga indentação e aspas dos arquivos da **mesma pasta** (há mistura 2 vs 4 espaços entre pastas).

## Page Objects que já existem

**Não os refatore.** Ao completar: acrescente locators e métodos sem mudar o comportamento dos que existem. Se precisar mudar algo existente, pergunte antes.

## Reutilizar ou criar?

| Situação | Decisão |
|---|---|
| A tela já tem Page Object | Reutilize e complete |
| O elemento é usado por mais de um módulo | `pages/shared/` |
| O elemento aparece em várias telas de um módulo | Componente na pasta do módulo |
| Tela nova | Page Object novo, registrado em `createApp` |
