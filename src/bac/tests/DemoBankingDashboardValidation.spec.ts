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


    await test.step('Quickview tiles are visible', async () => {
      await expect.soft(homePage.closingCashBalanceTile.locator).toBeVisible();
      await expect.soft(homePage.cashTrendTile.locator).toBeVisible();
      await expect.soft(homePage.moneyInTile.locator).toBeVisible();
      await expect.soft(homePage.moneyOutTile.locator).toBeVisible();
    });
  
    await test.step('Dashboard tiles are visible', async () => {
      await expect.soft(homePage.balanceSummaryTile.locator).toBeVisible({ timeout: 120000 });
      await expect.soft(homePage.transactionSummaryTile.locator).toBeVisible({ timeout: 120000 });
      await expect.soft(homePage.availableBalancesTile.locator).toBeVisible({ timeout: 120000 });
      await expect.soft(homePage.topInboundCashSourcesTile.locator).toBeVisible({ timeout: 120000 });
      await expect.soft(homePage.topOutboundCashSourcesTile.locator).toBeVisible({ timeout: 120000 });
    });
  
  
    await test.step('Quickview tiles do not contain load error text', async () => {
      await expect.soft(homePage.closingCashBalanceTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.cashTrendTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.moneyInTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.moneyOutTile.locator).not.toContainText('Cannot load the data');
    });
  
    await test.step('Dashboard tiles do not contain load error text', async () => {
      await expect.soft(homePage.balanceSummaryTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.transactionSummaryTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.availableBalancesTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.topInboundCashSourcesTile.locator).not.toContainText('Cannot load the data');
      await expect.soft(homePage.topOutboundCashSourcesTile.locator).not.toContainText('Cannot load the data');
      await test.info().attach(`screenshot- Tiles`, {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  
  
  
    await actions.clickElement(homePage.dailyButton);
    await page.waitForLoadState('networkidle');
    await test.step('Daily view shows expected text', async () => {
      await expect.soft(homePage.closingCashBalanceTile.locator).toContainText('Since yesterday');
      await expect.soft(homePage.cashTrendTile.locator).toContainText('Since yesterday');
      await expect.soft(homePage.moneyInTile.locator).toContainText('Since yesterday');
      await expect.soft(homePage.moneyOutTile.locator).toContainText('Since yesterday');
  
      //screenshot boardroom quick view section
      await test.info().attach(`screenshot- Daily View`, {
        body: await homePage.boardQuickViewSection.locator.screenshot(),
        contentType: 'image/png',
      });
    });
  
  
    await actions.clickElement(homePage.weeklyButton);
    await page.waitForLoadState('networkidle');
    await test.step('Weekly view shows expected text', async () => {
      await expect.soft(homePage.closingCashBalanceTile.locator).toContainText('From last week');
      await expect.soft(homePage.cashTrendTile.locator).toContainText('From last week');
      await expect.soft(homePage.moneyInTile.locator).toContainText('From last week');
      await expect.soft(homePage.moneyOutTile.locator).toContainText('From last week');
  
      await test.info().attach(`screenshot- Weekly View`, {
        body: await homePage.boardQuickViewSection.locator.screenshot(),
        contentType: 'image/png',
      });
  
    });
  
  
    await actions.clickElement(homePage.monthlyButton);
    await page.waitForLoadState('networkidle');
    await test.step('Monthly view shows expected text', async () => {
      await expect.soft(homePage.closingCashBalanceTile.locator).toContainText('From last month');
      await expect.soft(homePage.cashTrendTile.locator).toContainText('From last month');
      await expect.soft(homePage.moneyInTile.locator).toContainText('From last month');
      await expect.soft(homePage.moneyOutTile.locator).toContainText('From last month');
  
      await test.info().attach(`screenshot- Monthly View`, {
        body: await homePage.boardQuickViewSection.locator.screenshot(),
        contentType: 'image/png',
      });
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

  //get the text of total cash in label from transaction summary tile
  const totalCashInText = await homePage.totalCashInLable.locator.textContent();
  console.log('Total Cash In Text: ', totalCashInText);
  const totalCashInDate = totalCashInText?.replace('Total cash in, period ending ', '').trim();

  //get the text of total cash out label from transaction summary tile
  const totalCashOutText = await homePage.totalCashOutLabel.locator.textContent();
  console.log('Total Cash Out Text: ', totalCashOutText);
  const totalCashOutDate = totalCashOutText?.replace('Total cash out, period ending ', '').trim();

  //verify that current balance date is equal to chart selected value text chartSelectedValue
  const tickValue = await homePage.chartSelectedValue.locator.textContent();

  await test.step('Chart selected value equals closing balance date', async () => {
    expect.soft(tickValue).toBe(currentBalanceDate);
  });

  await test.step('Total cash in and out dates equal closing balance date', async () => {
    expect.soft(totalCashInDate).toBe(currentBalanceDate);
    expect.soft(totalCashOutDate).toBe(currentBalanceDate);
  });

  await test.step('Expect Top Outbound Cash Destinations to be Loaded', async () => {
    await expect(homePage.topOutboundCashSourcesTile.locator).toBeVisible();
  });

  let firstTickText: string = await homePage.topOutboundCashDestinationsFirstTick.locator.textContent() || '';
  let secondTickText: string = await homePage.topOutboundCashDestinationsSecondTick.locator.textContent() || '';
  await actions.clickElement(homePage.topOutboundCashDestinationsFirstTick);
  //sleep for 2 seconds
  await sleep(2000);
  //loading spinner to be visible and then hidden
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

  const firstTickTotalText = await cashDestCanvas.getTotalFor(firstTickText).locator.textContent();
  console.log('First Tick Total Text: ', firstTickTotalText);
  const totalAmount = parseFloat(firstTickTotalText?.replace('$', '').replace(',', '') || '0');

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