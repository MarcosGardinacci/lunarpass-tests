# Exemplo: missão com código duplicado (Lunar Pass)

Exemplo para calibrar a skill. O fluxo, os locators e a massa seguem o que já existe em `playwright/support/` e em `playwright/e2e/mission-control/register.spec.ts`. O título do teste e a limpeza em `afterEach` seguem as regras desta skill para código **novo** (os specs antigos não precisam ser iguais).

## 1. O cenário

**Funcionalidade:** Cadastro de missão

**Contexto:**
**Dado** que estou autenticado no controle de missões

**Cenário:** Não cadastrar missão com código já existente
**Dado** que já existe uma missão com o código informado
**Quando** eu tento cadastrar outra missão com o mesmo código
**Então** eu sou informado de que já existe uma missão com este ID

## 2. Leitura do cenário

| Parte | Tradução para o teste |
|---|---|
| Contexto | Login pela UI no `beforeEach`, como em `register.spec.ts` |
| Dado | `cleanAndInsertMission` com ID exclusivo, não usado em outro spec |
| Quando | Abrir o cadastro pela dashboard e enviar o formulário com o mesmo ID |
| Então | Alerta com o texto exato que a tela mostra |

## 3. Descoberta de tela

Com o Playwright MCP, o Mission Control mostra heading "Mission Control" no login, botão "Entrar", link "Nova missão" na dashboard, heading "Programar missão" no cadastro, campos por papel/rótulo e `getByRole('alert')` para a mensagem.

## 4. Page Objects

Neste fluxo os Page Objects **já existem** (`LoginPage`, `DashPage`, `RegisterPage`, `Navbar`, `Toast`). Não se cria arquivo novo nem se registra nada em `createApp`. Completar só se faltar locator ou método.

Um Page Object **novo** neste projeto ficaria neste formato (caminho relativo, sem `expect`):

```ts
import { Page, Locator } from '@playwright/test'

export class RegisterPage {
    readonly page: Page
    readonly title: Locator
    readonly alert: Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.getByRole('heading', { name: 'Programar missão' })
        this.alert = page.getByRole('alert')
    }

    async submit(mission: { id: string; rocket: string; baseId: string; departureDate: string; price: number }) {
        await this.page.getByRole('textbox', { name: 'ID da missão' }).fill(mission.id)
        await this.page.getByRole('textbox', { name: 'Foguete' }).fill(mission.rocket)
        await this.page.getByLabel('Base lunar').selectOption(mission.baseId)
        await this.page.getByRole('textbox', { name: 'Data de partida' }).fill(mission.departureDate)
        await this.page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill(mission.price.toString())
        await this.page.getByRole('button', { name: 'Salvar missão' }).click()
    }
}
```

## 5. O teste

Arquivo: `playwright/e2e/mission-control/register.spec.ts` (funcionalidade já existente: acrescente o teste; não recrie o arquivo se ele já tem outros cenários).

```ts
import { test, expect } from '../../support'
import { Mission } from '../../support/types'
import { cleanMission, cleanAndInsertMission } from '../../support/db'

test.beforeEach(async ({ app }) => {
  // Arrange - preparação do cenário de teste
  await app.mission.loginPage.go()
  await app.mission.loginPage.login(email, password) // mesmos valores de register.spec.ts
  await expect(app.mission.navbar.logout).toBeVisible()
})

test('Não cadastrar missão com código já existente', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '2028-01-27',
    price: 1000.00
  }

  // Arrange - preparação do cenário de teste
  await cleanAndInsertMission(mission)

  // Act - execução da ação a ser testada
  await app.mission.dashPage.addButton.click()
  await app.mission.registerPage.submit(mission)

  // Assert - verificação do resultado esperado
  await expect(app.mission.registerPage.alert).toHaveText('Já existe uma missão com este ID.')
})

test.afterEach(async () => {
  await cleanMission({
    id: 'LP-3001A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '2028-01-27',
    price: 1000.00
  })
})
```

As credenciais de login não estão nesta skill: copie os valores já usados em `playwright/e2e/mission-control/register.spec.ts`.

## 6. O que observar

- O título é o nome do cenário, palavra por palavra (diferente dos títulos `deve ...` já existentes no arquivo).
- Há exatamente uma asserção para o **Então**.
- A missão é exclusiva, inserida antes e removida depois, mesmo se o teste falhar.
- O teste usa `{ app }` e importa `test`/`expect` de `../../support`.
- "Já existe uma missão com este ID." veio da tela (e já aparece em `register.spec.ts`); se o Gherkin não trouxer o texto exato, registre no resumo como texto observado.
- Rodar com `--project=mission-control`.
