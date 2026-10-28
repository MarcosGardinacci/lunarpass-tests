# Do Gherkin ao teste

O Gherkin declarativo descreve o comportamento de negócio, sem telas, cliques ou campos. A automação traduz cada parte para o código sem mudar o que foi especificado.

A especificação pode estar num arquivo do projeto ou ser colada pelo usuário na conversa. As palavras-chave podem aparecer em texto puro, em **negrito** (Markdown) ou num arquivo `.feature`.

## Como cada parte vira código

| Gherkin | No teste | Como |
|---|---|---|
| **Contexto** | `test.beforeEach` do arquivo | Estado comum aos cenários da funcionalidade (ex.: abrir login; autenticar no Mission Control) |
| **Dado** | Arrange | De preferência por `playwright/support/db.ts`. Pela tela só quando o próprio cenário pede a navegação |
| **Quando** | Act | Ações do usuário, sempre por métodos do Page Object (`app.mission.*`, `app.store.*`) |
| **Então** / **E** | Assert | Uma asserção para cada resultado esperado, sobre localizadores do Page Object ou de `app.toast` |
| **Esquema do Cenário** + **Exemplos** | Um teste por linha | Lista de dados percorrida com um `test` por item |
| Anotações de rastreabilidade (regra de origem, IDs) | Nada | Servem para rastrear, não viram código |

## Título do teste

Regra desta skill (não renomeie specs antigos):

- Cenário: o nome exato, palavra por palavra.
- Esquema do Cenário: o nome seguido da identificação da linha.
- Um arquivo de spec por funcionalidade, em `playwright/e2e/<modulo>/`.

## Módulo

| Área | Spec | Page Objects | Project |
|---|---|---|---|
| Mission Control | `playwright/e2e/mission-control/` | `app.mission.*` | `--project=mission-control` |
| Storefront | `playwright/e2e/storefront/` | `app.store.*` | `--project=storefront` |
| Feedback compartilhado | — | `app.toast` | o project da tela em teste |

Se a área não for um desses dois módulos, siga a seção 5 de `docs/arquitetura.md` (pastas, fixture, spec e project). Não invente um terceiro módulo sem isso.

## Quando o cenário não é suficiente

| Situação | O que fazer |
|---|---|
| O **Então** não diz o que verificar | Pergunte antes de escrever |
| O **Então** descreve uma mensagem sem o texto exato | Use o texto que a tela mostra e registre no resumo: "texto observado, não definido na especificação" |
| O **Quando** é uma ação que a tela impede | Não force o clique. Verifique o estado que impede a ação (`toBeDisabled`) e explique em comentário no Act |
| O **Então** não tem correspondência clara na tela | Automatize o que é verificável, use o elemento mais próximo e registre a divergência no resumo |
| O **Dado** exige um estado que `db.ts` não consegue criar | Pergunte. Não simule o estado de outro jeito sem combinar |
| O cenário depende de uma decisão de negócio em aberto | Não automatize. Registre como pendente |
| A tela se comporta diferente do **Então** | O teste fica falhando. Reporte como possível defeito do produto |
