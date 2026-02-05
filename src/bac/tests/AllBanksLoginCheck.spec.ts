import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { sleep } from '../../utils/utils';
import bankslist from '../testdata/banks.json' assert { type: 'json' };
import login from '../testdata/login.json' assert { type: 'json' };
import { UiElement } from '../../utils/UiElement';
import * as actions from '../../utils/actions';

test.describe('Test case 3', () => {
  test('Verify Login pages', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const accountsCanvas = new AccountsCanvas(page);
    await loginPage.navigate();
    await loginPage.login(login.boa.username, login.boa.password);
    await allure.step(`Verify page title is ${login.boa.homepageTitle}`, async () => {
      await expect(page).toHaveTitle(login.boa.homepageTitle);
    });
    await actions.clickElement(homePage.accountsHeaderButton);
    for (const bank of bankslist) {
      await test.step(`Verifying login page for ${bank.bank}`, async () => {
        const bankButton = accountsCanvas.getBankByName(bank.bank);
        await allure.step(`Verify bank button ${bank.bank} is visible`, async () => {
          await expect.soft(bankButton.locator).toBeVisible();
        });
        await allure.step(`Verify bank button ${bank.bank} is enabled`, async () => {
          await expect.soft(bankButton.locator).toBeEnabled();
        });
        await sleep(1000); // short sleep to avoid click interception
        await actions.clickElement(bankButton);
        await page.waitForLoadState('networkidle');
        await allure.step(`Verify bank header title is ${bank.bank}`, async () => {
          await expect.soft(accountsCanvas.bankHeaderTitle.locator).toHaveText(bank.bank);
        });
        await accountsCanvas.termsAndConditionsCheckbox.locator.check();
        await page.waitForLoadState('networkidle');
        await actions.clickElement(accountsCanvas.proceedButton);
        await page.waitForLoadState('networkidle');
        // verify login page title
        //await expect.soft(page).toHaveTitle(bank.loginPageTitle, { timeout: 10000 });
        // verify login page username field is visible
        const usernameLocator = await loginPage.getBankLoginUsername(bank.bank);
        await allure.step(`Verify username locator for ${bank.bank} is visible`, async () => {
          await expect.soft(usernameLocator.locator).toBeVisible({ timeout: 10000 });
        });
        await sleep(1000);
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
        await allure.step('Accounts offcanvas title is visible', async () => {
          await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
        });
        //wait for accounts offcanvas to be fully loaded
        await page.waitForLoadState('networkidle');
        //click on cancel button
        await actions.clickElement(accountsCanvas.canvasCancelButton);
        await page.waitForLoadState('networkidle');
        await allure.step('Accounts offcanvas title is visible after cancel', async () => {
          await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
        });
      });
    }

    await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
    await allure.step('Accounts offcanvas title is not visible after close', async () => {
      await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).not.toBeVisible();
    });

  });
});
