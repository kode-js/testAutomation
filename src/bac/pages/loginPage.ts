import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';
import * as actions from '../../utils/actions';
const baseURL = process.env.BASE_URL;

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: UiElement;
    readonly passwordInput: UiElement;
    readonly loginButton: UiElement;  
    readonly mikomoUsername: UiElement;
    readonly mikomoPassword: UiElement;
    readonly mikomoSignInButton: UiElement;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = UiElement.of(page.locator('#login'), 'Username input');
        this.passwordInput = UiElement.of(page.locator('#password'), 'Password input');
        this.loginButton = UiElement.of(page.locator('button:has-text("Log in")'), 'Log in button');
        this.mikomoUsername = UiElement.of(page.locator("//input[@type='text' and contains(@class,'LoginContent')]"), 'Mikomo username input');
        this.mikomoPassword = UiElement.of(page.locator("//input[@type='password' and contains(@class,'LoginContent')]"), 'Mikomo password input');
        this.mikomoSignInButton = UiElement.of(page.locator("//button[@type='submit' and contains(text(),'Sign in')]"), 'Mikomo sign in button');
    }
    
    async navigate() {
        await this.page.goto('/dex/signin');
    }

    async login(username: string, password: string) {
        await actions.enterText(this.usernameInput, username);
        await actions.enterText(this.passwordInput, password);
        await actions.clickElement(this.loginButton);
        await this.page.waitForLoadState('networkidle');
    }

    async mikomoLogin(username: string, password: string) {
        await actions.enterText(this.mikomoUsername, username);
        await actions.enterText(this.mikomoPassword, password);
        await actions.clickElement(this.mikomoSignInButton);
        await this.page.waitForLoadState('networkidle');
    }

    async getBankLoginUsername(bankName: string){
        //Switch case to return locator based on bank name
        switch(bankName) {
            case 'Akoya Mikomo bank':
                return this.mikomoUsername;
            case 'Capital One':
                return UiElement.of(this.page.locator("//input[@id='usernameInputField']"), `Capital One username input`);
            case 'Citibank':
                return UiElement.of(this.page.locator("//input[@id='userid_input_mask']"), `Citibank username input`);
            case 'Citizens':
                return UiElement.of(this.page.locator("//input[@id='form-user-id']"), `Citizens username input`);
            case 'JPMorgan Chase':
                return UiElement.of(this.page.locator("#logonDialog"), `JPMorgan Chase login dialog`);
            case 'KeyBank':
                return UiElement.of(this.page.locator("//input[@id='ibx-user-id-input']"), `KeyBank username input`);
            case 'PNC Bank':
                return UiElement.of(this.page.locator("//input[@id='signonUserId']"), `PNC Bank username input`);
            case 'TD Bank':
                return UiElement.of(this.page.locator("//input[@name='psudoUsername']"), `TD Bank username input`);
            case 'U.S. Bank':
                return UiElement.of(this.page.locator("//input[@id='input_aw-personal-id']"), `U.S. Bank username input`);
            case 'Wells Fargo':
                return UiElement.of(this.page.locator("//input[@id='j_username']"), `Wells Fargo username input`);
            default:
                throw new Error(`Bank ${bankName} not found`);
        }
    }
}