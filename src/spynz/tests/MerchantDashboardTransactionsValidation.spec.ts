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

test.only('Merchant Dashboard Transactions Tab Validation', async ({ page }) => {
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

    //wait for 5 seconds
    await sleep(5000);
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
      await transactionsPage.chart_NetSales.locator.hover({ position: { x: 5, y: 50 } });
      await sleep(2000);
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

  await test.step('Verify Transaction filters and export functionality', async () => {
    // compute date range: from = 6 months before today (T00:00), to = today (T00:00)
    const now = new Date();
    const fromDate = new Date(now);
    fromDate.setMonth(fromDate.getMonth() - 6);
    const fmt = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}T00:00`;
    };
    const dateFromStr = fmt(fromDate);
    const dateToStr = fmt(now);

    const minAmount = '20';
    const maxAmount = '100';

    await test.step('Open filters panel', async () => {
      await actions.clickElement(transactionsPage.button_chartTile_Transactions_Filters);
    });

    await test.step(`Set dateFrom to ${dateFromStr} and dateTo to ${dateToStr}`, async () => {
      await actions.enterText(transactionsPage.dateFrom, dateFromStr);
      await actions.enterText(transactionsPage.dateTo, dateToStr);
    });

    await test.step(`Set min amount ${minAmount} and max amount ${maxAmount}`, async () => {
      await actions.enterText(transactionsPage.minAmout, minAmount);
      await actions.enterText(transactionsPage.maxAmount, maxAmount);
    });

    await test.step('Select Visa and Mastercard card types', async () => {
      await actions.clickElement(transactionsPage.cardType_visa);
      await actions.clickElement(transactionsPage.cardType_mastercard);
    });

    await test.step('Select Approved payment status', async () => {
      await actions.clickElement(transactionsPage.paymentStatus_approved);
    });

    await test.step('Apply filters (View results)', async () => {
      await actions.clickElement(transactionsPage.viewResultsButton);
      await sleep(5000); // wait for filters to apply and results to load, can be replaced with more robust wait condition if needed
    });

    await page.waitForLoadState('networkidle');

    const firstResultDate = await transactionsPage.firstResultDate.locator.textContent();
    const firstResultTime = await transactionsPage.firstResultTime.locator.textContent();
    const firstResultAmount = await transactionsPage.firstResultAmount.locator.textContent();
    const firstResultTransactionType = await transactionsPage.firstResultTransactionType.locator.textContent();
    const firstResultCardType = await transactionsPage.firstResultCardType.locator.textContent();
    const firstResultPaymentStatus = await transactionsPage.firstResultPaymentStatus.locator.textContent();

    await actions.clickElement(transactionsPage.firstResultDetailsButton);

    await test.step('Verify first transaction details match with applied filters', async () => {
      //expected transaction date time ${firstResultDate} at ${firstResultTime}
      const expectedDateTime = `${firstResultDate?.trim()} at ${firstResultTime?.trim()}`;
      const actualDateTime = await transactionsPage.transaction_DateTime.locator.textContent();
      await test.step(`Transaction date time should be ${expectedDateTime}`, async () => {
        await test.info().attach('Expected Transaction DateTime', {
          body: expectedDateTime,
          contentType: 'text/plain',
        });
        await test.info().attach('Actual Transaction DateTime', {
          body: actualDateTime?.trim() || '',
          contentType: 'text/plain',
        });
        expect.soft(actualDateTime?.trim()).toBe(expectedDateTime);
      });

      const actualAmount = await transactionsPage.transaction_Amount.locator.textContent();
      await test.step(`Transaction amount should be ${firstResultAmount?.trim()}`, async () => {
        await test.info().attach('Expected Transaction Amount', {
          body: firstResultAmount?.trim() || '',
          contentType: 'text/plain',
        });
        await test.info().attach('Actual Transaction Amount', {
          body: actualAmount?.trim() || '',
          contentType: 'text/plain',
        });
        expect.soft(actualAmount?.trim()).toBe(firstResultAmount?.trim());
      });

      await test.step(`Transaction type should be ${firstResultTransactionType?.trim()}`, async () => {
        const actualTransactionType = await transactionsPage.transaction_TransactionType.locator.textContent();
        await test.info().attach('Expected Transaction Type', {
          body: firstResultTransactionType?.trim() || '',
          contentType: 'text/plain',
        });
        await test.info().attach('Actual Transaction Type', {
          body: actualTransactionType?.trim() || '',
          contentType: 'text/plain',
        });
        expect.soft(actualTransactionType?.trim()).toBe(firstResultTransactionType?.trim());
      });

      await test.step(`Card type should be ${firstResultCardType?.trim()}`, async () => {
        const actualCardType = await transactionsPage.transaction_CardType.locator.textContent();
        await test.info().attach('Expected Card Type', {
          body: firstResultCardType?.trim() || '',
          contentType: 'text/plain',
        });
        await test.info().attach('Actual Card Type', {
          body: actualCardType?.trim() || '',
          contentType: 'text/plain',
        });
        expect.soft(actualCardType?.trim()).toBe(firstResultCardType?.trim());
      });

      await test.step(`Payment status should be ${firstResultPaymentStatus?.trim()}`, async () => {
        const actualPaymentStatus = await transactionsPage.transaction_PaymentStatus.locator.textContent();
        await test.info().attach('Expected Payment Status', {
          body: firstResultPaymentStatus?.trim() || '',
          contentType: 'text/plain',
        });
        await test.info().attach('Actual Payment Status', {
          body: actualPaymentStatus?.trim() || '',
          contentType: 'text/plain',
        });
        expect.soft(actualPaymentStatus?.trim()).toBe(firstResultPaymentStatus?.trim());
      });

    });

    await actions.clickElement(transactionsPage.details_CancelButton);

    await test.step('Export transactions and verify downloaded file', async () => {
      // Listen for the download event

      const downloadsDir = path.join(process.cwd(), 'downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir);
      }

      await actions.clickElement(transactionsPage.button_chartTile_Transactions_ExportToCSV);

      const [download] = await Promise.all([
        page.waitForEvent('download'),
        await actions.clickElement(transactionsPage.exportToCSVButton)
      ]);

      const timestamp = Date.now();
      const filePath = path.join(downloadsDir, `${timestamp}.csv`);
      //const filePath = test.info().outputPath(download.suggestedFilename());
      await download.saveAs(filePath);

      await test.step('Verify downloaded CSV file content matches filtered transaction data', async () => {
        await test.info().attach('Downloaded CSV File', { path: filePath, contentType: 'text/csv' });
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const csvLines = csvContent.split('\n');
        const transactionData = csvLines[1].split(',');

        const transactionHeaders = csvLines[0].split(',');
        await test.step('Verify CSV headers are correct', async () => {
          expect.soft(transactionHeaders[0]?.trim()).toBe('Date/Time');
          expect.soft(transactionHeaders[1]?.trim()).toBe('Amount');
          expect.soft(transactionHeaders[2]?.trim()).toBe('Currency');
          expect.soft(transactionHeaders[3]?.trim()).toBe('Card type');
          expect.soft(transactionHeaders[4]?.trim()).toBe('Payment status');
          expect.soft(transactionHeaders[5]?.trim()).toBe('Transaction type');
        });

        let expectedDate = `${firstResultDate?.trim()}`;
        let expectedTime = `${firstResultTime?.trim()}`;
        //expected date fetched from application is in Nov 24, 2025 format, so we need to convert it to 2025-11-24 format to compare with CSV data
        const dateObj = new Date(expectedDate || '');
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        expectedDate = `${year}-${month}-${day}`;
        //expctedDate format should be like "2025-11-24"
        //exptectedTime format may be "8:29 AM", "08:29 AM", or already 24-hour like "08:29"
        //Parse hour/minute and convert to zero-padded 24-hour "HH:MM" format
        let expectedTimeFormatted = '';
        const timeMatch = expectedTime?.match(/\s*(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (timeMatch) {
          let hour = parseInt(timeMatch[1], 10);
          const minute = timeMatch[2];
          const meridiem = timeMatch[3]?.toUpperCase();
          if (meridiem === 'PM' && hour !== 12) hour += 12;
          if (meridiem === 'AM' && hour === 12) hour = 0;
          expectedTimeFormatted = String(hour).padStart(2, '0') + ':' + minute;
        } else {
          expectedTimeFormatted = expectedTime?.trim().slice(0, 5) || '';
        }
        const expectedDateTime = `${expectedDate}T${expectedTimeFormatted}`;

        let actualDateTime = transactionData[0]?.trim();
        //actualDateTime format is like "2025-11-24T08:29:58+05:30"
        //actualDate is first 10 characters of actualDateTime, actualTime is characters from 11 to 16 in actualDateTime excluding seconds
        let actualDate = actualDateTime?.slice(0, 10);
        let actualTime = actualDateTime?.slice(11, 16);
        const actualDateTime_trimmed = `${actualDate}T${actualTime}`;

        await test.step(`Verify transaction date time in CSV matches with first transaction date time ${expectedDateTime}`, async () => {
          await test.info().attach('Expected Transaction DateTime', {
            body: expectedDateTime || '',
            contentType: 'text/plain',
          });
          await test.info().attach('Actual Transaction DateTime', {
            body: actualDateTime || '',
            contentType: 'text/plain',
          });
          expect.soft(actualDateTime_trimmed).toBe(expectedDateTime);
        });

        const expectedAmount = firstResultAmount?.trim().replace('$', '').replace(',', '') || '';
        const actualAmount = transactionData[1]?.trim();
        await test.step(`Verify transaction amount in CSV matches with first transaction amount ${expectedAmount}`, async () => {
          await test.info().attach('Expected Transaction Amount', {
            body: expectedAmount || '',
            contentType: 'text/plain',
          });
          await test.info().attach('Actual Transaction Amount', {
            body: actualAmount || '',
            contentType: 'text/plain',
          });
          expect.soft(actualAmount).toBe(expectedAmount);
        });

        const expectedCardType = firstResultCardType?.trim();
        const actualCardType = transactionData[3]?.trim();
        await test.step(`Verify card type in CSV matches with first transaction card type ${expectedCardType}`, async () => {
          await test.info().attach('Expected Card Type', {
            body: expectedCardType || '',
            contentType: 'text/plain',
          });
          await test.info().attach('Actual Card Type', {
            body: actualCardType || '',
            contentType: 'text/plain',
          });
          expect.soft(actualCardType).toBe(expectedCardType);
        });

        const expectedPaymentStatus = firstResultPaymentStatus?.trim();
        const actualPaymentStatus = transactionData[4]?.trim();
        await test.step(`Verify payment status in CSV matches with first transaction payment status ${expectedPaymentStatus}`, async () => {
          await test.info().attach('Expected Payment Status', {
            body: expectedPaymentStatus || '',
            contentType: 'text/plain',
          });
          await test.info().attach('Actual Payment Status', {
            body: actualPaymentStatus || '',
            contentType: 'text/plain',
          });
          expect.soft(actualPaymentStatus).toBe(expectedPaymentStatus);
        });

      });
    });
  });
});