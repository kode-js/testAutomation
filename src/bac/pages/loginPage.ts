import { expect, type Locator, type Page } from '@playwright/test';
const baseURL = process.env.BASE_URL;

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
        await this.page.goto('/dex/signin');
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

    async getBankLoginUsername(bankName: string){
        //Switch case to return locator based on bank name
        switch(bankName) {
            case 'Akoya Mikomo bank':
                return this.mikomoUsername;
            case 'Capital One':
                return this.page.locator("//input[@id='usernameInputField']");
            case 'Citibank':
                return this.page.locator("//input[@id='userid_input_mask']");
            case 'Citizens':
                return this.page.locator("//input[@id='form-user-id']");
            case 'JPMorgan Chase':
                return this.page.locator("#logonDialog");
            case 'KeyBank':
                return this.page.locator("//input[@id='ibx-user-id-input']");
            case 'PNC Bank':
                return this.page.locator("//input[@id='signonUserId']");
            case 'TD Bank':
                return this.page.locator("//input[@name='psudoUsername']");
            case 'U.S. Bank':
                return this.page.locator("//input[@id='input_aw-personal-id']");
            case 'Wells Fargo':
                return this.page.locator("//input[@id='j_username']");
            default:
                throw new Error(`Bank ${bankName} not found`);
        }
    }
}