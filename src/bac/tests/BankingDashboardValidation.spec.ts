import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
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
  await loginPage.login(login.boa.username, login.boa.password);
  await allure.step(`Verify page title is ${login.boa.homepageTitle}`, async () => {
    await expect.soft(page).toHaveTitle(login.boa.homepageTitle);
  });

  await actions.clickElement(homePage.accountsHeaderButton);

  if (await accountsCanvas.removeButtonByBankName('Akoya Mikomo bank').locator.isVisible()) {
    await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
    await page.waitForLoadState('networkidle');
  }
  else {

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

    await test.info().attach(`screenshot- All accounts`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });

    await actions.clickElement(miPage.accountsApproveButton);
    //close button to be visible
    await allure.step('Accounts canvas close button is visible', async () => {
      await allure.step('Verify accounts canvas close button visibility', async () => {
        await expect.soft(accountsCanvas.accountsCanvasCloseButton.locator).toBeVisible();
      });
    });
    //loading spinner to be visible and then hidden
    await allure.step('Loading spinner appears then hides', async () => {
      await allure.step('Verify loading spinner visibility and hidden state', async () => {
        await expect.soft(miPage.loadingSpinner.locator).toBeVisible();
        await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
      });
    });

    await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
    await page.waitForLoadState('networkidle');

  }

  //mouse hover on balance summary chart
  await homePage.balanceSummaryChart.locator.hover();
  await test.info().attach(`screenshot- Balance Summary Chart`, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
  //wait for 1 second
  await sleep(1000);
  //verify closing balance label is visible
  await allure.step('Closing balance label is visible', async () => {
    await expect.soft(homePage.closingBalanceLabel.locator).toBeVisible();
  });
  //get the text of closing balance label
  const closingBalanceText = await homePage.closingBalanceLabel.locator.textContent();
  console.log('Closing Balance Text: ', closingBalanceText);
  const currentBalanceDate = closingBalanceText?.replace('Closing balance as of ', '').trim();

  //verify that current balance date is equal to chart selected value text chartSelectedValue
  const tickValue = await homePage.chartSelectedValue.locator.textContent();
  await allure.step('Chart selected value equals closing balance date', async () => {
    await expect.soft(tickValue).toBe(currentBalanceDate);
  });

  //Navigate to date picker and go to 12 months back and select 10th day
  await actions.clickElement(homePage.datePickerInput);
  await expect.soft(homePage.datePickerDropdown.locator).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await actions.clickElement(homePage.datePickerPreviousMonthButton);
    await sleep(500);
  }
  await actions.clickElement(homePage.datePickerDay10Cell);
  await page.waitForLoadState('networkidle');

  await actions.clickElement(homePage.topOutboundCashDestinationsCheck);
  //sleep for 2 seconds
  await sleep(2000);
  //loading spinner to be visible and then hidden
  //await expect.soft(miPage.loadingSpinner).toBeVisible();
  await allure.step('Loading spinner hidden after fetching outbound cash destinations', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });
  //click on check expand button
  await actions.clickElement(cashDestCanvas.checkExpand);
  await sleep(2000);
  await allure.step('Loading spinner hidden after expand', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });

  await actions.clickElement(cashDestCanvas.checkCollapse);
  await sleep(2000);
  await allure.step('Loading spinner hidden after collapse', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });
  await actions.clickElement(cashDestCanvas.cardMemberExpand);
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  await actions.clickElement(cashDestCanvas.cardMemberCollapse);
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  await actions.clickElement(cashDestCanvas.checkExpand);
  await sleep(2000);
  await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });

  const checkTotalText = await cashDestCanvas.checkTotal.locator.textContent();
  console.log('Check Total Text: ', checkTotalText);
  const totalAmount = parseFloat(checkTotalText?.replace('$', '').replace(',', '') || '0');

  //get all sub transaction amounts and sum them up
  const subTransactionAmounts = await cashDestCanvas.checkSubTransactions.locator.allTextContents();
  let subTotal = 0;
  for (const amountText of subTransactionAmounts) {
    const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
    subTotal += amount;
  }
  console.log('Sum of Sub Transactions: ', subTotal);
  await allure.step('Sum of sub transactions equals total amount', async () => {
    await expect.soft(subTotal).toBeCloseTo(totalAmount, 2);
  });

  //Remove connection
  await actions.clickElement(homePage.accountsHeaderButton);
  await actions.clickElement(accountsCanvas.removeButtonByBankName(bankName));
  await page.waitForLoadState('networkidle');
  await actions.clickElement(accountsCanvas.confirmRemoveButton);
  await page.waitForLoadState('networkidle');
  await allure.step(`Bank ${bankName} is visible in popular banks`, async () => {
    await expect.soft(accountsCanvas.getBankByName(bankName).locator).toBeVisible();
  });
  await test.info().attach(`screenshot- Removed Connection`, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

});