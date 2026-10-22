import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/storefront/home.page'

test('deve exibir o título na aba do navegador', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.go()

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lunar Pass /)
})

test('deve exibir o slogan na homepage', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.go()

  const slogan = homePage.slogan
  await expect(slogan).toBeVisible()
})



