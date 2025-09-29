import { expect, type Locator, type Page } from '@playwright/test';

export class AccountsCanvas {
    readonly page: Page;
    readonly accontsOffcanvasTitle: Locator;
    readonly accountsCanvasCloseButton: Locator;
    readonly bankingTab: Locator;
    readonly appsTab: Locator;
    readonly searchMoreBanksTxt: Locator;
    readonly popularBanksLabel: Locator;
    readonly listOfBanks: Locator;
    readonly bankHeaderTitle: Locator;
    readonly canvasCancelButton: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly proceedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accontsOffcanvasTitle = page.locator("xpath=//div[contains(@class,'offcanvas-title') and text()='Accounts']");
        this.accountsCanvasCloseButton = page.locator("xpath=//span[@id='close-accounts-drawer']");
        this.bankingTab = page.locator("xpath=//button[@role='tab' and text()='Banking']");
        this.appsTab = page.locator("xpath=//button[@role='tab' and text()='Apps']");
        this.searchMoreBanksTxt = page.locator("xpath=//input[@placeholder='Search more banks']");
        this.popularBanksLabel = page.locator("xpath=//p[text()='Popular banks']");
        this.listOfBanks = page.locator("xpath=//p[text()='Popular banks']/following-sibling::button//div[@class='dataConnector__app-name']");
        this.bankHeaderTitle = page.locator("xpath=//div[@class='offcanvas-body']//div[@class='wizard__header-title']/div[@class='name']");
        this.canvasCancelButton = page.locator("xpath=//div[@class='offcanvas-body']//span[text()='Cancel']");
        this.termsAndConditionsCheckbox = page.locator("xpath=//input[@type='checkbox' and @id='tandc']");
        this.proceedButton = page.locator("xpath=//button[.//span[text()='Proceed']]");
    }

    // method which return bank button locator based on bank name
    getBankByName(bankName: string): Locator {
        return this.page.locator(`xpath=//p[text()='Popular banks']/following-sibling::button[div[div[@class='dataConnector__app-name' and text()='${bankName}']]]`);
    }
}