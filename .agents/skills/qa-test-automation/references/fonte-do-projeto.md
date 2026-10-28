# Fonte do projeto Lunar Pass

Leia estes arquivos **antes** de escrever código. Eles substituem a pasta genérica `assets/projeto/` da skill original.

O repositório separa aplicação (`src/`, ilustrativa) de automação E2E (`playwright/`). A configuração do Playwright fica na **raiz**.

## Leitura obrigatória

| Arquivo | Para quê |
|---|---|
| `docs/arquitetura.md` | Pastas, fixture `{ app }`, PCOM por módulo, massa Kysely, locators, isolamento, projects, roteiro de módulo novo |
| `playwright.config.ts` | Projects `mission-control` e `storefront`, `testDir`, `baseURL`, retries só em CI |
| `playwright/support/index.ts` | Como os Page Objects são agrupados (`app.mission`, `app.store`, `app.toast`) |
| `playwright/support/db.ts` | Funções de massa (`cleanMission`, `cleanAndInsertMission`, `insertMission`, `deleteMission`, `deleteReservation`, `deleteTicket`) |
| `playwright/support/types.ts` | `Mission`, `Reservation`, `Ticket` |
| `playwright/support/helpers.ts` | `formatDate` (datas AAAA-MM-DD → texto da tela) |
| 1 Page Object do módulo do cenário | Estrutura, nomes, locators e estilo da pasta vizinha |
| 1 spec do mesmo módulo | Imports, fixture, comentários AAA, massa |

## Opcional, conforme a área

| Arquivo | Quando |
|---|---|
| `docs/aderencia.md` | Entender testabilidade da tela (não copiar XPath nem `/..`) |
| `docs/storefront.md` / `docs/storefront-cts.md` | Contexto de negócio do storefront, se o cenário for dessa área |

## Estrutura que o código novo deve seguir

```plaintext
playwright/
├── e2e/
│   ├── mission-control/    # specs do Mission Control
│   └── storefront/         # specs do Storefront
└── support/
    ├── pages/
    │   ├── mission-control/
    │   ├── shared/         # só componente usado por mais de um módulo (ex.: toast.ts)
    │   └── storefront/
    ├── db.ts
    ├── helpers.ts
    ├── index.ts
    └── types.ts
playwright.config.ts        # raiz do repositório
```

Specs importam `{ test, expect }` de `../../support`.

## Comandos

```bash
npx playwright test
npx playwright test --project=mission-control
npx playwright test --project=storefront
npx playwright test --list --project=mission-control
npx playwright test --list --project=storefront
```

Arquivo único: passe o caminho do spec e o `--project` do módulo. Repetição em série para estabilidade: `--repeat-each=3 --workers=1` (ou `5` no diagnóstico de instabilidade).

Não há `webServer` ativo no config: a aplicação precisa já estar em `http://localhost:3000`.

## IDs de missão já usados nos specs (não repetir)

Antes de escolher um ID, busque no repositório (`LP-`). Nos specs atuais aparecem pelo menos `LP-0128A` e `LP-DUP01`. A arquitetura cita também `LP-3001A` como exemplo. O alerta de formato na tela de cadastro é `Use o formato LP-0000`.
