import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class MerchantTransactionsPage {
    readonly page: Page;
    //Transactions Tab Locators
    readonly tabTransactions: UiElement;
    readonly labelTransactions: UiElement;
    readonly btnAccountsDrawer: UiElement;
    readonly quickViewTile_RunningTotal: UiElement;
    readonly quickViewTile_NoOfTransactions: UiElement;
    readonly quickViewTile_TotalRefunds: UiElement;
    readonly quickViewTile_BusiestTradingDay: UiElement;
    readonly chartTile_NetSales: UiElement;
    readonly chart_NetSales: UiElement;
    readonly netSalesLabel: UiElement;
    readonly previousYearNetSalesLabel: UiElement;
    readonly netsalesSelectedChartValue: UiElement;

    readonly chartTile_Transactions: UiElement;
    readonly button_chartTile_Transactions_Filters: UiElement;
    readonly button_chartTile_Transactions_ExportToCSV: UiElement;
    readonly columnHeader_chartTile_Transactions_DateTime: UiElement;
    readonly columnHeader_chartTile_Transactions_Amount: UiElement;
    readonly columnHeader_chartTile_Transactions_TransactionType: UiElement;
    readonly columnHeader_chartTile_Transactions_CardType: UiElement;
    readonly columnHeader_chartTile_Transactions_PaymentStatus: UiElement;
    readonly columnHeader_chartTile_Transactions_Details: UiElement;
    
    
    constructor(page: Page) {
        this.page = page;
        this.tabTransactions = UiElement.of(page.locator('#MenuLink-transactions'), 'Transactions tab');
        this.labelTransactions = UiElement.of(page.locator("xpath=//h1[span[text()='Transactions']]"), 'Transactions label');
        this.btnAccountsDrawer = UiElement.of(page.locator('#open-accounts-drawer'), 'Accounts drawer button');
        this.quickViewTile_RunningTotal = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Running total']]"), 'Running total tile');
        this.quickViewTile_NoOfTransactions = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='No. transactions']]"), 'No. transactions tile');
        this.quickViewTile_TotalRefunds = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Total refunds']]"), 'Total refunds tile');
        this.quickViewTile_BusiestTradingDay = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Busiest trading day']]"), 'Busiest trading day tile');
        this.chartTile_NetSales = UiElement.of(page.locator("xpath=//div[contains(@class,'chart-tile') and .//span[text()='Net sales']]"), 'Net sales chart tile');
        this.chart_NetSales = UiElement.of(this.chartTile_NetSales.locator.locator("xpath=//div[@id='merchant-net-sales']"), 'Net sales chart');
        this.netSalesLabel = UiElement.of(page.locator("xpath=//div[starts-with(text(),'Net sales, on')]"), 'Net sales label');
        this.previousYearNetSalesLabel = UiElement.of(page.locator("xpath=//div[starts-with(text(),'Previous year net sales, on')]"), 'Previous year net sales label');
        this.netsalesSelectedChartValue = UiElement.of(page.locator("xpath=//div[@id='merchant-net-sales']//*[@class='tick-value selected']"), 'Net sales selected chart value');
        
        this.chartTile_Transactions = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]"), 'Transactions chart tile');
        this.button_chartTile_Transactions_Filters = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//button[.//span[text()='Filters']]"), 'Transactions filters button');
        this.button_chartTile_Transactions_ExportToCSV = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//button[.//span[text()='Export to CSV']]"), 'Transactions export to CSV button');
        this.columnHeader_chartTile_Transactions_DateTime = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Date/Time']"), 'Transactions date/time header');
        this.columnHeader_chartTile_Transactions_Amount = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Amount']"), 'Transactions amount header');
        this.columnHeader_chartTile_Transactions_TransactionType = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Transaction type']"), 'Transactions type header');
        this.columnHeader_chartTile_Transactions_CardType = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Card type']"), 'Transactions card type header');
        this.columnHeader_chartTile_Transactions_PaymentStatus = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Payment status']"), 'Transactions payment status header');
        this.columnHeader_chartTile_Transactions_Details = UiElement.of(page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Details']"), 'Transactions details header');

    }

    getDespositeByNumber(depositeNumber: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@role='listbox']/div[@role='option' and text()='${depositeNumber}']`), `Deposit option ${depositeNumber}`);
    }
}