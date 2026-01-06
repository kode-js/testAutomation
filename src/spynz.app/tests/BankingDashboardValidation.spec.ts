import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MerchantPage } from '../pages/merchant';
import { HomePage } from '../pages/homepage';
// import { MikomiPage } from '../pages/mikomiConnection';
// import { AccountsCanvas } from '../pages/accountsCanvas';
// import { TopOutboundCashDestCanvas } from '../pages/topOutboundCashDestCanvas';
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


    await sleep(5000);
    
  });
});