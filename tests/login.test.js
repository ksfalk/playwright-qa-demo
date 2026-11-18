import { test, expect } from '@playwright/test';

test.describe('Авторизация', () => {
    let standardUser, lockedUser, lockedText
    test.beforeEach(async ({ page }) => {
        const users = require('../fixtures/authValues.json')
        standardUser = users.standardUser
        lockedUser = users.lockedUser
        lockedText = 'Epic sadface: Sorry, this user has been locked out.'
        await page.goto('/')
    });

    test('Авторизация стандартного пользователя', async ({ page }) => {
        await page.getByTestId('username').fill(standardUser.username)
        await page.getByTestId('password').fill(standardUser.password)
        await page.getByTestId('login-button').click()
        await page.waitForURL('/inventory.html')
        expect(page.getByTestId('inventory-container')).toBeVisible
    })

    test('Авторизация заблокированного пользователя', async ({ page }) => {
        await page.getByTestId('username').fill(lockedUser.username)
        await page.getByTestId('password').fill(lockedUser.password)
        await page.getByTestId('login-button').click()
        expect(page.getByTestId('error')).toBeVisible
        expect(page.getByTestId('error')).toContainText(lockedText)
    })

})