import { type Locator, type Page } from '@playwright/test';

export class TopOutboundCashDestCanvas {
    readonly page: Page;
    readonly checkExpand: Locator;
    readonly checkCollapse: Locator;
    readonly cardMemberExpand: Locator;
    readonly cardMemberCollapse: Locator
    readonly checkTotal: Locator;
    readonly checkSubTransactions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkExpand = page.locator("xpath=//div[@id='CHECK']//button[@aria-expanded='false']");
        this.checkCollapse = page.locator("xpath=//div[@id='CHECK']//button[@aria-expanded='true']");
        this.cardMemberExpand = page.locator("xpath=//div[contains(@id,'CARDMEMBER SERV')]//button[@aria-expanded='false']");
        this.cardMemberCollapse = page.locator("xpath=//div[contains(@id,'CARDMEMBER SERV')]//button[@aria-expanded='true']");
        this.checkTotal = page.locator("xpath=//div[@id='CHECK']//div[@class='total']");
        this.checkSubTransactions = page.locator("xpath=//div[@id='CHECK']//td[4]");
    }
}