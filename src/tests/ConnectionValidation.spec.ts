import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { MikomiPage } from '../pages/mikomiConnection';
import { AccountsCanvas } from '../pages/accountsCanvas';
import bankslist from '../testdata/banks.json' assert { type: 'json' };

test.describe('Test case 1', () => {

  test('Verify Connection', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const miPage = new MikomiPage(page);
    const accountsCanvas = new AccountsCanvas(page);
    await loginPage.navigate();
    await loginPage.login('sep20@mailinator.com', 'First@1234');
    await expect(page).toHaveTitle('Bank of America | Online Banking | Connected Apps');
    await homePage.accountsHeaderButton.click();
    await accountsCanvas.getBankByName('Akoya Mikomo bank').click();
    await accountsCanvas.termsAndConditionsCheckbox.check();
    await page.waitForLoadState('networkidle');
    await accountsCanvas.proceedButton.click();
    await page.waitForLoadState('networkidle');

    //mikomo login
    await loginPage.mikomoLogin('mikomo_2023', 'mikomo_2023');
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
    await expect(accountsCanvas.accountsCanvasCloseButton).toBeVisible();
    //loading spinner to be visible and then hidden
    await expect(miPage.loadingSpinner).toBeVisible();
    await expect(miPage.loadingSpinner).toBeHidden({ timeout: 30000 });

    await accountsCanvas.accountsCanvasCloseButton.click();
    await page.waitForLoadState('networkidle');
    await expect.soft(miPage.successBanner).toBeVisible();
    await expect.soft(miPage.nonEligibleAccountsBanner).toBeVisible();
    await test.info().attach(`screenshot- Connection`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });

});

function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


