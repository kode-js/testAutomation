import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homepage';
import bankslist from '../testdata/banks.json' assert { type: 'json' };

test.describe('Test case 1', () => {
  
  test('Verify Connection', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.login('sep20@mailinator.com', 'First@1234');
    await expect(page).toHaveTitle('Bank of America | Online Banking | Connected Apps');
    await homePage.accountsHeaderButton.click();
    await homePage.getBankByName('Akoya Mikomo bank').click();
    await homePage.termsAndConditionsCheckbox.check();
    await page.waitForLoadState('networkidle');
    await homePage.proceedButton.click();
    await page.waitForLoadState('networkidle');

    //mikomo login
    await loginPage.mikomoLogin('mikomo_2023', 'mikomo_2023');
    await page.waitForLoadState('networkidle');
  });

});

