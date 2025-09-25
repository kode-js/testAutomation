import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;  
    readonly mikomoUsername: Locator;
    readonly mikomoPassword: Locator;
    readonly mikomoSignInButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#login');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button:has-text("Log in")');
        this.mikomoUsername = page.locator("//input[@type='text' and contains(@class,'LoginContent')]");
        this.mikomoPassword = page.locator("//input[@type='password' and contains(@class,'LoginContent')]");
        this.mikomoSignInButton = page.locator("//button[@type='submit' and contains(text(),'Sign in')]");
    }
    
    async navigate() {
        await this.page.goto('https://bac-uat.9spokes.io/dex/signin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async mikomoLogin(username: string, password: string) {
        await this.mikomoUsername.fill(username);
        await this.mikomoPassword.fill(password);
        await this.mikomoSignInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}