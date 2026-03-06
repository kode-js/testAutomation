import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { MerchantTransactionsPage } from '../pages/merchantTransactions';
import { HomePage } from '../pages/homepage';
import { sleep } from '../../utils/utils';
import * as actions from '../../utils/actions';
import login from '../testdata/login.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';

test.only('Merchant Dashboard Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homepage = new HomePage(page);
  const transactionsPage = new MerchantTransactionsPage(page);
  await loginPage.navigate();
  await loginPage.login(login.spynz.username, login.spynz.password);
  await test.step(`Verify page title is ${login.spynz.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.spynz.homepageTitle);
  });

  await actions.clickElement(homepage.navMerchant);
  await actions.clickElement(transactionsPage.tabTransactions);
  await test.step('Verify transactions overview elements are visible', async () => {
    // Create a sub-step for each element verification
    await test.step('Verify Accounts Drawer button is visible', async () => {
      await expect.soft(transactionsPage.btnAccountsDrawer.locator).toBeVisible();
    });
    await test.step('Verify Quick View - Busiest Trading Day tile is visible', async () => {
      await expect.soft(transactionsPage.quickViewTile_BusiestTradingDay.locator).toBeVisible();
    });
    await test.step('Verify Quick View - No Of Transactions tile is visible', async () => {
      await expect.soft(transactionsPage.quickViewTile_NoOfTransactions.locator).toBeVisible();
    });
    await test.step('Verify Quick View - Running Total tile is visible', async () => {
      await expect.soft(transactionsPage.quickViewTile_RunningTotal.locator).toBeVisible();
    });
    await test.step('Verify Quick View - Total Refunds tile is visible', async () => {
      await expect.soft(transactionsPage.quickViewTile_TotalRefunds.locator).toBeVisible();
    });
    await test.step('Verify Net Sales chart tile is visible', async () => {
      await expect.soft(transactionsPage.chartTile_NetSales.locator).toBeVisible();
    });
    await test.step('Verify Transactions chart tile is visible', async () => {
      await expect.soft(transactionsPage.chartTile_Transactions.locator).toBeVisible();
    });
    await test.step('Verify Transactions Filters button is visible', async () => {
      await expect.soft(transactionsPage.button_chartTile_Transactions_Filters.locator).toBeVisible();
    });
    await test.step('Verify Transactions ExportToCSV button is visible', async () => {
      await expect.soft(transactionsPage.button_chartTile_Transactions_ExportToCSV.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - DateTime header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_DateTime.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - Amount header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_Amount.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - TransactionType header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_TransactionType.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - CardType header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_CardType.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - PaymentStatus header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_PaymentStatus.locator).toBeVisible();
    });
    await test.step('Verify Transactions column - Details header is visible', async () => {
      await expect.soft(transactionsPage.columnHeader_chartTile_Transactions_Details.locator).toBeVisible();
    });
  });

  await test.step('Verify Mouse hover on Net Sales chart', async () => {

    //mouse hover on balance summary chart
    await transactionsPage.chart_NetSales.locator.hover();

    //wait for 1 second
    await sleep(1000);

    const tickValue = await transactionsPage.netsalesSelectedChartValue.locator.textContent();
    //expected_previousYearNetValue should and one year before. tick value format: Feb 23, 2026, so expected_previousYearNetValue should be Feb 23, 2025
    // yearFromtickValue is last four characters of tick value
    let yearFromTickValue = tickValue?.slice(-4);
    let expectedPreviousYearNetValue = tickValue?.replace(yearFromTickValue || '', (parseInt(yearFromTickValue || '') - 1).toString() || '');
    
    //verify closing balance label is visible
    await test.step('Net sales label should display hovered chart date', async () => {
      await expect.soft(transactionsPage.netSalesLabel.locator).toBeVisible();
      const netSalesLabelText = await transactionsPage.netSalesLabel.locator.textContent();
      //net sales label should end with the tick value which is the hovered date on chart
      expect.soft(netSalesLabelText?.trim().endsWith(tickValue?.trim() || '')).toBeTruthy();
    });

    await test.step('Previous year net sales label should display hovered chart date', async () => {
      await expect.soft(transactionsPage.previousYearNetSalesLabel.locator).toBeVisible();
      const previousYearNetSalesLabelText = await transactionsPage.previousYearNetSalesLabel.locator.textContent(); 
      //previous year net sales label should end with the tick value which is the hovered date on chart
      expect.soft(previousYearNetSalesLabelText?.trim().endsWith(expectedPreviousYearNetValue?.trim() || '')).toBeTruthy();
    });
    await test.info().attach('screenshot- Net Sales Chart Hover', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });

    //Slide mouse to left until the tick value changes and verify that net sales label and previous year net sales label are updated with new tick value
    let attempts = 0;
    let mousehoverSuccess = false;
    while (attempts < 5) {
      await transactionsPage.chart_NetSales.locator.hover({ position: { x: 10, y: 100 } });
      await sleep(1000);
      const newTickValue = await transactionsPage.netsalesSelectedChartValue.locator.textContent();
      if (newTickValue !== tickValue) {
        await test.step('Net sales label should update with new hovered chart date', async () => {
          const netSalesLabelText = await transactionsPage.netSalesLabel.locator.textContent();
          expect.soft(netSalesLabelText?.trim().endsWith(newTickValue?.trim() || '')).toBeTruthy();
        });
        expectedPreviousYearNetValue = newTickValue?.replace(newTickValue.slice(-4) || '', (parseInt(newTickValue.slice(-4) || '') - 1).toString() || '');
        await test.step('Previous year net sales label should update with new hovered chart date', async () => {
          const previousYearNetSalesLabelText = await transactionsPage.previousYearNetSalesLabel.locator.textContent();
          expect.soft(previousYearNetSalesLabelText?.trim().endsWith(expectedPreviousYearNetValue?.trim() || '')).toBeTruthy();
        });
        await test.info().attach('screenshot- Net Sales Chart Hover Updated', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
        mousehoverSuccess = true;
        break;
      }
      attempts++;
    }
    if (!mousehoverSuccess) {
      test.fail(true, 'Mouse hover on Net Sales chart did not update tick value after multiple attempts');
    }
  });

  test.step('Verify Transaction filters and export functionality', async () => {
    
  });
});