import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page' 
import { Navbar } from '../pages/components/navbar'


let loginPage: LoginPage
let navbar: Navbar


test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    navbar = new Navbar(page)

  // Arrange - preparação do cenário de teste
  await loginPage.go()
 })


test('deve autenticar no controle de missões', async ({ page }) => {
 

  // Act - execução da ação a ser testada
  await loginPage.login('buzz@lunarpass.dev', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect (navbar.logout).toBeVisible()

})


test('não deve autenticar com senha incorreta', async ({ page }) => {



  // Act - execução da ação a ser testada
  await loginPage.login('buzz@lunarpass.dev', 'abv123')

  
  // Assert - verificação do resultado esperado
  
  await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')

})


test('não deve autenticar com email não cadastrado', async ({ page }) => {


  // Act - execução da ação a ser testada
  await loginPage.login('404buzz@lunarpass.dev', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
  

})


test('não deve cadastrar quando a senha não é informada', async ({ page }) => {


  // Act - execução da ação a ser testada
  await loginPage.login('404buzz@lunarpass.dev', '')


  // Assert - verificação do resultado esperado
  await expect(loginPage.alert).toHaveText('Informe a senha')

  
})

test('não deve cadastrar quando o email não é informado', async ({ page }) => {

 
  // Act - execução da ação a ser testada
  await loginPage.login('', 'pwd123')


  // Assert - verificação do resultado esperado
  await expect(loginPage.alert).toHaveText('Informe um e-mail válido')

  
})


test('não deve cadastrar quando o email não é informado e nem a senha', async ({ page }) => {

 
  // Act - execução da ação a ser testada
  await loginPage.login('', '')


  // Assert - verificação do resultado esperado
  await expect(loginPage.alert).toHaveText('Informe um e-mail válido')

  
})