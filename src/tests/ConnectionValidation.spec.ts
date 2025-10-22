import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { MikomiPage } from '../pages/mikomiConnection';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { sleep } from '../utils/utils';
import bankslist from '../testdata/banks.json' assert { type: 'json' };
import login from '../testdata/login.json' assert { type: 'json' };

test.describe('Test case 1', () => {

  test('Verify Connection', async ({ page }) => {
    const bankName = 'Akoya Mikomo bank';
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const miPage = new MikomiPage(page);
    const accountsCanvas = new AccountsCanvas(page);
    await loginPage.navigate();
    await loginPage.login(login.boa.username, login.boa.password);
    await expect.soft(page).toHaveTitle(login.boa.homepageTitle);
    await homePage.accountsHeaderButton.click();
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

    //verify total balance is equal to sum of all account balances
    const balances = await miPage.allAccountBalances.allTextContents();
    let sum = 0;
    for (const bal of balances) {
      //remove $ and , from string and convert to number
      const num = parseFloat(bal.replace('$', '').replace(',', ''));
      sum += num;
    }
    //get total balance text, remove $ and , and convert to number
    const totalBalText = await miPage.totalAccountBalance.textContent();
    const totalBal = parseFloat((totalBalText as string).replace('$', '').replace(',', ''));
    console.log(`Sum of balances: ${sum}, Total balance: ${totalBal}`);
    expect.soft(sum).toBeCloseTo(totalBal, 2);

    
    await accountsCanvas.accountsCanvasCloseButton.click();
    await page.waitForLoadState('networkidle');
    await expect.soft(miPage.successBanner).toBeVisible();
    await expect.soft(miPage.nonEligibleAccountsBanner).toBeVisible();
    await test.info().attach(`screenshot- Connection`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });

    await expect.soft(homePage.closingCashBalanceTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.cashTrendTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.moneyInTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.moneyOutTile).not.toContainText('Cannot load the data');

    await expect.soft(homePage.balanceSummaryTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.transactionSummaryTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.availableBalancesTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.topInboundCashSourcesTile).not.toContainText('Cannot load the data');
    await expect.soft(homePage.topOutboundCashSourcesTile).not.toContainText('Cannot load the data');

    await test.info().attach(`screenshot- Tiles`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });

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


