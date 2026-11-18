import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Авторизация', () => {
    let standardUser, lockedUser, loginPage, lockedError, requiredError, usernameError
    test.beforeEach(async ({ page }) => {
        const users = require('../fixtures/authValues.json')
        standardUser = users.standardUser
        lockedUser = users.lockedUser
        await page.goto('/')
        loginPage = new LoginPage(page)
        lockedError = 'Epic sadface: Sorry, this user has been locked out.'
        requiredError = 'Epic sadface: Password is required'
        usernameError = 'Epic sadface: Username and password do not match any user in this service'
    });

    test('Авторизация стандартного пользователя', async () => {
        await loginPage.setUsername(standardUser.username)
        await loginPage.setPassword(standardUser.password)
        await loginPage.clickLoginButton()
        await loginPage.checkSucceedLogin()
    })

    test('Авторизация заблокированного пользователя', async () => {
        await loginPage.setUsername(lockedUser.username)
        await loginPage.setPassword(lockedUser.password)
        await loginPage.clickLoginButton()
        await loginPage.checkErrorLogin(lockedError)
    })

    test('Авторизация без указания пароля', async () => {
        await loginPage.setUsername(standardUser.username)
        await loginPage.clickLoginButton()
        await loginPage.checkErrorLogin(requiredError)
    })

    test('Авторизация с неверным логином', async () => {
        await loginPage.setUsername('username')
        await loginPage.setPassword('password')
        await loginPage.clickLoginButton()
        await loginPage.checkErrorLogin(usernameError)
    })
})