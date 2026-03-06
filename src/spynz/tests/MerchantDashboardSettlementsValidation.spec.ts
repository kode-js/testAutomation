import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { MerchantSettlementsPage } from '../pages/merchantSettlements';
import { HomePage } from '../pages/homepage';
import { sleep } from '../../utils/utils';
import * as actions from '../../utils/actions';
import login from '../testdata/login.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';

test.only('Merchant Dashboard Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homepage = new HomePage(page);
  const settlementsPage = new MerchantSettlementsPage(page);
  await loginPage.navigate();
  await loginPage.login(login.spynz.username, login.spynz.password);
  await test.step(`Verify page title is ${login.spynz.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.spynz.homepageTitle);
  });

  await actions.clickElement(homepage.navMerchant);
  await actions.clickElement(settlementsPage.tabSettlements);
  await test.step('Verify settlements elements are visible', async () => {
    await test.step('Verify Settlements label is visible', async () => {
      await expect.soft(settlementsPage.labelSettlements.locator).toBeVisible();
    });
    await test.step('Verify Settlements chart tile is visible', async () => {
      await expect.soft(settlementsPage.chartTile_Settlements.locator).toBeVisible();
    });
    await test.step('Verify Settlements Filters button is visible', async () => {
      await expect.soft(settlementsPage.button_chartTile_Settlements_Filters.locator).toBeVisible();
    });
    await test.step('Verify Settlements ExportToCSV button is visible', async () => {
      await expect.soft(settlementsPage.button_chartTile_Settlements_ExportToCSV.locator).toBeVisible();
    });
    await test.step('Verify Settlements column - Date header is visible', async () => {
      await expect.soft(settlementsPage.columnHeader_chartTile_Settlements_Date.locator).toBeVisible();
    });
    await test.step('Verify Settlements column - SettlementAmount header is visible', async () => {
      await expect.soft(settlementsPage.columnHeader_chartTile_Settlements_SettlementAmount.locator).toBeVisible();
    });
    await test.step('Verify Settlements column - NoOfTransactions header is visible', async () => {
      await expect.soft(settlementsPage.columnHeader_chartTile_Settlements_NoOfTransactions.locator).toBeVisible();
    });
    await test.step('Verify Settlements column - DepositNo header is visible', async () => {
      await expect.soft(settlementsPage.columnHeader_chartTile_Settlements_DepositNo.locator).toBeVisible();
    });
    await test.step('Verify Settlements column - Details header is visible', async () => {
      await expect.soft(settlementsPage.columnHeader_chartTile_Settlements_Details.locator).toBeVisible();
    });
  });

  let firstDepositeNumber = await settlementsPage.settlementsTable_FirstDepositNo.locator.innerText();
  await actions.clickElement(settlementsPage.button_chartTile_Settlements_Filters);
  await actions.clickElement(settlementsPage.findDeposites);
  await actions.clickElement(settlementsPage.getDespositeByNumber(firstDepositeNumber));
  await page.waitForLoadState('networkidle');
  await actions.clickElement(settlementsPage.viewResultsButton);
  await page.waitForLoadState('networkidle');
  await test.step('Verify first deposit number matches', async () => {
    await expect.soft(settlementsPage.settlementsTable_FirstDepositNo.locator).toHaveText(firstDepositeNumber);
  });

  let settlementsDate = await settlementsPage.filteredSettlementDate.locator.textContent();
  let settlementAmount = await settlementsPage.filteredSettlementAmount.locator.textContent() as string;
  let noOfTransactions = await settlementsPage.filteredNoOfTransactions.locator.textContent() as string;

  await actions.clickElement(settlementsPage.button_chartTile_Settlements_ExportToCSV);
  await page.waitForLoadState('networkidle');
  //await actions.clickElement(settlementsPage.exportToCSVButton);

  const downloadsDir = path.join(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
  }

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    await actions.clickElement(settlementsPage.exportToCSVButton)
  ]);

  const timestamp = Date.now();
  const filePath = path.join(downloadsDir, `${timestamp}.csv`);
  //const filePath = test.info().outputPath(download.suggestedFilename());
  await download.saveAs(filePath);

  await test.step('Verify downloaded CSV file content matches filtered settlement data', async () => {
    await test.info().attach('Downloaded CSV File', { path: filePath, contentType: 'text/csv' });
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    // csv only contains two rows, headers and settlement data, so split by new line and get the second row for settlement data
    const csvLines = csvContent.split('\n');
    expect.soft(csvLines.length).toBe(2);
    const settlementData = csvLines[1].split(',');

    const settlementHeaders = csvLines[0].split(',');
    await test.step('Verify CSV headers are correct', async () => {
      expect.soft(settlementHeaders[0]?.trim()).toBe('Date/Time');
      expect.soft(settlementHeaders[1]?.trim()).toBe('Settlement amount');
      expect.soft(settlementHeaders[2]?.trim()).toBe('Currency');
      expect.soft(settlementHeaders[3]?.trim()).toBe('No. transactions');
      expect.soft(settlementHeaders[4]?.trim()).toBe('Deposit no.');
    });

    const csvDate = new Date(settlementData[0]?.trim() || '');
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedCsvDate = csvDate.toLocaleDateString('en-US', options);
    await test.step('Verify settlement Date in CSV matches filtered settlement data', async () => {
      await test.info().attach('Expected Settlement Date', { body: `Date: ${settlementsDate}`, contentType: 'text/plain' });
      await test.info().attach('Actual Settlement Date', { body: `Date: ${formattedCsvDate}`, contentType: 'text/plain' });
      expect.soft(formattedCsvDate?.trim()).toBe(settlementsDate?.trim());
    });

    //Remove $ and commas from settlement amount for comparison
    const cleanSettlementAmount = settlementAmount?.replace(/\$/g, '').replace(/,/g, '') || '';
    await test.step('Verify settlement Amount in CSV matches filtered settlement data', async () => {
      await test.info().attach('Expected Settlement Amount', { body: `Amount: ${cleanSettlementAmount}`, contentType: 'text/plain' });
      await test.info().attach('Actual Settlement Amount', { body: `Amount: ${settlementData[1]?.trim()}`, contentType: 'text/plain' });
      expect.soft(settlementData[1]?.trim()).toBe(cleanSettlementAmount?.trim());
    });

    await test.step('Verify number of transactions in CSV matches filtered settlement data', async () => {
      await test.info().attach('Expected Number of Transactions', { body: `No. Transactions: ${noOfTransactions}`, contentType: 'text/plain' });
      await test.info().attach('Actual Number of Transactions', { body: `No. Transactions: ${settlementData[3]?.trim()}`, contentType: 'text/plain' });
      expect.soft(settlementData[3]?.trim()).toBe(noOfTransactions?.trim());
    });

  });

  await page.waitForLoadState('networkidle');
  await actions.clickElement(settlementsPage.closeButton);

  await actions.clickElement(settlementsPage.viewTransactionDetailsButton);
  await page.waitForLoadState('networkidle');

  let detailsSettlementDate = await settlementsPage.detailsSettlementDate.locator.textContent() as string;
  let detailsSettlementAmount = await settlementsPage.detailsSettlementAmount.locator.textContent() as string;
  let detailsNoOfTransactions = await settlementsPage.detailsNoOfTransactions.locator.textContent() as string;

  await test.step('Verify details match filtered values', async () => {
    await test.step('Verify settlement date matches filtered date', async () => {
      expect.soft(detailsSettlementDate?.trim()).toBe(settlementsDate?.trim());
    });
    await test.step('Verify settlement amount matches filtered amount', async () => {
      expect.soft(detailsSettlementAmount?.trim()).toBe(settlementAmount?.trim());
    });
    await test.step('Verify number of transactions matches filtered count', async () => {
      expect.soft(detailsNoOfTransactions?.trim()).toBe(noOfTransactions?.trim());
    });
  });

  //wait for 5 seconds to load all transactions
  await sleep(10000);

  let detailsAllTransactionRows = await settlementsPage.allTransactionRows.locator.count() as number;
  await test.step('Verify number of transactions matches', async () => {
    expect.soft(detailsAllTransactionRows).toBe(parseInt(noOfTransactions.replace(/,/g, '')));
  });
  //await await expect.soft(settlementsPage.allTransactionRows).toHaveCount(parseInt(noOfTransactions.replace(/,/g, '')));
  const transactionAmounts = await settlementsPage.allTransactionAmounts.locator.allTextContents();
  //All transactions should total to settlement amount
  let totalAmount = 0;
  for (const amountText of transactionAmounts) {
    const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
    totalAmount = (totalAmount || 0) + amount;
  }
  //console.log('Total of All Transactions: ', totalAmount);
  const settlementAmountValue = parseFloat(settlementAmount.replace('$', '').replace(',', ''));
  await test.step(`Verify sum of transactions equals settlement amount`, async () => {
    await test.info().attach('Total of All Transactions', { body: `Total Amount: ${totalAmount}`, contentType: 'text/plain' });
    await test.info().attach('Settlement Amount', { body: `Settlement Amount: ${settlementAmountValue}`, contentType: 'text/plain' });
    expect.soft(totalAmount).toBeCloseTo(settlementAmountValue, 2);
  });

});