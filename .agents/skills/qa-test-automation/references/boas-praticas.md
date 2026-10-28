# Boas práticas para o spec

## Estrutura

- Arquivo em `playwright/e2e/mission-control/` ou `playwright/e2e/storefront/`.
- Import: `import { test, expect } from '../../support'`.
- Massa: `import { cleanMission, cleanAndInsertMission } from '../../support/db'` e tipos de `../../support/types`.
- **Contexto** do Gherkin em `test.beforeEach`.
- Dentro do teste, as três partes com os comentários já usados nos specs do projeto:

```ts
  // Arrange - preparação do cenário de teste
  // Act - execução da ação a ser testada
  // Assert - verificação do resultado esperado
```

- Um teste por cenário. Em Esquema do Cenário, uma lista de dados com um `test` por linha.

## Asserções

- Use asserções que esperam sozinhas: `toBeVisible`, `toHaveText`, `toContainText`, `toHaveURL`, `toBeDisabled`, `toHaveCount` (só para elementos do próprio teste).
- Uma asserção para cada **Então** e cada **E** do cenário. Nenhuma a mais, nenhuma a menos.
- Valor exato: o texto ou número que a tela mostra para o resultado esperado.
- Toast compartilhado: `app.toast.message` (padrão atual: `toContainText`).
- Alerta da tela: locator `alert` do Page Object (`toHaveText` nos specs de login e cadastro).
- Para verificar que algo **não** acontece, verifique o estado observável que prova isso.
- Storefront: nunca `toHaveCount` da lista inteira nem `nth()`.

## Esperas

- Nada de `waitForTimeout`.
- O Playwright espera os elementos sozinho em ações e asserções. Se uma operação é lenta, espere pelo resultado visível.
- Evite timeout por teste. Se for inevitável, justifique no resumo.

## Isolamento

- Nenhum teste depende de outro nem da ordem de execução.
- Nenhum teste depende de dados que ele não criou, exceto o usuário de demonstração do Mission Control, sem alterá-lo.

## Nomes

- Variáveis, funções e Page Objects em inglês.
- Títulos, dados de teste e textos esperados como na tela e na especificação.
