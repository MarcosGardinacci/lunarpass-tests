import { test, expect } from '../../support'




test.beforeEach(async ({ app }) => {


  // Arrange - preparação do cenário de teste
  await app.loginPage.go()
})


test('deve autenticar no controle de missões', async ({ app }) => {


  // Act - execução da ação a ser testada
  await app.loginPage.login('buzz@lunarpass.dev', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect(app.navbar.logout).toBeVisible()

})


test('não deve autenticar com senha incorreta', async ({ app }) => {



  // Act - execução da ação a ser testada
  await app.loginPage.login('buzz@lunarpass.dev', 'abv123')


  // Assert - verificação do resultado esperado

  await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')

})


test('não deve autenticar com email não cadastrado', async ({ app }) => {


  // Act - execução da ação a ser testada
  await app.loginPage.login('404buzz@lunarpass.dev', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')


})


test('não deve cadastrar quando a senha não é informada', async ({ app }) => {


  // Act - execução da ação a ser testada
  await app.loginPage.login('404buzz@lunarpass.dev', '')


  // Assert - verificação do resultado esperado
  await expect(app.loginPage.alert).toHaveText('Informe a senha')


})

test('não deve cadastrar quando o email não é informado', async ({ app }) => {


  // Act - execução da ação a ser testada
  await app.loginPage.login('', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect(app.loginPage.alert).toHaveText('Informe um e-mail válido')


})


test('não deve cadastrar quando o email não é informado e nem a senha', async ({ app }) => {


  // Act - execução da ação a ser testada
  await app.loginPage.login('', '')


  // Assert - verificação do resultado esperado
  await expect(app.loginPage.alert).toHaveText('Informe um e-mail válido')


})