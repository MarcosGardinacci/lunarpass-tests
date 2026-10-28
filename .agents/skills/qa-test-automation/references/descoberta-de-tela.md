# Descoberta de tela com o Playwright MCP

O cenário diz **o que** acontece; a tela diz **como**. Antes de escrever o Page Object, percorra o caminho do cenário na aplicação e anote os elementos reais.

## Ambiente

- **URL:** `baseURL` do project em `playwright.config.ts` (`http://localhost:3000` nos dois projects).
- **Mission Control:** caminho conhecido nos Page Objects atuais: `/mission-control/login`.
- **Storefront:** caminho conhecido em `HomePage.go`: `/`.
- Credenciais: as que os specs de `playwright/e2e/mission-control/` já usam. Não invente usuários.

## Procedimento

1. Confirme que a aplicação responde em `http://localhost:3000`. Se não responder, não invente a tela: siga apenas com o que já existe nos Page Objects e entregue como "não executado".
2. Abra a página inicial do caminho do cenário pelo Playwright MCP. Confirme as ferramentas disponíveis; os nomes variam por versão.
3. Leia o **snapshot de acessibilidade** de cada tela. Ele mostra papel, nome acessível e estado de cada elemento, que é exatamente o que os locators usam.
4. Execute as ações do **Quando** para ver as telas seguintes e o resultado do **Então** (toasts, alertas, mudanças de estado).
5. Anote, por tela: o caminho da URL, cada elemento usado e o melhor locator para ele.
6. Feche a aba ao terminar.

## Cuidados

- A descoberta pode precisar de dados. Use a massa que o teste vai criar (ver `massa-de-teste.md`) e limpe ao final, ou use dados de demonstração sem alterá-los.
- Não conclua reservas, cadastros ou envios com dados reais só para explorar.
- Não use o browser MCP da IDE no lugar do Playwright MCP.

## Escolha do locator

Ordem de `docs/arquitetura.md`:

| Prioridade | Locator | Quando |
|---|---|---|
| 1 | `getByRole(papel, { name })` | Botões, links, títulos, campos com nome acessível, alertas |
| 2 | `getByLabel(rótulo)` | Campos associados a um rótulo (ex.: `Base lunar`) |
| 3 | `getByPlaceholder(texto)` | Campos identificados pelo texto de ajuda (ex.: login) |
| 4 | `getByTestId(id)` | Quando a semântica de acessibilidade não for suficiente |

Padrões já usados no projeto: `getByRole('alert')` em login e cadastro; `getByRole('listitem')` no toast compartilhado; `getByTestId('mission-form-return-date')` na data de retorno.

Evite XPath, subidas no DOM (`/..`) e classes CSS. `docs/aderencia.md` documenta exatamente esses anti-padrões no storefront. Elemento sem papel nem identificador estável vira sugestão de testabilidade no resumo.

## Estados que a descoberta precisa revelar

- **Botões desabilitados:** o snapshot nem sempre mostra que um botão está desabilitado. Verifique o estado antes de planejar um clique.
- **Mensagens dinâmicas:** alertas e toast mudam conforme a interação. Anote o texto de cada estado que o cenário usa.
- **Contraprova:** quando a asserção verifica um estado (botão desabilitado, mensagem de vazio), confirme na tela que o estado oposto existe. Assim a asserção prova algo e não passa por acaso.
- **Listas do storefront:** localize a missão pelo identificador do teste, nunca pela posição na lista.
