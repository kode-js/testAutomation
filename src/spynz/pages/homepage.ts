import { expect, type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class HomePage {
    readonly page: Page;
    readonly navMerchant: UiElement;
    
    constructor(page: Page) {
        this.page = page;
        this.navMerchant = UiElement.of(page.locator('#MenuLink-merchant'), 'Merchant navigation link');
        
    }
}