import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { MikomiPage } from '../pages/mikomiConnection';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { sleep } from '../../utils/utils';
import * as actions from '../../utils/actions';
import login from '../testdata/login.json' assert { type: 'json' };


test('Connection Validation', async ({ page }) => {
  const bankName = 'Akoya Mikomo bank';
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const miPage = new MikomiPage(page);
  const accountsCanvas = new AccountsCanvas(page);
  await loginPage.navigate();
  await loginPage.login(login.boa.username, login.boa.password);
  await test.step(`Verify page title is ${login.boa.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.boa.homepageTitle);
  });
  await actions.clickElement(homePage.accountsHeaderButton);

  if (await accountsCanvas.removeButtonByBankName('Akoya Mikomo bank').locator.isVisible()) {
    await actions.clickElement(accountsCanvas.removeButtonByBankName('Akoya Mikomo bank'));
    await page.waitForLoadState('networkidle');
    await actions.clickElement(accountsCanvas.confirmRemoveButton);
    await page.waitForLoadState('networkidle');
  }

  await actions.clickElement(accountsCanvas.getBankByName(bankName));
  await accountsCanvas.termsAndConditionsCheckbox.locator.check();
  await page.waitForLoadState('networkidle');
  await actions.clickElement(accountsCanvas.proceedButton);
  await page.waitForLoadState('networkidle');

  //mikomo login
  await loginPage.mikomoLogin(login.amb.username, login.amb.password);
  await page.waitForLoadState('networkidle');
  //click on terms next button
  await actions.clickElement(miPage.termsNextButton);
  await page.waitForLoadState('networkidle');
  //allAccontsCheckboxes check all checkboxes
  const allChecks = await miPage.allAccontsCheckboxes.locator.all();
  for (const check of allChecks) {
    await check.click();
    //hard wait for .5 seconds
    await sleep(500);
  }

  await test.step('All accounts checkboxes are checked', async () => {
    await test.info().attach(`screenshot- All accounts`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });


  await actions.clickElement(miPage.accountsApproveButton);
  //close button to be visible
  await test.step('Accounts canvas close button is visible', async () => {
    await expect.soft(accountsCanvas.accountsCanvasCloseButton.locator).toBeVisible();
  });
  //loading spinner to be visible and then hidden
  await test.step('Loading spinner appears then hides', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 120000 });
  });

  //verify total balance is equal to sum of all account balances
  const balances = await miPage.allAccountBalances.locator.allTextContents();
  let sum = 0;
  for (const bal of balances) {
    //remove $ and , from string and convert to number
    const num = parseFloat(bal.replace('$', '').replace(',', ''));
    sum += num;
  }
  //get total balance text, remove $ and , and convert to number
  const totalBalText = await miPage.totalAccountBalance.locator.textContent();
  const totalBal = parseFloat((totalBalText as string).replace('$', '').replace(',', ''));
  console.log(`Sum of balances: ${sum}, Total balance: ${totalBal}`);
  await test.step('Sum of account balances matches total balance', async () => {
    await test.info().attach('expected-totalBalance', { body: Buffer.from(String(totalBal)), contentType: 'text/plain' });
    await test.info().attach('actual-sum', { body: Buffer.from(String(sum)), contentType: 'text/plain' });
    expect.soft(sum).toBeCloseTo(totalBal, 2);
  });


  await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
  await page.waitForLoadState('networkidle');
  await test.step('Success and non-eligible banners are visible', async () => {
    await expect.soft(miPage.successBanner.locator).toBeVisible();
    await expect.soft(miPage.nonEligibleAccountsBanner.locator).toBeVisible();
    await test.info().attach(`screenshot- Connection`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });

  await test.step('Wait for dashboard tiles to load', async () => {
    await page.waitForTimeout(2000);
    await page.waitForSelector(
      "//*[text()='Loading, please wait.']",
      {
        state: 'hidden',
        timeout: 240_000
      }
    );
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


  //Remove connection
  await actions.clickElement(homePage.accountsHeaderButton);
  await actions.clickElement(accountsCanvas.removeButtonByBankName(bankName));
  await page.waitForLoadState('networkidle');
  await actions.clickElement(accountsCanvas.confirmRemoveButton);
  await page.waitForLoadState('networkidle');
  await test.step(`Verify ${bankName} is visible after removal`, async () => {
    await expect.soft(accountsCanvas.getBankByName(bankName).locator).toBeVisible();

    await test.info().attach(`screenshot- Removed Connection`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });

});