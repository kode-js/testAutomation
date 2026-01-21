import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MerchantPage } from '../pages/merchant';
import { HomePage } from '../pages/homepage';
import { sleep } from '../../utils/utils';
import login from '../testdata/login.json' assert { type: 'json' };

test.describe('Test case 1', () => {

  test('Verify Connection', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homepage = new HomePage(page);
    const merchantPage = new MerchantPage(page);
    await loginPage.navigate();
    await loginPage.login(login.spynz.username, login.spynz.password);
    await expect.soft(page).toHaveTitle(login.spynz.homepageTitle);

    await homepage.navMerchant.click();
    await merchantPage.tabTransactions.click();
    await expect.soft(merchantPage.btnAccountsDrawer).toBeVisible();
    await expect.soft(merchantPage.quickViewTile_BusiestTradingDay).toBeVisible();
    await expect.soft(merchantPage.quickViewTile_NoOfTransactions).toBeVisible();
    await expect.soft(merchantPage.quickViewTile_RunningTotal).toBeVisible();
    await expect.soft(merchantPage.quickViewTile_TotalRefunds).toBeVisible();
    await expect.soft(merchantPage.chartTile_NetSales).toBeVisible();
    await expect.soft(merchantPage.chartTile_Transactions).toBeVisible();
    await expect.soft(merchantPage.button_chartTile_Transactions_Filters).toBeVisible();
    await expect.soft(merchantPage.button_chartTile_Transactions_ExportToCSV).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_DateTime).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_Amount).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_TransactionType).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_CardType).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_PaymentStatus).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Transactions_Details).toBeVisible();
    
    await merchantPage.tabSettlements.click();
    await expect.soft(merchantPage.labelSettlements).toBeVisible();
    await expect.soft(merchantPage.chartTile_Settlements).toBeVisible();
    await expect.soft(merchantPage.button_chartTile_Settlements_Filters).toBeVisible();
    await expect.soft(merchantPage.button_chartTile_Settlements_ExportToCSV).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Settlements_Date).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Settlements_SettlementAmount).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Settlements_NoOfTransactions).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Settlements_DepositNo).toBeVisible();
    await expect.soft(merchantPage.columnHeader_chartTile_Settlements_Details).toBeVisible();

    let firstDepositeNumber = await merchantPage.settlementsTable_FirstDepositNo.innerText();
    //console.log("First Deposite Number: " + firstDepositeNumber);
    await merchantPage.button_chartTile_Settlements_Filters.click();
    await merchantPage.findDeposites.click(); 
    await merchantPage.getDespositeByNumber(firstDepositeNumber).click();
    await page.waitForLoadState('networkidle');
    await merchantPage.viewResultsButton.click();
    await page.waitForLoadState('networkidle');
    await expect.soft(merchantPage.settlementsTable_FirstDepositNo).toHaveText(firstDepositeNumber);

    let settlementsDate = await merchantPage.filteredSettlementDate.textContent();
    let settlementAmount = await merchantPage.filteredSettlementAmount.textContent() as string;
    let noOfTransactions = await merchantPage.filteredNoOfTransactions.textContent() as string;

    await merchantPage.button_chartTile_Settlements_ExportToCSV.click();
    await page.waitForLoadState('networkidle');
    await merchantPage.exportToCSVButton.click();
    await page.waitForLoadState('networkidle');
    await merchantPage.closeButton.click();

    await merchantPage.viewTransactionDetailsButton.click();
    await page.waitForLoadState('networkidle');
    
    let detailsSettlementDate = await merchantPage.detailsSettlementDate.textContent() as string;
    let detailsSettlementAmount = await merchantPage.detailsSettlementAmount.textContent() as string;
    let detailsNoOfTransactions = await merchantPage.detailsNoOfTransactions.textContent() as string;
    
    expect.soft(detailsSettlementDate?.trim()).toBe(settlementsDate?.trim());
    expect.soft(detailsSettlementAmount?.trim()).toBe(settlementAmount?.trim());
    expect.soft(detailsNoOfTransactions?.trim()).toBe(noOfTransactions?.trim());

    //wait for 5 seconds to load all transactions
    await sleep(5000);

    let detailsAllTransactionRows = await merchantPage.allTransactionRows.count() as number;
    expect.soft(detailsAllTransactionRows).toBe(parseInt(noOfTransactions.replace(/,/g, '')));
    //await expect.soft(merchantPage.allTransactionRows).toHaveCount(parseInt(noOfTransactions.replace(/,/g, '')));
    const transactionAmounts = await merchantPage.allTransactionAmounts.allTextContents();
    //All transactions should total to settlement amount
    let totalAmount
    for (const amountText of transactionAmounts) {
      const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
      console.log('Transaction Amount: ', amount);
      totalAmount = (totalAmount || 0) + amount;
    }
    console.log('Total of All Transactions: ', totalAmount);
    const settlementAmountValue = parseFloat(settlementAmount.replace('$', '').replace(',', ''));
    expect.soft(totalAmount).toBeCloseTo(settlementAmountValue, 2); 

    await sleep(5000);
    
  });
});