import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import { AccountsCanvas } from '../pages/accountsCanvas';
import bankslist from '../testdata/banks.json' assert { type: 'json' };

test.describe('Test case 1', () => {
  
  test('Verify home dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const accountsCanvas = new AccountsCanvas(page);
    await loginPage.navigate();
    await loginPage.login('sep20@mailinator.com', 'First@1234');
    await expect(page).toHaveTitle('Bank of America | Online Banking | Connected Apps');
    await expect.soft(homePage.bankingDashboardLink).toBeVisible();
    await expect.soft(homePage.appDashboardLink).toBeVisible();
    await expect.soft(homePage.homeLogo).toBeVisible();
    await expect.soft(homePage.headerBrandText).toHaveText('Business Online Banking');
    await expect.soft(homePage.tourButton).toBeVisible();
    await expect.soft(homePage.settingsButton).toBeVisible();
    await expect.soft(homePage.accountsHeaderButton).toBeVisible();

    await homePage.accountsHeaderButton.click();
    await expect.soft(accountsCanvas.accontsOffcanvasTitle).toBeVisible();
    await expect.soft(accountsCanvas.accountsCanvasCloseButton).toBeVisible();
    await expect.soft(accountsCanvas.bankingTab).toBeVisible();
    await expect.soft(accountsCanvas.appsTab).toBeVisible();
    await expect.soft(accountsCanvas.bankingTab).toHaveAttribute('aria-selected', 'true');
    await expect.soft(accountsCanvas.searchMoreBanksTxt).toBeVisible();
    await expect.soft(accountsCanvas.popularBanksLabel).toBeVisible();
    const bankNames = await accountsCanvas.listOfBanks.allTextContents()
    const sortedBankNames = [...bankNames].sort((a, b) => a.localeCompare(b));
    expect(bankNames).toEqual(sortedBankNames);
    
    //for loop: Click on each bank from json list one by one and verify login page is opened
    for (const bank of bankslist) {
      const bankButton = accountsCanvas.getBankByName(bank.bank);
      await expect.soft(bankButton).toBeVisible();
      await bankButton.click();
      await page.waitForLoadState('networkidle');
      await expect.soft(accountsCanvas.bankHeaderTitle).toHaveText(bank.bank);
      //add screenshot to html report
      await test.info().attach(`screenshot-${bank.bank}`, {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
      //click on cancel button
      await accountsCanvas.canvasCancelButton.click();
      await page.waitForLoadState('networkidle');
      await expect.soft(accountsCanvas.accontsOffcanvasTitle).toBeVisible();
    }
    
    await accountsCanvas.accountsCanvasCloseButton.click();
    await expect.soft(accountsCanvas.accontsOffcanvasTitle).not.toBeVisible();
  });
});