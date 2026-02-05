import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class HomePage {
    readonly page: Page;
    readonly bankingDashboardLink: UiElement;
    readonly appDashboardLink: UiElement;
    readonly homeLogo: UiElement;
    readonly headerBrandText: UiElement;
    readonly tourButton: UiElement;
    readonly settingsButton: UiElement;
    readonly accountsHeaderButton: UiElement;
    readonly boardQuickViewSection: UiElement;

    readonly closingCashBalanceTile: UiElement;
    readonly cashTrendTile: UiElement;
    readonly moneyInTile: UiElement;
    readonly moneyOutTile: UiElement;

    readonly balanceSummaryTile: UiElement;
    readonly transactionSummaryTile: UiElement;
    readonly availableBalancesTile: UiElement;
    readonly topInboundCashSourcesTile: UiElement;
    readonly topOutboundCashSourcesTile: UiElement;

    readonly dailyButton: UiElement;
    readonly weeklyButton: UiElement;
    readonly monthlyButton: UiElement;

    readonly datePickerInput: UiElement;
    readonly datePickerDropdown: UiElement;
    readonly datePickerPreviousMonthButton: UiElement;
    readonly datePickerNextMonthButton: UiElement;
    readonly datePickerDay10Cell: UiElement;

    readonly balanceSummaryChart: UiElement;
    readonly closingBalanceLabel: UiElement;
    readonly chartSelectedValue: UiElement;
    readonly chartContainer: UiElement;

    readonly topOutboundCashDestinationsCheck: UiElement;

    constructor(page: Page) {
        this.page = page;
        this.homeLogo = UiElement.of(page.locator('header #dashboard'), 'Home logo');
        this.headerBrandText = UiElement.of(page.locator('xpath=//header//h2[text()="Business Online Banking"]'), 'Header brand text');
        this.bankingDashboardLink = UiElement.of(page.locator('xpath=//aside//span[text()="Banking Dashboard"]'), 'Banking Dashboard link');
        this.appDashboardLink = UiElement.of(page.locator('xpath=//aside//span[text()="App Dashboard"]'), 'App Dashboard link');
        this.tourButton = UiElement.of(page.locator('xpath=//aside//span[text()="Tour"]'), 'Tour button');
        this.settingsButton = UiElement.of(page.locator('xpath=//aside//span[text()="Settings"]'), 'Settings button');
        this.accountsHeaderButton = UiElement.of(page.locator("xpath=//header//span[text()='Accounts']"), 'Accounts header button');
        this.closingCashBalanceTile = UiElement.of(page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Closing cash balance']]") , 'Closing cash balance tile');
        this.cashTrendTile = UiElement.of(page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Cash trend']]") , 'Cash trend tile');
        this.moneyInTile = UiElement.of(page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Money in']]") , 'Money in tile');
        this.moneyOutTile = UiElement.of(page.locator("xpath=//div[@class='quickview__tile' and .//*[text()='Money out']]") , 'Money out tile');
        this.balanceSummaryTile = UiElement.of(page.locator('#banking-banking-balance-summary'), 'Balance Summary tile');
        this.transactionSummaryTile = UiElement.of(page.locator('#banking-banking-transaction-summary'), 'Transaction Summary tile');
        this.availableBalancesTile = UiElement.of(page.locator('#banking-banking-account-balances'), 'Available Balances tile');
        this.topInboundCashSourcesTile = UiElement.of(page.locator('#banking-banking-top5-inbound-payees'), 'Top inbound cash sources tile');
        this.topOutboundCashSourcesTile = UiElement.of(page.locator('#banking-banking-top5-outbound-payees'), 'Top outbound cash sources tile');
        this.dailyButton = UiElement.of(page.locator("xpath=//button[.//span[text()='Daily']]") , 'Daily range button');
        this.weeklyButton = UiElement.of(page.locator("xpath=//button[.//span[text()='Weekly']]") , 'Weekly range button');
        this.monthlyButton = UiElement.of(page.locator("xpath=//button[.//span[text()='Monthly']]") , 'Monthly range button');
        this.boardQuickViewSection = UiElement.of(page.locator('div.board__quick-view'), 'Board quick view section');
        this.balanceSummaryChart = UiElement.of(page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[@class='chart-wrapper']"), 'Balance summary chart');
        this.closingBalanceLabel = UiElement.of(page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[contains(@title,'Closing balance as of')]"), 'Closing balance label');
        this.chartSelectedValue = UiElement.of(page.locator("xpath=//div[@id='banking-banking-balance-summary']//*[@class='tick-value selected']"), 'Chart selected value');
        this.chartContainer = UiElement.of(page.locator("xpath=//div[@id='banking-banking-balance-summary']//div[@id='area-chart-container-0banking']"), 'Chart container');
        this.datePickerInput = UiElement.of(page.locator("xpath=//input[@id='date']"), 'Date picker input');
        this.datePickerDropdown = UiElement.of(page.locator("xpath=//div[contains(@class,'datePicker__Dropdown')]") , 'Date picker dropdown');
        this.datePickerPreviousMonthButton = UiElement.of(page.locator("xpath=//button[@aria-label='Go to the Previous Month']"), 'Date picker previous month button');
        this.datePickerNextMonthButton = UiElement.of(page.locator("xpath=//button[@aria-label='Go to the Next Month']"), 'Date picker next month button');
        this.datePickerDay10Cell = UiElement.of(page.locator("xpath=//button[@class='rdp-day_button' and text()='10']"), 'Date picker day 10 cell');
        this.topOutboundCashDestinationsCheck = UiElement.of(page.locator("xpath=//div[@id='barhorizontal-chart-container-1banking']//*[contains(text(), 'CHECK')]"), 'Top outbound cash destinations check');

    }
}