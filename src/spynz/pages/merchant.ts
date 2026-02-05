import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class MerchantPage {
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
    readonly chartTile_Transactions: UiElement;
    readonly button_chartTile_Transactions_Filters: UiElement;
    readonly button_chartTile_Transactions_ExportToCSV: UiElement;
    readonly columnHeader_chartTile_Transactions_DateTime: UiElement;
    readonly columnHeader_chartTile_Transactions_Amount: UiElement;
    readonly columnHeader_chartTile_Transactions_TransactionType: UiElement;
    readonly columnHeader_chartTile_Transactions_CardType: UiElement;
    readonly columnHeader_chartTile_Transactions_PaymentStatus: UiElement;
    readonly columnHeader_chartTile_Transactions_Details: UiElement;
    
    //Settlements Tab Locators
    readonly tabSettlements: UiElement;
    readonly labelSettlements: UiElement;
    readonly chartTile_Settlements: UiElement;
    readonly button_chartTile_Settlements_Filters: UiElement;
    readonly button_chartTile_Settlements_ExportToCSV: UiElement;
    readonly columnHeader_chartTile_Settlements_Date: UiElement; 
    readonly columnHeader_chartTile_Settlements_SettlementAmount: UiElement;
    readonly columnHeader_chartTile_Settlements_NoOfTransactions: UiElement
    readonly columnHeader_chartTile_Settlements_DepositNo: UiElement;
    readonly columnHeader_chartTile_Settlements_Details: UiElement;
    readonly settlementsTable_FirstDepositNo: UiElement;
    readonly findDeposites: UiElement;
    readonly viewResultsButton: UiElement;
    readonly exportToCSVButton : UiElement;
    readonly closeButton: UiElement;
    readonly viewTransactionDetailsButton: UiElement;

    readonly filteredSettlementAmount: UiElement;
    readonly filteredSettlementDate: UiElement;
    readonly filteredNoOfTransactions: UiElement;

    readonly detailsSettlementDate: UiElement;
    readonly detailsSettlementAmount: UiElement;
    readonly detailsNoOfTransactions: UiElement;

    readonly allTransactionRows: UiElement;
    readonly allTransactionAmounts: UiElement;
    
    constructor(page: Page) {
        this.page = page;
        this.tabTransactions = UiElement.of(page.locator('#MenuLink-transactions'), 'Transactions tab');
        this.tabSettlements = UiElement.of(page.locator('#MenuLink-settlements'), 'Settlements tab');
        this.labelTransactions = UiElement.of(page.locator("xpath=//h1[span[text()='Transactions']]"), 'Transactions label');
        this.labelSettlements = UiElement.of(page.locator("xpath=//h1[span[text()='Settlements']]"), 'Settlements label');
        this.btnAccountsDrawer = UiElement.of(page.locator('#open-accounts-drawer'), 'Accounts drawer button');
        this.quickViewTile_RunningTotal = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Running total']]"), 'Running total tile');
        this.quickViewTile_NoOfTransactions = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='No. transactions']]"), 'No. transactions tile');
        this.quickViewTile_TotalRefunds = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Total refunds']]"), 'Total refunds tile');
        this.quickViewTile_BusiestTradingDay = UiElement.of(page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Busiest trading day']]"), 'Busiest trading day tile');
        this.chartTile_NetSales = UiElement.of(page.locator("xpath=//div[contains(@class,'chart-tile') and .//span[text()='Net sales']]"), 'Net sales chart tile');
        this.chartTile_Transactions = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]"), 'Transactions chart tile');
        this.button_chartTile_Transactions_Filters = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Filters']]"), 'Transactions filters button');
        this.button_chartTile_Transactions_ExportToCSV = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//button[.//span[text()='Export to CSV']]"), 'Transactions export to CSV button');
        this.columnHeader_chartTile_Transactions_DateTime = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Date/Time']"), 'Transactions date/time header');
        this.columnHeader_chartTile_Transactions_Amount = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Amount']"), 'Transactions amount header');
        this.columnHeader_chartTile_Transactions_TransactionType = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Transaction type']"), 'Transactions type header');
        this.columnHeader_chartTile_Transactions_CardType = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Card type']"), 'Transactions card type header');
        this.columnHeader_chartTile_Transactions_PaymentStatus = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Payment status']"), 'Transactions payment status header');
        this.columnHeader_chartTile_Transactions_Details = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Transactions']]//li[text()='Details']"), 'Transactions details header');

        this.chartTile_Settlements = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]"), 'Settlements chart tile');
        this.button_chartTile_Settlements_Filters = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Filters']]"), 'Settlements filters button');
        this.button_chartTile_Settlements_ExportToCSV = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//button[.//span[text()='Export to CSV']]"), 'Settlements export to CSV button');
        this.columnHeader_chartTile_Settlements_Date = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Date']"), 'Settlements date header');
        this.columnHeader_chartTile_Settlements_SettlementAmount = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Settlement amount']"), 'Settlements amount header');
        this.columnHeader_chartTile_Settlements_NoOfTransactions = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='No. transactions']"), 'Settlements no. transactions header');
        this.columnHeader_chartTile_Settlements_DepositNo = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Deposit no.']"), 'Settlements deposit no header');
        this.columnHeader_chartTile_Settlements_Details = UiElement.of(page.locator("xpath=//div[contains(@class,'merchant-container') and .//span[text()='Settlements']]//li[text()='Details']"), 'Settlements details header');

        this.settlementsTable_FirstDepositNo = UiElement.of(page.locator("xpath=(//div[@class='depositNo']//div[@class='mobile-value'])[1]"), 'First deposit number');
        this.findDeposites = UiElement.of(page.locator("//div[text()='Find deposit no.']"), 'Find deposits');
        this.viewResultsButton = UiElement.of(page.locator("//div[text()='View results']"), 'View results button');

        this.exportToCSVButton = UiElement.of(page.locator("xpath=//div[text()='Export to CSV']"), 'Export to CSV');
        this.closeButton = UiElement.of(page.locator("xpath=//button[.//span[text()='Close']]"), 'Close button');
        this.viewTransactionDetailsButton = UiElement.of(page.locator("xpath=//div[@class='details' and .//span[text()='View details']]"), 'View transaction details');
        this.filteredSettlementDate = UiElement.of(page.locator("xpath=(//div[@class='date'])[1]"), 'Filtered settlement date');
        this.filteredSettlementAmount = UiElement.of(page.locator("xpath=(//div[@class='amount']//div[@class='value'])[1]"), 'Filtered settlement amount');
        this.filteredNoOfTransactions = UiElement.of(page.locator("xpath=(//div[@class='numTransactions'])[1]//div[@class='mobile-value']"), 'Filtered number of transactions');
        
        this.detailsSettlementDate = UiElement.of(page.locator("xpath=//h3[text()='Settlement date']/following-sibling::p[1]"), 'Details settlement date');
        this.detailsSettlementAmount = UiElement.of(page.locator("xpath=//h3[text()='Total Settlement Amount']/following-sibling::p[1]"), 'Details settlement amount');
        this.detailsNoOfTransactions = UiElement.of(page.locator("xpath=//h3[text()='No. of transactions']/following-sibling::p[1]"), 'Details no of transactions');
        this.allTransactionRows = UiElement.of(page.locator("div.simplebar-content div div.merchant-row"), 'All transaction rows');
        this.allTransactionAmounts = UiElement.of(this.allTransactionRows.locator.locator("div.amount div.value"), 'All transaction amounts');

    }

    getDespositeByNumber(depositeNumber: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@role='listbox']/div[@role='option' and text()='${depositeNumber}']`), `Deposit option ${depositeNumber}`);
    }
}