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
    readonly settlementsTable_FirstDepositNo: Locator;
    readonly findDeposites: Locator;
    readonly viewResultsButton: Locator;
    readonly exportToCSVButton : Locator;
    readonly closeButton: Locator;
    readonly viewTransactionDetailsButton: Locator;

    readonly filteredSettlementAmount: Locator;
    readonly filteredSettlementDate: Locator;
    readonly filteredNoOfTransactions: Locator;

    readonly detailsSettlementDate: Locator;
    readonly detailsSettlementAmount: Locator;
    readonly detailsNoOfTransactions: Locator;

    readonly allTransactionRows: Locator;
    readonly allTransactionAmounts: Locator;
    
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
        this.button_chartTile_Transactions_Filters = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Filters']]");
        this.button_chartTile_Transactions_ExportToCSV = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Export to CSV']]");
        this.columnHeader_chartTile_Transactions_DateTime = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Date/Time']");
        this.columnHeader_chartTile_Transactions_Amount = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Amount']");
        this.columnHeader_chartTile_Transactions_TransactionType = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Transaction type']");
        this.columnHeader_chartTile_Transactions_CardType = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Card type']");
        this.columnHeader_chartTile_Transactions_PaymentStatus = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Payment status']");
        this.columnHeader_chartTile_Transactions_Details = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Details']");

        this.chartTile_Settlements = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]");    
        this.button_chartTile_Settlements_Filters = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Filters']]");
        this.button_chartTile_Settlements_ExportToCSV = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Export to CSV']]");
        this.columnHeader_chartTile_Settlements_Date = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Date']");
        this.columnHeader_chartTile_Settlements_SettlementAmount = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Settlement amount']");
        this.columnHeader_chartTile_Settlements_NoOfTransactions = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='No. transactions']");
        this.columnHeader_chartTile_Settlements_DepositNo = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Deposit no.']");
        this.columnHeader_chartTile_Settlements_Details = page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Details']");

        this.settlementsTable_FirstDepositNo = page.locator("xpath=(//div[@class='depositNo']//div[@class='mobile-value'])[1]");
        this.findDeposites = page.locator("//div[text()='Find deposit no.']");
        this.viewResultsButton = page.locator("//div[text()='View results']");

        this.exportToCSVButton = page.locator("xpath=//div[text()='Export to CSV']");
        this.closeButton = page.locator("xpath=//button[.//span[text()='Close']]");
        this.viewTransactionDetailsButton = page.locator("xpath=//div[@class='details' and .//span[text()='View details']]");
        this.filteredSettlementDate = page.locator("div.date");
        this.filteredSettlementAmount = page.locator("div.amount div.value");
        this.filteredNoOfTransactions = page.locator("div.numTransactions div.mobile-inner div.mobile-value");

        this.detailsSettlementDate = page.locator("xpath=//h3[text()='Settlement Date']/following-sibling::p[1]");
        this.detailsSettlementAmount = page.locator("xpath=//h3[text()='Total Settlement Amount']/following-sibling::p[1]");
        this.detailsNoOfTransactions = page.locator("xpath=//h3[text()='No. of transactions']/following-sibling::p[1]");
        this.allTransactionRows = page.locator("div.simplebar-content div div.merchant-row");
        this.allTransactionAmounts = this.allTransactionRows.locator("div.amount div.value");

    }

    getDespositeByNumber(depositeNumber: string): Locator {
        return this.page.locator(`xpath=//div[@role='listbox']/div[@role='option' and text()='${depositeNumber}']`);
    }
}