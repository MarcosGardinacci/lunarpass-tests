# Massa de teste

A suíte usa **Database Direct Seeding** com **Kysely** e PostgreSQL, em `playwright/support/db.ts`. Tipos em `playwright/support/types.ts`.

## Funções já existentes

| Função | Uso |
|---|---|
| `cleanMission(mission)` | Remove reservas, tickets e a missão do `mission.id` |
| `cleanAndInsertMission(mission)` | Limpa e insere a missão |
| `insertMission(mission)` | Insere a missão |
| `deleteMission(id)` | Remove a missão |
| `deleteReservation(mission_id)` | Remove reservas da missão |
| `deleteTicket(mission_id)` | Remove tickets da missão |

Campos de `Mission` usados pelos specs: `id`, `rocket`, `baseId`, `departureDate`, `returnDate`, `price`.

Não altere a conexão, o pool, SSL nem a connection string.

## Regras

1. **Identificador exclusivo por cenário.** Formato alinhado ao produto (`LP-0000` e variantes já usadas nos specs, como `LP-0128A`). Antes de escolher, busque no repositório e não repita nenhum ID.
2. **Estado conhecido antes do teste:** limpe e crie os dados de que o cenário precisa antes de agir (`cleanMission` ou `cleanAndInsertMission`).
3. **Limpeza depois do teste:** remova o que o teste criou, inclusive em caso de falha (`test.afterEach` chamando `cleanMission` ou equivalente). Specs antigos às vezes limpam só no Arrange: não os altere só por isso; nos testes novos, limpe também depois.
4. **Dados válidos para as regras que não estão em teste:** datas futuras, preço positivo, `baseId` que a tela aceita (os specs de cadastro usam `aurora` e foguete `Starship`).
5. **No storefront, nunca verifique contagem total nem posição.** Localize a missão do teste pelo identificador e verifique dentro dela (`docs/arquitetura.md` seção 3.4).
6. **Não altere dados que o teste não criou**, inclusive o usuário de demonstração do Mission Control.
7. **Isolamento entre módulos:** Mission Control e Storefront compartilham o mesmo banco. ID exclusivo evita colisão em paralelo (`fullyParallel: true`).

## Autenticação

Os specs de Mission Control autenticam pela UI no `beforeEach` (login + `navbar.logout` visível). Não introduza `storageState`.

## Quando falta uma função de massa

Se o cenário precisa de um estado que as funções atuais não criam (por exemplo inserir reserva ou ticket, não só apagar):

1. Confirme no código existente quais estruturas estão envolvidas (`types.ts`, `db.ts`). Não invente colunas.
2. Acrescente a função em `playwright/support/db.ts`, no mesmo estilo, no grupo temático (`missions`, `reservations`, `tickets`).
3. Se precisar de campos novos nos tipos, complete `playwright/support/types.ts`.
4. Registre no resumo o que foi acrescentado e por quê.
5. Se não for possível descobrir a estrutura com segurança, pergunte.

`@faker-js/faker` já existe no projeto e é usado pontualmente para ID inválido. Não crie pasta de factories.
