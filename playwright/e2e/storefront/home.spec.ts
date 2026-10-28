import { test, expect } from '../../support'

test('deve exibir o título na aba do navegador', async ({ app, page }) => {
  await app.store.homePage.go()

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lunar Pass /)
})

test('deve exibir o slogan na homepage', async ({ app }) => {
  await app.store.homePage.go()

  const slogan = app.store.homePage.slogan
  await expect(slogan).toBeVisible()
})
