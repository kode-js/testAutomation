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
    readonly boardQuickViewSection: Locator;

    readonly closingCashBalanceTile: Locator;
    readonly cashTrendTile: Locator;
    readonly moneyInTile: Locator;
    readonly moneyOutTile: Locator

    readonly balanceSummaryTile: Locator;
    readonly transactionSummaryTile: Locator;
    readonly availableBalancesTile: Locator;
    readonly topInboundCashSourcesTile: Locator;
    readonly topOutboundCashSourcesTile: Locator;

    readonly dailyButton: Locator;
    readonly weeklyButton: Locator;
    readonly monthlyButton: Locator;

    readonly datePickerInput: Locator;
    readonly datePickerDropdown: Locator;
    readonly datePickerPreviousMonthButton: Locator;
    readonly datePickerNextMonthButton: Locator;
    readonly datePickerDay10Cell: Locator;

    readonly balanceSummaryChart: Locator;
    readonly closingBalanceLabel: Locator;
    readonly chartSelectedValue: Locator;
    readonly chartContainer: Locator;

    readonly topOutboundCashDestinationsCheck: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLogo = page.locator('header #dashboard');
        this.headerBrandText = page.locator('xpath=//header//h2[text()="Business Online Banking"]');
        this.bankingDashboardLink = page.locator('xpath=//aside//span[text()="Banking Dashboard"]');
        this.appDashboardLink = page.locator('xpath=//aside//span[text()="App Dashboard"]');
        this.tourButton = page.locator('xpath=//aside//span[text()="Tour"]');
        this.settingsButton = page.locator('xpath=//aside//span[text()="Settings"]');
        this.accountsHeaderButton = page.locator("xpath=//header//span[text()='Accounts']");
        this.closingCashBalanceTile = page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Closing cash balance']]");
        this.cashTrendTile = page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Cash trend']]");
        this.moneyInTile = page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Money in']]");
        this.moneyOutTile = page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Money out']]");
        this.balanceSummaryTile = page.locator('#banking-banking-balance-summary');
        this.transactionSummaryTile = page.locator('#banking-banking-transaction-summary');
        this.availableBalancesTile = page.locator('#banking-banking-account-balances');
        this.topInboundCashSourcesTile = page.locator('#banking-banking-top5-inbound-payees');
        this.topOutboundCashSourcesTile = page.locator('#banking-banking-top5-outbound-payees');
        this.dailyButton = page.locator("xpath=//button[.//span[text()='Daily']]");
        this.weeklyButton = page.locator("xpath=//button[.//span[text()='Weekly']]");
        this.monthlyButton = page.locator("xpath=//button[.//span[text()='Monthly']]");
        this.boardQuickViewSection = page.locator('div.board__quick-view');
        this.balanceSummaryChart = page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[@class='chart-wrapper']");
        this.closingBalanceLabel = page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[contains(@title,'Closing balance as of')]");
        this.chartSelectedValue = page.locator("xpath=//div[@id='banking-banking-balance-summary']//*[@class='tick-value selected']");
        this.chartContainer = page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[@id='area-chart-container-0banking']");
        this.datePickerInput = page.locator("xpath=//input[@id='date']");
        this.datePickerDropdown = page.locator("xpath=//div[contains(@class,'datePicker__Dropdown')]");
        this.datePickerPreviousMonthButton = page.locator("xpath=//button[@aria-label='Go to the Previous Month']");
        this.datePickerNextMonthButton = page.locator("xpath=//button[@aria-label='Go to the Next Month']");
        this.datePickerDay10Cell = page.locator("xpath=//button[@class='rdp-day_button' and text()='10']");
        this.topOutboundCashDestinationsCheck = page.locator("xpath=//div[@id='barhorizontal-chart-container-1banking']//*[contains(text(), 'CHECK')]");

    }
}