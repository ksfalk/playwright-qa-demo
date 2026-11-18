import { expect } from '@playwright/test'

export class LoginPage {
    constructor(page) {
        this.page = page
        this.url ='/'
        this.username = page.getByTestId('username')
        this.password = page.getByTestId('password')
        this.loginButton = page.getByTestId('login-button')
        this.errorContainer = page.getByTestId('error')
    }

    async setUsername(username){
        await this.username.clear()
        await this.username.fill(username)
    }

    async setPassword(password) {
        await this.password.clear()
        await this.password.fill(password)
    }

    async clickLoginButton() {
        expect (this.loginButton).toBeVisible
        await this.loginButton.click()
    }

    async checkSucceedLogin() {
        await expect (this.page).toHaveURL('/inventory.html')
        expect(this.page.getByTestId('inventory-container')).toBeVisible
    }

    async checkErrorLogin(messages) {
        expect(this.page.getByTestId('error')).toBeVisible
        await expect(this.errorContainer).toContainText(messages)
    }
}