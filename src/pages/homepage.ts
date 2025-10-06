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

    readonly closingCashBalanceTile: Locator;
    readonly cashTrendTile: Locator;
    readonly moneyInTile: Locator;
    readonly moneyOutTile: Locator

    readonly balanceSummaryTile: Locator;
    readonly transactionSummaryTile: Locator;
    readonly availableBalancesTile: Locator;
    readonly topInboundCashSourcesTile: Locator;
    readonly topOutboundCashSourcesTile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLogo = page.locator('header #dashboard');
        this.headerBrandText = page.locator('xpath=//header//h2[text()="Business Online Banking"]');
        this.bankingDashboardLink = page.locator('xpath=//aside//span[text()="Banking Dashboard"]');
        this.appDashboardLink = page.locator('xpath=//aside//span[text()="App Dashboard"]');
        this.tourButton = page.locator('xpath=//aside//span[text()="Tour"]');
        this.settingsButton = page.locator('xpath=//aside//span[text()="Settings"]');
        this.accountsHeaderButton = page.locator("xpath=//header//span[text()='Accounts']");
        this.closingCashBalanceTile = page.locator("xpath=//div[@class='quickView__tile' and .//*[text()='Closing cash balance']]");
        this.cashTrendTile = page.locator("xpath=//div[@class='quickView__tile' and .//*[text()='Cash trend']]");
        this.moneyInTile = page.locator("xpath=//div[@class='quickView__tile' and .//*[text()='Money in']]");
        this.moneyOutTile = page.locator("xpath=//div[@class='quickView__tile' and .//*[text()='Money out']]");
        this.balanceSummaryTile = page.locator('#banking-banking-balance-summary');
        this.transactionSummaryTile = page.locator('#banking-banking-transaction-summary');
        this.availableBalancesTile = page.locator('#banking-banking-account-balances');
        this.topInboundCashSourcesTile = page.locator('#banking-banking-top5-inbound-payees');
        this.topOutboundCashSourcesTile = page.locator('#banking-banking-top5-outbound-payees');

    }
}