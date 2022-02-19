const { test, expect } = require('@playwright/test')
//const { chromium } = require('playwright');
const user = require('../user')

test('Should be successful authorization', async ({ page }) => {
    await page.goto('https://netology.ru/')
    await page.screenshot({ path: 'Screenshot/Successful1.png' })
    await page.click('text=Войти')
    await expect(page).toHaveURL('https://netology.ru/?modal=sign_in')
    await page.click('[placeholder="Email"]')
    await page.fill('[placeholder="Email"]', user.mail)
    await page.click('[placeholder="Пароль"]')
    await page.fill('[placeholder="Пароль"]', user.password)
    await page.click('text=Войти')
    await page.screenshot({ path: 'Screenshot/Successful2.png' })
    //const content = page.locator('.components-pages-Profile-Programs--title--NCjbp')
    //await expect(content).toHaveText('Мои курсы и профессии')
    await expect(page.locator('text=Мои курсы и профессии')).toBeVisible()
    await page.screenshot({ path: 'Screenshot/Successful3.png' })
})

test('Should be unsuccessful authorization', async ({ page }) => {
    //const browser = chromium.launch();
    //const page = await browser.newPage();
    await page.goto('https://netology.ru/')
    await page.screenshot({ path: 'Screenshot/Unsuccessful1.png' })
    await page.click('text=Войти')
    await expect(page).toHaveURL('https://netology.ru/?modal=sign_in')
    await page.click('[placeholder="Email"]')
    await page.fill('[placeholder="Email"]', 'user@mail.ru')
    await page.click('[placeholder="Пароль"]')
    await page.fill('[placeholder="Пароль"]', 'pass')
    await page.click('text=Войти')
    await page.screenshot({ path: 'Screenshot/Unsuccessful2.png' })
    //const content = page.locator('div.components-ui-Form-Hint--hint--A2dPV inputHint');
    //await expect(content).toHaveText('Вы ввели неправильно логин или пароль');
    await expect(
        page.locator('text=Вы ввели неправильно логин или пароль')
    ).toBeVisible()
    await page.screenshot({ path: 'Screenshot/Unsuccessful3.png' })
})
