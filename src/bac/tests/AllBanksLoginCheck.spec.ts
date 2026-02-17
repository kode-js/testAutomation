import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { AccountsCanvas } from '../pages/accountsCanvas';
import { sleep } from '../../utils/utils';
import bankslist from '../testdata/banks.json' assert { type: 'json' };
import login from '../testdata/login.json' assert { type: 'json' };
import * as actions from '../../utils/actions';


test('Verify Login pages', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const accountsCanvas = new AccountsCanvas(page);
  await loginPage.navigate();
  await loginPage.login(login.boa.username, login.boa.password);
  await test.step(`Verify page title is ${login.boa.homepageTitle}`, async () => {
    await expect(page).toHaveTitle(login.boa.homepageTitle);
  });
  await actions.clickElement(homePage.accountsHeaderButton);

  if (await accountsCanvas.removeButtonByBankName('Akoya Mikomo bank').locator.isVisible()) {
    await actions.clickElement(accountsCanvas.removeButtonByBankName('Akoya Mikomo bank'));
    await actions.clickElement(accountsCanvas.confirmRemoveButton);
  }

  for (const bank of bankslist) {
    await test.step(`Verifying login page for ${bank.bank}`, async () => {
      const bankButton = accountsCanvas.getBankByName(bank.bank);
      await test.step(`Verify bank button ${bank.bank} is visible`, async () => {
        await expect.soft(bankButton.locator).toBeVisible();
      });
      await test.step(`Verify bank button ${bank.bank} is enabled`, async () => {
        await expect.soft(bankButton.locator).toBeEnabled();
      });
      await sleep(1000); // short sleep to avoid click interception
      await actions.clickElement(bankButton);
      await test.step(`Verify bank header title is ${bank.bank}`, async () => {
        await expect.soft(accountsCanvas.bankHeaderTitle.locator).toHaveText(bank.bank);
      });
      await accountsCanvas.termsAndConditionsCheckbox.locator.check();
      await actions.clickElement(accountsCanvas.proceedButton);
      const usernameLocator = await loginPage.getBankLoginUsername(bank.bank);
      await test.step(`Verify username locator for ${bank.bank} is visible`, async () => {
        await expect.soft(usernameLocator.locator).toBeVisible({ timeout: 30000 });
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
        await sleep(1000);
        if (await page.title() === 'Bank of America | Online Banking | Connected Apps') {
          break;
        }
        await page.goBack();
        await sleep(1000);
        attempts++;
      }
      //wait for accounts offcanvas to be visible
      await test.step('Accounts offcanvas title is visible', async () => {
        await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
      });
      //wait for accounts offcanvas to be fully loaded
      //click on cancel button
      await actions.clickElement(accountsCanvas.canvasCancelButton);
      await test.step('Accounts offcanvas title is visible after cancel', async () => {
        await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
      });
    });
  }

  await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
  await test.step('Accounts offcanvas title is not visible after close', async () => {
    await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).not.toBeVisible();
  });
});