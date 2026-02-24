import { type Locator, type Page } from '@playwright/test';
import { UiElement } from '../../utils/UiElement';

export class TopOutboundCashDestCanvas {
    readonly page: Page;
    readonly checkExpand: UiElement;
    readonly checkCollapse: UiElement;
    readonly cardMemberExpand: UiElement;
    readonly cardMemberCollapse: UiElement;
    readonly checkTotal: UiElement;
    readonly checkSubTransactions: UiElement;

    constructor(page: Page) {
        this.page = page;
        this.checkExpand = UiElement.of(page.locator("xpath=//div[@id='CHECK']//button[@aria-expanded='false']"), 'Check expand button');
        this.checkCollapse = UiElement.of(page.locator("xpath=//div[@id='CHECK']//button[@aria-expanded='true']"), 'Check collapse button');
        this.cardMemberExpand = UiElement.of(page.locator("xpath=//div[contains(@id,'CARDMEMBER SERV')]//button[@aria-expanded='false']"), 'Cardmember expand button');
        this.cardMemberCollapse = UiElement.of(page.locator("xpath=//div[contains(@id,'CARDMEMBER SERV')]//button[@aria-expanded='true']"), 'Cardmember collapse button');
        this.checkTotal = UiElement.of(page.locator("xpath=//div[@id='CHECK']//div[@class='total']"), 'Check total');
        this.checkSubTransactions = UiElement.of(page.locator("xpath=//div[@id='CHECK']//td[4]"), 'Check sub transactions cell');
    }

    getScrollableCanvasFor(tickName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@id='${tickName}']//div[contains(@style,'scroll')]`), `Scrollable canvas for ${tickName}`);
    }

    getTotalFor(tickName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@id='${tickName}']//div[@class='total']`), `Total for ${tickName}`);
    }

    getSubTransactionsFor(tickName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@id='${tickName}']//td[4]`), `Sub transactions for ${tickName}`);
    }

    getExpandButtonFor(tickName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@id='${tickName}']//button[@aria-expanded='false']`), `Expand button: ${tickName}`);
    }

    getCollapseButtonFor(tickName: string): UiElement {
        return UiElement.of(this.page.locator(`xpath=//div[@id='${tickName}']//button[@aria-expanded='true']`), `Collapse button: ${tickName}`);
    }
}