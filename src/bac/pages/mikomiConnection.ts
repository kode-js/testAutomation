import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class MikomiPage {
    readonly page: Page;
    readonly termsNextButton: UiElement;
    readonly allAccontsCheckboxes: UiElement;
    readonly accountsApproveButton: UiElement;
    readonly allAccountBalances: UiElement;
    readonly totalAccountBalance: UiElement;
    readonly successBanner: UiElement;
    readonly nonEligibleAccountsBanner: UiElement;
    readonly loadingSpinner: UiElement;

    constructor(page: Page) {
        this.page = page;
        this.termsNextButton = UiElement.of(page.locator('button#terms-next'), 'Terms Next button');
        this.allAccontsCheckboxes = UiElement.of(page.locator("//input[@type='checkbox' and @name='account']/.."), 'All accounts checkboxes');
        this.accountsApproveButton = UiElement.of(page.locator('button#accounts-approve'), 'Accounts approve button');
        this.allAccountBalances = UiElement.of(page.locator("//div[contains(@class,'account__balance')]"), 'All account balances');
        this.totalAccountBalance = UiElement.of(page.locator("//div[@class='accountsDrawer__summary-value']"), 'Total account balance');
        this.successBanner = UiElement.of(page.locator("//div[contains(@class,'alert-success')]//div[text()='Your eligible Akoya Mikomo account(s) are successfully connected.']"), 'Success banner');
        this.nonEligibleAccountsBanner = UiElement.of(page.locator("//div[contains(@class,'alert-warning')]//div[text()='You have attempted to connect a non-eligible account(s). Only checking and savings accounts can be connected to the dashboard.']"), 'Non-eligible accounts banner');
        this.loadingSpinner = UiElement.of(page.locator("//div[@aria-label='Loading' and @role='alert']"), 'Loading spinner');
    }
    
}