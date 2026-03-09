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

    //Filter locators
    readonly dateFrom: UiElement;
    readonly dateTo: UiElement;
    readonly minAmout: UiElement;
    readonly maxAmount: UiElement;
    readonly cardType_visa: UiElement;
    readonly cardType_mastercard: UiElement
    readonly cardType_debitCard: UiElement;
    readonly cardType_amex: UiElement;
    readonly paymentStatus_approved: UiElement;
    readonly paymentStatus_declined: UiElement
    readonly paymentStatus_cancelled: UiElement;
    readonly viewResultsButton: UiElement;

    //First Result locators
    //<div class="simplebar-content" style="padding: 0px;"><div><div class="merchantContainer__date">24 Nov 2025</div><div class="merchantContainer__row" data-testid="row"><div class="merchantContainer__row"><button class="merchantContainer__wrapper succeeded" tabindex="0"><div class="time">8:29 am</div><div class="details"><div class="details__icon"><span class="details__label">View details</span><span class="" aria-hidden="true"><svg class="icon svgIcon" data-testid="svg-icon"><use href="#icon__chevron_right" class="spritePath"></use></svg></span></div></div><div class="amount"><div class="value">$50.65</div></div><div class="type"><div class="value">Purchase</div></div><div class="method">visa (2577)</div><div class="status"><div class="pill succeeded">Approved</div></div></button></div></div></div></div>
    readonly firstResultDate: UiElement;
    readonly firstResultTime: UiElement;
    readonly firstResultAmount: UiElement
    readonly firstResultTransactionType: UiElement;
    readonly firstResultCardType: UiElement;
    readonly firstResultPaymentStatus: UiElement;
    readonly firstResultDetailsButton: UiElement;

    //Transaction Details locators
    //<div role="dialog" aria-modal="true" class="ns-offcanvas offcanvas offcanvas-end show" tabindex="-1" aria-labelledby="offcanvasLabel" style="visibility: visible;"><div class="ns-offcanvas-header offcanvas-header"><div class="offcanvas-title h5">Transaction details</div><button class="btn ns-button-secondary"><div class="btn-inner"><span class="btn-child">Close</span></div></button></div><div class="transactionDetails offcanvas-body"><div data-simplebar="init" class="simple-offcanvas simplebar-scrollable-y"><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%; overflow: hidden scroll;"><div class="simplebar-content" style="padding: 0px;"><h3>Date and time</h3><p>24 Nov 2025 at 8:29 am</p><h3>Transaction amount</h3><p>$50.65</p><h3>Purchase amount</h3><p>$50.65</p><h3>Payment method</h3><p>Card</p><h3>Account type</h3><p>Credit</p><h3>Card type</h3><p>Visa (2577)</p><h3>Payment status</h3><p><div class="pill succeeded">Approved</div></p><h3>Transaction type</h3><p>Purchase</p><h3>Card entry</h3><p>Swipe</p><h3>Bypassed surcharge</h3><p>$0.00</p><h3>Surcharge</h3><p>$0.00 (0.00%)</p><h3>Tips</h3><p>$0.00 (0.00%)</p><h3>Settlement status</h3><p>Paid</p><h3>Cash out</h3><p>$0.00</p><div class="offcanvasFooter"><div class="offcanvasFooter-inner pb-4"><div class="row align-items-center"><div class="col-12 col-md-8 transaction-filters-footer-primary"><button class="btn ns-button-secondary"><div class="btn-inner"><span class="btn-child">Cancel</span></div></button><button class="btn ns-button-primary"><div class="btn-inner"><span class="" aria-hidden="true"><svg class="icon svgIcon" data-testid="svg-icon"><use href="#icon__checklist" class="spritePath"></use></svg></span><span class="btn-child"><div class="d-flex align-items-center"><span>View receipt</span></div></span></div></button></div></div></div></div></div></div></div></div><div class="simplebar-placeholder" style="width: 719px; height: 1210px;"></div></div><div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar simplebar-visible" style="width: 0px; display: none;"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: visible;"><div class="simplebar-scrollbar simplebar-visible" style="height: 97px; transform: translate3d(0px, 0px, 0px); display: block;"></div></div></div></div></div>
    readonly transaction_DateTime: UiElement;
    readonly transaction_Amount: UiElement;
    readonly transaction_PurchaseAmount: UiElement;
    readonly transaction_PaymentMethod: UiElement;
    readonly transaction_AccountType: UiElement;
    readonly transaction_CardType: UiElement;
    readonly transaction_PaymentStatus: UiElement;
    readonly transaction_TransactionType: UiElement;
    readonly transaction_CardEntry: UiElement;
    readonly transaction_BypassedSurcharge: UiElement;
    readonly transaction_Surcharge: UiElement;
    readonly transaction_Tips: UiElement;
    readonly transaction_SettlementStatus: UiElement;
    readonly transaction_CashOut: UiElement;
    readonly details_CancelButton: UiElement;
    readonly details_ViewReceiptButton: UiElement;

    readonly exportToCSVButton: UiElement;
    
    constructor(page: Page) {
        this.page = page;
        this.tabTransactions = UiElement.of(this.page.locator('#MenuLink-transactions'), 'Transactions tab');
        this.labelTransactions = UiElement.of(this.page.locator("xpath=//h1[span[text()='Transactions']]"), 'Transactions label');
        this.btnAccountsDrawer = UiElement.of(this.page.locator('#open-accounts-drawer'), 'Accounts drawer button');
        this.quickViewTile_RunningTotal = UiElement.of(this.page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Running total']]"), 'Running total tile');
        this.quickViewTile_NoOfTransactions = UiElement.of(this.page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='No. transactions']]"), 'No. transactions tile');
        this.quickViewTile_TotalRefunds = UiElement.of(this.page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Total refunds']]"), 'Total refunds tile');
        this.quickViewTile_BusiestTradingDay = UiElement.of(this.page.locator("xpath=//div[contains(@class,'quickview__tile') and .//div[text()='Busiest trading day']]"), 'Busiest trading day tile');
        this.chartTile_NetSales = UiElement.of(this.page.locator("xpath=//div[contains(@class,'chart-tile') and .//span[text()='Net sales']]"), 'Net sales chart tile');
        this.chart_NetSales = UiElement.of(this.chartTile_NetSales.locator.locator("xpath=//div[@id='merchant-net-sales']"), 'Net sales chart');
        this.netSalesLabel = UiElement.of(this.page.locator("xpath=//div[starts-with(text(),'Net sales, on')]"), 'Net sales label');
        this.previousYearNetSalesLabel = UiElement.of(this.page.locator("xpath=//div[starts-with(text(),'Previous year net sales, on')]"), 'Previous year net sales label');
        this.netsalesSelectedChartValue = UiElement.of(this.page.locator("xpath=//div[@id='merchant-net-sales']//*[@class='tick-value selected']"), 'Net sales selected chart value');
        
        this.chartTile_Transactions = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]"), 'Transactions chart tile');
        this.button_chartTile_Transactions_Filters = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//button[.//span[text()='Filters']]"), 'Transactions filters button');
        this.button_chartTile_Transactions_ExportToCSV = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//button[.//span[text()='Export to CSV']]"), 'Transactions export to CSV button');
        this.columnHeader_chartTile_Transactions_DateTime = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Date/Time']"), 'Transactions date/time header');
        this.columnHeader_chartTile_Transactions_Amount = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Amount']"), 'Transactions amount header');
        this.columnHeader_chartTile_Transactions_TransactionType = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Transaction type']"), 'Transactions type header');
        this.columnHeader_chartTile_Transactions_CardType = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Card type']"), 'Transactions card type header');
        this.columnHeader_chartTile_Transactions_PaymentStatus = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Payment status']"), 'Transactions payment status header');
        this.columnHeader_chartTile_Transactions_Details = UiElement.of(this.page.locator("xpath=//div[contains(@class,'merchantContainer') and .//span[text()='Transactions']]//li[text()='Details']"), 'Transactions details header');

        this.dateFrom = UiElement.of(this.page.locator('#dateFrom'), 'Filter date from input');
        this.dateTo = UiElement.of(this.page.locator('#dateTo'), 'Filter date to input');
        this.minAmout = UiElement.of(this.page.locator('#rangeMin'), 'Filter min amount input');
        this.maxAmount = UiElement.of(this.page.locator('#rangeMax'), 'Filter max amount input');
        this.cardType_visa = UiElement.of(this.page.locator('#visa'), 'Filter card type Visa checkbox');
        this.cardType_mastercard = UiElement.of(this.page.locator('#mastercard'), 'Filter card type Mastercard checkbox');
        this.cardType_debitCard = UiElement.of(this.page.locator('#debitcard'), 'Filter card type Debit Card checkbox');
        this.cardType_amex = UiElement.of(this.page.locator('#amex'), 'Filter card type Amex checkbox');
        this.paymentStatus_approved = UiElement.of(this.page.locator('#succeeded'), 'Filter payment status Approved checkbox');
        this.paymentStatus_declined = UiElement.of(this.page.locator('#failed'), 'Filter payment status Declined checkbox');
        this.paymentStatus_cancelled = UiElement.of(this.page.locator('#cancelled'), 'Filter payment status Cancelled checkbox');
        this.viewResultsButton = UiElement.of(this.page.locator("//button[.//div[text()='View results']]"), 'Filter view results button');

        this.firstResultDate = UiElement.of(this.page.locator("xpath=(//div[@class='merchantContainer__date'])[1]"), 'First result date');
        this.firstResultTime = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//div[@class='time']"), 'First result time');
        this.firstResultAmount = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//div[@class='amount']//div[@class='value']"), 'First result amount');
        this.firstResultTransactionType = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//div[@class='type']//div[@class='value']"), 'First result transaction type');
        this.firstResultCardType = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//div[contains(@class,'method')]"), 'First result card type');
        this.firstResultPaymentStatus = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//div[contains(@class,'status')]//div[contains(@class,'pill')]"), 'First result payment status');
        this.firstResultDetailsButton = UiElement.of(this.page.locator("xpath=(//div[contains(@class,'merchantContainer__row') and @data-testid])[1]//button[contains(@class,'merchantContainer__wrapper')]"), 'First result details button');

        this.transaction_DateTime = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Date and time']/following-sibling::p[1]"), 'Transaction details date and time');
        this.transaction_Amount = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Transaction amount']/following-sibling::p[1]"), 'Transaction details amount');
        this.transaction_PurchaseAmount = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Purchase amount']/following-sibling::p[1]"), 'Transaction details purchase amount');
        this.transaction_PaymentMethod = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Payment method']/following-sibling::p[1]"), 'Transaction details payment method');
        this.transaction_AccountType = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Account type']/following-sibling::p[1]"), 'Transaction details account type');
        this.transaction_CardType = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Card type']/following-sibling::p[1]"), 'Transaction details card type');
        this.transaction_PaymentStatus = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Payment status']/following-sibling::p[1]//div[contains(@class,'pill')]"), 'Transaction details payment status');
        this.transaction_TransactionType = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Transaction type']/following-sibling::p[1]"), 'Transaction details transaction type');
        this.transaction_CardEntry = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Card entry']/following-sibling::p[1]"), 'Transaction details card entry');
        this.transaction_BypassedSurcharge = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Bypassed surcharge']/following-sibling::p[1]"), 'Transaction details bypassed surcharge');
        this.transaction_Surcharge = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Surcharge']/following-sibling::p[1]"), 'Transaction details surcharge');
        this.transaction_Tips = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Tips']/following-sibling::p[1]"), 'Transaction details tips');
        this.transaction_SettlementStatus = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Settlement status']/following-sibling::p[1]"), 'Transaction details settlement status');
        this.transaction_CashOut = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//h3[text()='Cash out']/following-sibling::p[1]"), 'Transaction details cash out');
        this.details_CancelButton = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//button[.//span[text()='Cancel']]"), 'Transaction details cancel button');
        this.details_ViewReceiptButton = UiElement.of(this.page.locator("xpath=//div[@role='dialog']//button[.//span[text()='View receipt']]"), 'Transaction details view receipt button');
        this.exportToCSVButton = UiElement.of(this.page.locator("xpath=//button[.//div[text()='Export to CSV']]"), 'Transactions export to CSV button');
    }

    getDespositeByNumber(depositeNumber: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@role='listbox']/div[@role='option' and text()='${depositeNumber}']`), `Deposit option ${depositeNumber}`);
    }
}
