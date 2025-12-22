import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
// import { HomePage } from '../pages/homepage';
// import { MikomiPage } from '../pages/mikomiConnection';
// import { AccountsCanvas } from '../pages/accountsCanvas';
// import { TopOutboundCashDestCanvas } from '../pages/topOutboundCashDestCanvas';
import { sleep } from '../../utils/utils';
import login from '../testdata/login.json' assert { type: 'json' };

test.describe('Test case 1', () => {

  test('Verify Connection', async ({ page }) => {
    const bankName = 'Akoya Mikomo bank';
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(login.spynz.username, login.spynz.password);
    await expect.soft(page).toHaveTitle(login.spynz.homepageTitle);

    await sleep(5000);
    
  });
});