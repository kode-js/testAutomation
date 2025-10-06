import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { sleep } from '../utils/utils';
import bankslist from '../testdata/banks.json' assert { type: 'json' };

test.describe('Test case 3', () => {
  test('Verify Login pages', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const accountsCanvas = new AccountsCanvas(page);
    await loginPage.navigate();
    await loginPage.login('sep20@mailinator.com', 'First@1234');
    await expect(page).toHaveTitle('Bank of America | Online Banking | Connected Apps');
    await homePage.accountsHeaderButton.click();
    for (const bank of bankslist) {
      await test.step(`Verifying login page for ${bank.bank}`, async () => {
        const bankButton = accountsCanvas.getBankByName(bank.bank);
        await expect.soft(bankButton).toBeVisible();
        await expect.soft(bankButton).toBeEnabled();
        await sleep(1000); // short sleep to avoid click interception
        await bankButton.click();
        await page.waitForLoadState('networkidle');
        await expect.soft(accountsCanvas.bankHeaderTitle).toHaveText(bank.bank);
        // click on I agree checkbox
        await accountsCanvas.termsAndConditionsCheckbox.check();
        await page.waitForLoadState('networkidle');
        await accountsCanvas.proceedButton.click();
        await page.waitForLoadState('networkidle');
        // verify login page title
        await expect.soft(page).toHaveTitle(bank.loginPageTitle, { timeout: 10000 });
        //add screenshot to html report
        await test.info().attach(`screenshot-${bank.bank}`, {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
        //click browser back button until title is 'Bank of America | Online Banking | Connected Apps' using for loop max 5 times to avoid infinite loop
        let attempts = 0;
        while (attempts < 5) {
          if (await page.title() === 'Bank of America | Online Banking | Connected Apps') {
            break;
          }
          await page.goBack();
          await sleep(1000);
          await page.waitForLoadState('networkidle');
          attempts++;
        }
        //wait for accounts offcanvas to be visible
        await expect.soft(accountsCanvas.accontsOffcanvasTitle).toBeVisible();
        //wait for accounts offcanvas to be fully loaded
        await page.waitForLoadState('networkidle');
        //click on cancel button
        await accountsCanvas.canvasCancelButton.click();
        await page.waitForLoadState('networkidle');
        await expect.soft(accountsCanvas.accontsOffcanvasTitle).toBeVisible();
      });
    }

    await accountsCanvas.accountsCanvasCloseButton.click();
    await expect.soft(accountsCanvas.accontsOffcanvasTitle).not.toBeVisible();

  });
});
