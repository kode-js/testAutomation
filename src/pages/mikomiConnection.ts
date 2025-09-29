import { expect, type Locator, type Page } from '@playwright/test';

export class MikomiPage {
    readonly page: Page;
    readonly termsNextButton: Locator;
    readonly allAccontsCheckboxes: Locator;
    readonly accountsApproveButton: Locator;
    readonly allAccountBalances: Locator;
    readonly totalAccountBalance: Locator;
    readonly successBanner: Locator;
    readonly nonEligibleAccountsBanner: Locator;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.termsNextButton = page.locator('button#terms-next');
        this.allAccontsCheckboxes = page.locator("//input[@type='checkbox' and @name='account']/..");
        this.accountsApproveButton = page.locator('button#accounts-approve');
        this.allAccountBalances = page.locator("//div[contains(@class,'account__balance')]");
        this.totalAccountBalance = page.locator("//div[@class='accountsDrawer__summary-value']");
        this.successBanner = page.locator("//div[text()='Your eligible Akoya Mikomo account(s) are successfully connected.' and contains(@class,'alert-success')]");
        this.nonEligibleAccountsBanner = page.locator("//div[text()='You have attempted to connect a non-eligible account(s). Only checking and savings accounts can be connected to the dashboard.' and contains(@class,'alert-warning')]");
        this.loadingSpinner = page.locator("//div[@aria-label='Loading' and @role='alert']");
    }
    
}