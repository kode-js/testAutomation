import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly termsNextButton: Locator;
    readonly allAccontsCheckboxes: Locator;
    readonly accountsApproveButton: Locator;
    readonly allAccountBalances: Locator;
    readonly totalAccountBalance: Locator;
    constructor(page: Page) {
        this.page = page;
        this.termsNextButton = page.locator('button#terms-next');
        this.allAccontsCheckboxes = page.locator("//input[@type='checkbox' and @name='account']");
        this.accountsApproveButton = page.locator('button#accounts-approve');
        this.allAccountBalances = page.locator("//div[contains(@class,'account__balance')]");
        this.totalAccountBalance = page.locator("//div[@class='accountsDrawer__summary-value']");
    }
    
}