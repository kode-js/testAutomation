import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly bankingDashboardLink: Locator;
    readonly appDashboardLink: Locator;
    readonly homeLogo: Locator;
    readonly headerBrandText: Locator;
    readonly tourButton: Locator;
    readonly settingsButton: Locator;
    readonly accountsHeaderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLogo = page.locator('header #dashboard');
        this.headerBrandText = page.locator('xpath=//header//h2[text()="Business Online Banking"]');
        this.bankingDashboardLink = page.locator('xpath=//aside//span[text()="Banking Dashboard"]');
        this.appDashboardLink = page.locator('xpath=//aside//span[text()="App Dashboard"]');
        this.tourButton = page.locator('xpath=//aside//span[text()="Tour"]');
        this.settingsButton = page.locator('xpath=//aside//span[text()="Settings"]');
        this.accountsHeaderButton = page.locator("//header//span[text()='Accounts']");
    }
}