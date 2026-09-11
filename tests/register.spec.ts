import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { LoginPage } from '../pages/login.page'

import { DashPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'

import { Navbar } from '../pages/components/navbar'
import { Toast } from '../pages/components/toast'


import { Mission } from '../support/mission'

import { deleteMission, deleteReservation, deleteTicket, insertMission } from '../support/db'



let loginPage: LoginPage
let dashPage: DashPage
let registerPage: RegisterPage
let toast: Toast
let navbar: Navbar


test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page)
  navbar = new Navbar(page)
  dashPage = new DashPage(page)
  registerPage = new RegisterPage(page)
  toast = new Toast(page)

  // Arrange - preparação do cenário de teste
  await loginPage.go()
  await loginPage.login('buzz@lunarpass.dev', 'pwd123')
  await expect(navbar.logout).toBeVisible()
})





test('deve cadastrar uma nova missão', async ({ page }) => {


  const mission: Mission = {
    id: 'LP-' + faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }



  await dashPage.addButton.click()
  await expect(registerPage.title).toBeVisible()


  await registerPage.submit(mission)
  await expect(toast.message).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})


test('não deve cadastrar com código de missão incorreto', async ({ page }) => {


  const mission: Mission = {
    id: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }




  await dashPage.addButton.click()
  await expect(registerPage.title).toBeVisible()


  await registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText('Use o formato LP-0000')
})


test('não deve cadastrar com código duplicado', async ({ page }) => {

  //Arrange - preparação do cenário de teste
  const mission: Mission = {
    id: 'LP-DUP01',
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }

  
  await deleteReservation(mission.id)
  await deleteTicket(mission.id)
  await deleteMission(mission.id)
  await insertMission(mission.id)

  //Act - ação do teste
  await dashPage.addButton.click()
  await expect(registerPage.title).toBeVisible()

  //Assert - verificação do resultado esperado
  await registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText('Já existe uma missão com este ID.')

})





