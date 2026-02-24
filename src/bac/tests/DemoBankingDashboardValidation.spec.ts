import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { MikomiPage } from '../pages/mikomiConnection';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { TopOutboundCashDestCanvas } from '../pages/topOutboundCashDestCanvas';
import { sleep } from '../../utils/utils';
import * as actions from '../../utils/actions';
import login from '../testdata/login.json' assert { type: 'json' };

test('Banking Dashboard Validation', async ({ page }) => {
  const bankName = 'Akoya Mikomo bank';
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const miPage = new MikomiPage(page);
  const accountsCanvas = new AccountsCanvas(page);
  const cashDestCanvas = new TopOutboundCashDestCanvas(page);
  await loginPage.navigate();
  await loginPage.login(login.boa_demo.username, login.boa_demo.password);
  await test.step(`Verify page title is ${login.boa_demo.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.boa_demo.homepageTitle);
  });

  //mouse hover on balance summary chart
  await homePage.balanceSummaryChart.locator.hover();

  //wait for 1 second
  await sleep(1000);
  //verify closing balance label is visible
  await test.step('Closing balance label is visible', async () => {
    await expect.soft(homePage.closingBalanceLabel.locator).toBeVisible();
    await test.info().attach(`screenshot- Balance Summary Chart`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
  //get the text of closing balance label
  const closingBalanceText = await homePage.closingBalanceLabel.locator.textContent();
  console.log('Closing Balance Text: ', closingBalanceText);
  const currentBalanceDate = closingBalanceText?.replace('Closing balance as of ', '').trim();

  //verify that current balance date is equal to chart selected value text chartSelectedValue
  const tickValue = await homePage.chartSelectedValue.locator.textContent();

  await test.step('Chart selected value equals closing balance date', async () => {
    expect.soft(tickValue).toBe(currentBalanceDate);
  });

  //Navigate to date picker and go to 12 months back and select 10th day
  // await actions.clickElement(homePage.datePickerInput);
  // await expect.soft(homePage.datePickerDropdown.locator).toBeVisible();
  // for (let i = 0; i < 12; i++) {
  //   await actions.clickElement(homePage.datePickerPreviousMonthButton);
  //   await sleep(500);
  // }
  // await actions.clickElement(homePage.datePickerDay10Cell);
  // await page.waitForLoadState('networkidle');

  await test.step('Expect Top Outbound Cash Destinations to be Loaded', async () => {
    await expect(homePage.topOutboundCashSourcesTile.locator).toBeVisible();
  });

  let firstTickText: string = await homePage.topOutboundCashDestinationsFirstTick.locator.textContent() || '';
  let secondTickText: string = await homePage.topOutboundCashDestinationsSecondTick.locator.textContent() || '';
  await actions.clickElement(homePage.topOutboundCashDestinationsFirstTick);
  //sleep for 2 seconds
  await sleep(2000);
  //loading spinner to be visible and then hidden
  //await expect.soft(miPage.loadingSpinner).toBeVisible();
  await test.step('Loading spinner hidden after fetching outbound cash destinations', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });
  //click on check expand button
  // if Collapse button is not visible then click on expand button
  const tickCollapseVisible = await cashDestCanvas.getCollapseButtonFor(firstTickText).locator.isVisible();
  if (!tickCollapseVisible) {
    await actions.clickElement(cashDestCanvas.getExpandButtonFor(firstTickText));
  }
  await sleep(2000);
  await test.step('Loading spinner hidden after expand', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });

  await actions.clickElement(cashDestCanvas.getCollapseButtonFor(firstTickText));
  await sleep(2000);
  await test.step('Loading spinner hidden after collapse', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });
  await actions.clickElement(cashDestCanvas.getExpandButtonFor(secondTickText));
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  await actions.clickElement(cashDestCanvas.getCollapseButtonFor(secondTickText));
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  await actions.clickElement(cashDestCanvas.getExpandButtonFor(firstTickText));
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  // const checkTotalText = await cashDestCanvas.checkTotal.locator.textContent();
  // console.log('Check Total Text: ', checkTotalText);
  // const totalAmount = parseFloat(checkTotalText?.replace('$', '').replace(',', '') || '0');

  const firstTickTotalText = await cashDestCanvas.getTotalFor(firstTickText).locator.textContent();
  console.log('First Tick Total Text: ', firstTickTotalText);
  const totalAmount = parseFloat(firstTickTotalText?.replace('$', '').replace(',', '') || '0');

  //get all sub transaction amounts and sum them up
  
  // const subTransactionAmounts = await cashDestCanvas.checkSubTransactions.locator.allTextContents();
  // let subTotal = 0;
  // for (const amountText of subTransactionAmounts) {
  //   const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
  //   subTotal += amount;
  // }
  // console.log('Sum of Sub Transactions: ', subTotal);
  // await test.step('Sum of sub transactions equals total amount', async () => {
  //   await expect.soft(subTotal).toBeCloseTo(totalAmount, 2);
  // });

  //Get the count of sub transactions
  //Scroll the sub transactions canvas and wait for 2 seconds
  //Verify if count of sub transactions increased repeat until all sub transactions are loaded
  let previousCount = 0;
  let currentCount = 0;
  const subTransactionsCanvas = cashDestCanvas.getScrollableCanvasFor(firstTickText);
  do {
    previousCount = currentCount;
    const subTransactionElements = await cashDestCanvas.getSubTransactionsFor(firstTickText).locator.elementHandles();
    currentCount = subTransactionElements.length;
    console.log('Current count of sub transactions: ', currentCount);
    if (currentCount > previousCount) {
      await actions.scrollElementDown(subTransactionsCanvas);
      await sleep(3000);
      await actions.scrollElementDown(subTransactionsCanvas);
      await sleep(3000);
      await actions.scrollElementDown(subTransactionsCanvas);
      await sleep(3000);
    }
    
  } while (currentCount > previousCount);

  console.log('Final count of sub transactions: ', currentCount);

  //get all sub transaction amounts for "firsttick" and sum them up
  const subTransactionAmounts = await cashDestCanvas.getSubTransactionsFor(firstTickText).locator.allTextContents();
  let subTotal = 0;
  for (const amountText of subTransactionAmounts) {
    const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
    subTotal += amount;
  }
  console.log('Sum of Sub Transactions: ', subTotal);
  await test.step('Sum of sub transactions equals total amount', async () => {
    expect.soft(subTotal).toBeCloseTo(totalAmount, 2);
  });

});