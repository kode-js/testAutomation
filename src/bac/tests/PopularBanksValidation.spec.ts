import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { AccountsCanvas } from '../pages/accountsCanvas';
import bankslist from '../testdata/banks.json' assert { type: 'json' };
import login from '../testdata/login.json' assert { type: 'json' };
import { MikomiPage } from '../pages/mikomiConnection';
import * as actions from '../../utils/actions';

test('Popular banks validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const accountsCanvas = new AccountsCanvas(page);
  const miPage = new MikomiPage(page);
  await loginPage.navigate();
  await loginPage.login(login.boa.username, login.boa.password);
  await allure.step(`Verify page title is ${login.boa.homepageTitle}`, async () => {
    await expect(page).toHaveTitle(login.boa.homepageTitle);
  });
  await allure.step('Top navigation elements are visible', async () => {
    await expect.soft(homePage.bankingDashboardLink.locator).toBeVisible();
    await expect.soft(homePage.appDashboardLink.locator).toBeVisible();
    await expect.soft(homePage.homeLogo.locator).toBeVisible();
    await expect.soft(homePage.headerBrandText.locator).toHaveText('Business Online Banking');
    await expect.soft(homePage.tourButton.locator).toBeVisible();
    await expect.soft(homePage.settingsButton.locator).toBeVisible();
    await expect.soft(homePage.accountsHeaderButton.locator).toBeVisible();
  });

  await actions.clickElement(homePage.accountsHeaderButton);
  await allure.step('Loading spinner hidden before interacting with accounts', async () => {
    await expect.soft(miPage.loadingSpinner.locator).toBeHidden({ timeout: 30000 });
  });
  await page.waitForLoadState('networkidle');
    if(await accountsCanvas.removeButtonByBankName('Akoya Mikomo bank').locator.isVisible()) {
    await actions.clickElement(accountsCanvas.removeButtonByBankName('Akoya Mikomo bank'));
    await page.waitForLoadState('networkidle');
    await actions.clickElement(accountsCanvas.confirmRemoveButton);
    await page.waitForLoadState('networkidle');
  }

  await allure.step('Accounts canvas shows expected elements', async () => {
    await allure.step('Verify accounts canvas elements visibility and attributes', async () => {
      await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
      await expect.soft(accountsCanvas.accountsCanvasCloseButton.locator).toBeVisible();
      await expect.soft(accountsCanvas.bankingTab.locator).toBeVisible();
      await expect.soft(accountsCanvas.appsTab.locator).toBeVisible();
      await expect.soft(accountsCanvas.bankingTab.locator).toHaveAttribute('aria-selected', 'true');
      await expect.soft(accountsCanvas.searchMoreBanksTxt.locator).toBeVisible();
      await expect.soft(accountsCanvas.popularBanksLabel.locator).toBeVisible();
    });
  });
  const bankNames = await accountsCanvas.listOfBanks.locator.allTextContents()
  const sortedBankNames = [...bankNames].sort((a, b) => a.localeCompare(b));
  expect(bankNames).toEqual(sortedBankNames);

  //for loop: Click on each bank from json list one by one and verify login page is opened
  for (const bank of bankslist) {
    const bankButton = accountsCanvas.getBankByName(bank.bank);
    await allure.step(`Verify and open popular bank ${bank.bank}`, async () => {
      await expect.soft(bankButton.locator).toBeVisible();
      await actions.clickElement(bankButton);
      await page.waitForLoadState('networkidle');
      await expect.soft(accountsCanvas.bankHeaderTitle.locator).toHaveText(bank.bank);
    });
    //add screenshot to html report
    await test.info().attach(`screenshot-${bank.bank}`, {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
    //click on cancel button
    await actions.clickElement(accountsCanvas.canvasCancelButton);
    await page.waitForLoadState('networkidle');
    await allure.step('Accounts offcanvas is visible after cancel', async () => {
      await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).toBeVisible();
    });
  }

  await actions.clickElement(accountsCanvas.accountsCanvasCloseButton);
  await expect.soft(accountsCanvas.accontsOffcanvasTitle.locator).not.toBeVisible();
});