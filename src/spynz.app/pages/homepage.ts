import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly navMerchant: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.navMerchant = page.locator('#MenuLink-merchant');;
        
    }
}