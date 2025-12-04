import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { MikomiPage } from '../pages/mikomiConnection';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { TopOutboundCashDestCanvas } from '../pages/topOutboundCashDestCanvas';
import { sleep } from '../utils/utils';
import login from '../testdata/login.json' assert { type: 'json' };

test.describe('Test case 1', () => {

  test('Verify Connection', async ({ page }) => {
    const bankName = 'Akoya Mikomo bank';
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const miPage = new MikomiPage(page);
    const accountsCanvas = new AccountsCanvas(page);
    const cashDestCanvas = new TopOutboundCashDestCanvas(page);
    await loginPage.navigate();
    await loginPage.login(login.boa.username, login.boa.password);
    await expect.soft(page).toHaveTitle(login.boa.homepageTitle);

    await homePage.accountsHeaderButton.click();

    if ( await accountsCanvas.removeButtonByBankName('Akoya Mikomo bank').isVisible()) {
      await accountsCanvas.accountsCanvasCloseButton.click();
      await page.waitForLoadState('networkidle');
    }
    else {

      await accountsCanvas.getBankByName(bankName).click();
      await accountsCanvas.termsAndConditionsCheckbox.check();
      await page.waitForLoadState('networkidle');
      await accountsCanvas.proceedButton.click();
      await page.waitForLoadState('networkidle');

      //mikomo login
      await loginPage.mikomoLogin(login.amb.username, login.amb.password);
      await page.waitForLoadState('networkidle');
      //click on terms next button
      await miPage.termsNextButton.click();
      await page.waitForLoadState('networkidle');
      //allAccontsCheckboxes check all checkboxes
      const allChecks = await miPage.allAccontsCheckboxes.all();
      for (const check of allChecks) {
        await check.click();
        //hard wait for .5 seconds
        await sleep(500);
      }

      await test.info().attach(`screenshot- All accounts`, {
        body: await page.screenshot(),
        contentType: 'image/png',
      });

      await miPage.accountsApproveButton.click();
      //close button to be visible
      await expect.soft(accountsCanvas.accountsCanvasCloseButton).toBeVisible();
      //loading spinner to be visible and then hidden
      await expect.soft(miPage.loadingSpinner).toBeVisible();
      await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });

      await accountsCanvas.accountsCanvasCloseButton.click();
      await page.waitForLoadState('networkidle');

    }

    //mouse hover on balance summary chart
    await homePage.balanceSummaryChart.hover();
    await test.info().attach(`screenshot- Balance Summary Chart`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
    //wait for 1 second
    await sleep(1000);
    //verify closing balance label is visible
    await expect.soft(homePage.closingBalanceLabel).toBeVisible();
    //get the text of closing balance label
    const closingBalanceText = await homePage.closingBalanceLabel.textContent();
    console.log('Closing Balance Text: ', closingBalanceText);
    const currentBalanceDate = closingBalanceText?.replace('Closing balance as of ', '').trim();
    
    //verify that current balance date is equal to chart selected value text chartSelectedValue
    const tickValue = await homePage.chartSelectedValue.textContent();
    expect.soft(tickValue).toBe(currentBalanceDate);

    //Navigate to date picker and go to 12 months back and select 10th day
    await homePage.datePickerInput.click();
    await expect.soft(homePage.datePickerDropdown).toBeVisible();
    for (let i = 0; i < 12; i++) {
      await homePage.datePickerPreviousMonthButton.click();
      await sleep(500);
    }
    await homePage.datePickerDay10Cell.click();
    await page.waitForLoadState('networkidle');

    await homePage.topOutboundCashDestinationsCheck.click();
    //sleep for 2 seconds
    await sleep(2000);
    //loading spinner to be visible and then hidden
    //await expect.soft(miPage.loadingSpinner).toBeVisible();
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });
    //click on check expand button
    await cashDestCanvas.checkExpand.click();
    await sleep(2000);
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });

    await cashDestCanvas.checkCollapse.click();
    await sleep(2000);
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });

    await cashDestCanvas.cardMemberExpand.click();
    await sleep(2000);
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });

    await cashDestCanvas.cardMemberCollapse.click();
    await sleep(2000);
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000});

    await cashDestCanvas.checkExpand.click();
    await sleep(2000);
    await expect.soft(miPage.loadingSpinner).toBeHidden({ timeout: 30000 }); 
    
    const checkTotalText = await cashDestCanvas.checkTotal.textContent();
    console.log('Check Total Text: ', checkTotalText);
    const totalAmount = parseFloat(checkTotalText?.replace('$', '').replace(',', '') || '0');

    //get all sub transaction amounts and sum them up
    const subTransactionAmounts = await cashDestCanvas.checkSubTransactions.allTextContents();
    let subTotal = 0;
    for (const amountText of subTransactionAmounts) {
      const amount = parseFloat(amountText.replace('$', '').replace(',', ''));
      subTotal += amount;
    }
    console.log('Sum of Sub Transactions: ', subTotal);
    expect.soft(subTotal).toBeCloseTo(totalAmount, 2);

     //Remove connection
    await homePage.accountsHeaderButton.click();
    await accountsCanvas.removeButtonByBankName(bankName).click();
    await page.waitForLoadState('networkidle');
    await accountsCanvas.confirmRemoveButton.click();
    await page.waitForLoadState('networkidle');
    await expect.soft(accountsCanvas.getBankByName(bankName)).toBeVisible();
    await test.info().attach(`screenshot- Removed Connection`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
    
  });
});