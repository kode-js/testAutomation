import { expect, type Locator, type Page } from '@playwright/test';
const baseURL = process.env.BASE_URL;

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;  
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#login');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button:has-text("Log in")');
       
    }
    
    async navigate() {
        await this.page.goto('/dex/signin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}