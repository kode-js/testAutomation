import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { MerchantPage } from '../pages/merchant';
import { HomePage } from '../pages/homepage';
import { sleep } from '../../utils/utils';
import * as actions from '../../utils/actions';
import login from '../testdata/login.json' assert { type: 'json' };

test('Verify Connection', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homepage = new HomePage(page);
  const merchantPage = new MerchantPage(page);
  await loginPage.navigate();
  await loginPage.login(login.spynz.username, login.spynz.password);
  await allure.step(`Verify page title is ${login.spynz.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.spynz.homepageTitle);
  });

  await actions.clickElement(homepage.navMerchant);
  await actions.clickElement(merchantPage.tabTransactions);
  await allure.step('Verify transactions overview elements are visible', async () => {
    // Create a sub-step for each element verification
    await allure.step('Verify Accounts Drawer button is visible', async () => {
      await expect.soft(merchantPage.btnAccountsDrawer.locator).toBeVisible();
    });
    await allure.step('Verify Quick View - Busiest Trading Day tile is visible', async () => {
      await expect.soft(merchantPage.quickViewTile_BusiestTradingDay.locator).toBeVisible();
    });
    await allure.step('Verify Quick View - No Of Transactions tile is visible', async () => {
      await expect.soft(merchantPage.quickViewTile_NoOfTransactions.locator).toBeVisible();
    });
    await allure.step('Verify Quick View - Running Total tile is visible', async () => {
      await expect.soft(merchantPage.quickViewTile_RunningTotal.locator).toBeVisible();
    });
    await allure.step('Verify Quick View - Total Refunds tile is visible', async () => {
      await expect.soft(merchantPage.quickViewTile_TotalRefunds.locator).toBeVisible();
    });
    await allure.step('Verify Net Sales chart tile is visible', async () => {
      await expect.soft(merchantPage.chartTile_NetSales.locator).toBeVisible();
    });
    await allure.step('Verify Transactions chart tile is visible', async () => {
      await expect.soft(merchantPage.chartTile_Transactions.locator).toBeVisible();
    });
    await test.step('Verify Transactions Filters button is visible', async () => {
      await expect.soft(merchantPage.button_chartTile_Transactions_Filters.locator).toBeVisible();
    });
    await allure.step('Verify Transactions ExportToCSV button is visible', async () => {
      await expect.soft(merchantPage.button_chartTile_Transactions_ExportToCSV.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - DateTime header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_DateTime.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - Amount header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_Amount.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - TransactionType header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_TransactionType.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - CardType header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_CardType.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - PaymentStatus header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_PaymentStatus.locator).toBeVisible();
    });
    await allure.step('Verify Transactions column - Details header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Transactions_Details.locator).toBeVisible();
    });
  });

  await actions.clickElement(merchantPage.tabSettlements);
  await allure.step('Verify settlements elements are visible', async () => {
    await allure.step('Verify Settlements label is visible', async () => {
      await expect.soft(merchantPage.labelSettlements.locator).toBeVisible();
    });
    await allure.step('Verify Settlements chart tile is visible', async () => {
      await expect.soft(merchantPage.chartTile_Settlements.locator).toBeVisible();
    });
    await allure.step('Verify Settlements Filters button is visible', async () => {
      await expect.soft(merchantPage.button_chartTile_Settlements_Filters.locator).toBeVisible();
    });
    await allure.step('Verify Settlements ExportToCSV button is visible', async () => {
      await expect.soft(merchantPage.button_chartTile_Settlements_ExportToCSV.locator).toBeVisible();
    });
    await allure.step('Verify Settlements column - Date header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Settlements_Date.locator).toBeVisible();
    });
    await allure.step('Verify Settlements column - SettlementAmount header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Settlements_SettlementAmount.locator).toBeVisible();
    });
    await allure.step('Verify Settlements column - NoOfTransactions header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Settlements_NoOfTransactions.locator).toBeVisible();
    });
    await allure.step('Verify Settlements column - DepositNo header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Settlements_DepositNo.locator).toBeVisible();
    });
    await allure.step('Verify Settlements column - Details header is visible', async () => {
      await expect.soft(merchantPage.columnHeader_chartTile_Settlements_Details.locator).toBeVisible();
    });
  });

  let firstDepositeNumber = await merchantPage.settlementsTable_FirstDepositNo.locator.innerText();
  await actions.clickElement(merchantPage.button_chartTile_Settlements_Filters);
  await actions.clickElement(merchantPage.findDeposites);
  await actions.clickElement(merchantPage.getDespositeByNumber(firstDepositeNumber));
  await page.waitForLoadState('networkidle');
  await actions.clickElement(merchantPage.viewResultsButton);
  await page.waitForLoadState('networkidle');
  await allure.step('Verify first deposit number matches', async () => {
    await expect.soft(merchantPage.settlementsTable_FirstDepositNo.locator).toHaveText(firstDepositeNumber);
  });

  let settlementsDate = await merchantPage.filteredSettlementDate.locator.textContent();
  let settlementAmount = await merchantPage.filteredSettlementAmount.locator.textContent() as string;
  let noOfTransactions = await merchantPage.filteredNoOfTransactions.locator.textContent() as string;

  await actions.clickElement(merchantPage.button_chartTile_Settlements_ExportToCSV);
  await page.waitForLoadState('networkidle');
  await actions.clickElement(merchantPage.exportToCSVButton);
  await page.waitForLoadState('networkidle');
  await actions.clickElement(merchantPage.closeButton);

  await actions.clickElement(merchantPage.viewTransactionDetailsButton);
  await page.waitForLoadState('networkidle');

  let detailsSettlementDate = await merchantPage.detailsSettlementDate.locator.textContent() as string;
  let detailsSettlementAmount = await merchantPage.detailsSettlementAmount.locator.textContent() as string;
  let detailsNoOfTransactions = await merchantPage.detailsNoOfTransactions.locator.textContent() as string;

  await allure.step('Verify details match filtered values', async () => {
    await allure.step('Verify settlement date matches filtered date', async () => {
      await expect.soft(detailsSettlementDate?.trim()).toBe(settlementsDate?.trim());
    });
    await allure.step('Verify settlement amount matches filtered amount', async () => {
      await expect.soft(detailsSettlementAmount?.trim()).toBe(settlementAmount?.trim());
    });
    await allure.step('Verify number of transactions matches filtered count', async () => {
      await expect.soft(detailsNoOfTransactions?.trim()).toBe(noOfTransactions?.trim());
    });
  });

  //wait for 5 seconds to load all transactions
  await sleep(10000);

  let detailsAllTransactionRows = await merchantPage.allTransactionRows.locator.count() as number;
  await allure.step('Verify number of transactions matches', async () => {
    await allure.step('Compare transaction rows count to filtered number', async () => {
      await expect.soft(detailsAllTransactionRows).toBe(parseInt(noOfTransactions.replace(/,/g, '')));
    });
  });
  //await await expect.soft(merchantPage.allTransactionRows).toHaveCount(parseInt(noOfTransactions.replace(/,/g, '')));
  const transactionAmounts = await merchantPage.allTransactionAmounts.locator.allTextContents();
  //All transactions should total to settlement amount
  let totalAmount = 0;
  for (const amountText of transactionAmounts) {
    const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
    totalAmount = (totalAmount || 0) + amount;
  }
  //console.log('Total of All Transactions: ', totalAmount);
  const settlementAmountValue = parseFloat(settlementAmount.replace('$', '').replace(',', ''));
  await allure.step('Verify sum of transactions equals settlement amount', async () => {
    await allure.step('Compare summed transactions to settlement amount', async () => {
      await expect.soft(totalAmount).toBeCloseTo(settlementAmountValue, 2);
    });
  });

  await sleep(5000);

});