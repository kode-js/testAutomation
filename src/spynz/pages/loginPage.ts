import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';
import * as actions from '../../utils/actions';
const baseURL = process.env.BASE_URL;

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: UiElement;
    readonly passwordInput: UiElement;
    readonly loginButton: UiElement;  
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = UiElement.of(page.locator('#login'), 'Username input');
        this.passwordInput = UiElement.of(page.locator('#password'), 'Password input');
        this.loginButton = UiElement.of(page.locator('button:has-text("Log in")'), 'Log in button');
       
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
}