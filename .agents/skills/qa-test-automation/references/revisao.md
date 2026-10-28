# Revisão antes de entregar

Passe por todos os itens. Corrija o que falhar e só então entregue.

## Fidelidade ao cenário

- [ ] O título de cada teste **novo** é o nome do cenário (ou cenário + linha de Exemplos).
- [ ] Existe uma asserção para cada **Então** e cada **E**, e nenhuma além delas.
- [ ] Nenhum passo, regra ou resultado foi inventado.
- [ ] Textos observados na tela e não definidos na especificação estão listados no resumo.

## Arquitetura Lunar Pass

- [ ] Page Objects novos estão em `playwright/support/pages/<modulo>/` (ou `shared/` só se mais de um módulo usa) e registrados em `createApp` em `playwright/support/index.ts`.
- [ ] O spec está em `playwright/e2e/<modulo>/` e importa `{ test, expect }` de `../../support`.
- [ ] O teste usa `{ app }` (`app.mission`, `app.store`, `app.toast`) e não instancia Page Object com `new`.
- [ ] Page Objects novos não têm `expect`, dados de teste nem endereço completo.
- [ ] Nenhum teste ou Page Object existente foi refatorado sem pedido.
- [ ] `playwright.config.ts` e `playwright/support/db.ts` não foram alterados, salvo registro de módulo novo conforme `docs/arquitetura.md` seção 5.

## Locators e esperas

- [ ] Locators seguem `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId`.
- [ ] Não há XPath, subida no DOM nem classe CSS.
- [ ] Não há `waitForTimeout`.
- [ ] Cada asserção de estado foi confirmada com a contraprova na tela.

## Dados

- [ ] Cada teste usa identificador de missão exclusivo, que não aparece em nenhum outro teste.
- [ ] Cada teste novo prepara o próprio estado e limpa o que criou, inclusive em caso de falha.
- [ ] Em listas do storefront, nenhuma asserção depende de contagem total ou posição.

## Execução

- [ ] O teste foi executado com o `--project` do módulo, e o resultado no resumo é o que realmente aconteceu.
- [ ] Rodou mais de uma vez, em série (`--repeat-each=3 --workers=1`), sem variar o resultado.
- [ ] Falhas atribuídas ao produto estão reportadas com esperado e observado, sem asserção alterada.
- [ ] Nenhum `test.only`, `test.skip` ou asserção comentada ficou no código.
