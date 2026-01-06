import { expect, type Locator, type Page } from '@playwright/test';

export class MerchantPage {
    readonly page: Page;
    //Transactions Tab Locators
    readonly tabTransactions: Locator;
    readonly labelTransactions: Locator;
    readonly btnAccountsDrawer: Locator;
    readonly quickViewTile_RunningTotal: Locator;
    readonly quickViewTile_NoOfTransactions: Locator;
    readonly quickViewTile_TotalRefunds: Locator;
    readonly quickViewTile_BusiestTradingDay: Locator;
    readonly chartTile_NetSales: Locator;
    readonly chartTile_Transactions: Locator;
    readonly button_chartTile_Transactions_Filters: Locator;
    readonly button_chartTile_Transactions_ExportToCSV: Locator;
    readonly columnHeader_chartTile_Transactions_DateTime: Locator;
    readonly columnHeader_chartTile_Transactions_Amount: Locator;
    readonly columnHeader_chartTile_Transactions_TransactionType: Locator;
    readonly columnHeader_chartTile_Transactions_CardType: Locator;
    readonly columnHeader_chartTile_Transactions_PaymentStatus: Locator;
    readonly columnHeader_chartTile_Transactions_Details: Locator;
    
    //Settlements Tab Locators
    readonly tabSettlements: Locator;
    readonly labelSettlements: Locator;
    readonly chartTile_Settlements: Locator;
    readonly button_chartTile_Settlements_Filters: Locator;
    readonly button_chartTile_Settlements_ExportToCSV: Locator;
    readonly columnHeader_chartTile_Settlements_Date: Locator; 
    readonly columnHeader_chartTile_Settlements_SettlementAmount: Locator;
    readonly columnHeader_chartTile_Settlements_NoOfTransactions: Locator
    readonly columnHeader_chartTile_Settlements_DepositNo: Locator;
    readonly columnHeader_chartTile_Settlements_Details: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tabTransactions = page.locator('#MenuLink-transactions');
        this.tabSettlements = page.locator('#MenuLink-settlements');
        this.labelTransactions = page.locator("xpath=//h1[span[text()='Transactions']]");
        this.labelSettlements = page.locator("xpath=//h1[span[text()='Settlements']]");
        this.btnAccountsDrawer = page.locator('#open-accounts-drawer');
        this.quickViewTile_RunningTotal = page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Running total']]");
        this.quickViewTile_NoOfTransactions = page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='No. transactions']]");
        this.quickViewTile_TotalRefunds = page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Total refunds']]");
        this.quickViewTile_BusiestTradingDay = page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Busiest trading day']]");
        this.chartTile_NetSales = page.locator("xpath=//div[contains(@class,'chart-tile') and .//span[text()='Net sales']]");
        this.chartTile_Transactions = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]");    
        this.button_chartTile_Transactions_Filters = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Filters']]");
        this.button_chartTile_Transactions_ExportToCSV = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Export to CSV']]");
        this.columnHeader_chartTile_Transactions_DateTime = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Date/Time']");
        this.columnHeader_chartTile_Transactions_Amount = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Amount']");
        this.columnHeader_chartTile_Transactions_TransactionType = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Transaction Type']");
        this.columnHeader_chartTile_Transactions_CardType = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Card Type']");
        this.columnHeader_chartTile_Transactions_PaymentStatus = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Payment Status']");
        this.columnHeader_chartTile_Transactions_Details = this.chartTile_Transactions.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Details']");

        this.chartTile_Settlements = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]");    
        this.button_chartTile_Settlements_Filters = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Filters']]");
        this.button_chartTile_Settlements_ExportToCSV = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Export to CSV']]");
        this.columnHeader_chartTile_Settlements_Date = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Date']");
        this.columnHeader_chartTile_Settlements_SettlementAmount = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Settlement Amount']");
        this.columnHeader_chartTile_Settlements_NoOfTransactions = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='No. Transactions']");
        this.columnHeader_chartTile_Settlements_DepositNo = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Deposit no.']");
        this.columnHeader_chartTile_Settlements_Details = this.chartTile_Settlements.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Details']");
    }
}