import { type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';


export class AccountsCanvas {
    readonly page: Page;
    readonly accontsOffcanvasTitle: UiElement;
    readonly accountsCanvasCloseButton: UiElement;
    readonly bankingTab: UiElement;
    readonly appsTab: UiElement;
    readonly searchMoreBanksTxt: UiElement;
    readonly popularBanksLabel: UiElement;
    readonly listOfBanks: UiElement;
    readonly bankHeaderTitle: UiElement;
    readonly canvasCancelButton: UiElement;
    readonly termsAndConditionsCheckbox: UiElement;
    readonly proceedButton: UiElement;
    readonly confirmRemoveButton: UiElement;

    constructor(page: Page) {
        this.page = page;
        this.accontsOffcanvasTitle = UiElement.of(page.locator("xpath=//div[contains(@class,'offcanvas-title') and text()='Accounts']"), 'Accounts offcanvas title');
        this.accountsCanvasCloseButton = UiElement.of(page.locator("xpath=//span[@id='close-accounts-drawer']"), 'Accounts canvas close button');
        this.bankingTab = UiElement.of(page.locator("xpath=//button[@role='tab' and text()='Banking']"), 'Banking tab');
        this.appsTab = UiElement.of(page.locator("xpath=//button[@role='tab' and text()='Apps']"), 'Apps tab');
        this.searchMoreBanksTxt = UiElement.of(page.locator("xpath=//input[@placeholder='Search more banks']"), 'Search more banks input');
        this.popularBanksLabel = UiElement.of(page.locator("xpath=//p[text()='Popular banks']"), 'Popular banks label');
        this.listOfBanks = UiElement.of(page.locator("xpath=//p[text()='Popular banks']/following-sibling::button//div[@class='dataConnector__app-name']"), 'Popular banks list items');
        this.bankHeaderTitle = UiElement.of(page.locator("xpath=//div[@class='offcanvas-body']//div[@class='wizard__header-title']/div[@class='name']"), 'Bank header title');
        this.canvasCancelButton = UiElement.of(page.locator("xpath=//div[@class='offcanvas-body']//span[text()='Cancel']"), 'Canvas cancel button');
        this.termsAndConditionsCheckbox = UiElement.of(page.locator("xpath=//input[@type='checkbox' and @id='tandc']"), 'Terms and Conditions checkbox');
        this.proceedButton = UiElement.of(page.locator("xpath=//button[.//span[text()='Proceed']]"), 'Proceed button');
        this.confirmRemoveButton = UiElement.of(page.locator("xpath=//div[@class='modal-content']//span[text()='Remove']"), 'Confirm remove button');
    }

    // method which return bank button locator based on bank name
    getBankByName(bankName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//p[text()='Popular banks']/following-sibling::button[div[div[@class='dataConnector__app-name' and text()='${bankName}']]]`), `Bank button: ${bankName}`);
    }

    removeButtonByBankName(bankName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//h2[.//*[text()='${bankName}']]/..//span[text()='Remove']`), `Remove button for ${bankName}`);
    }

    toggleButtonByAccountName(accountName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[.//div[text()='${accountName}'] and @class='account']//input[@type='checkbox']`), `Toggle checkbox for account ${accountName}`);
    }

    accountBalanceByAccountName(accountName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[.//div[text()='${accountName}'] and @class='account']//div[contains(@class,'account__balance')]`), `Account balance for ${accountName}`);
    }
}