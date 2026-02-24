import { UiElement } from './UiElement';
import { Page, test} from '@playwright/test';

export async function waitFor(page: Page, seconds: number) {
    await page.waitForTimeout(seconds * 1000);
}

export async function clickElement(element: UiElement) {
    await test.step(`Clicking on element: ${element.description}`, async () => {
        await element.locator.click();
    });
}

export async function enterText(element: UiElement, value: string) {
    if (value && value.trim() !== '' && !value.includes('null')) {
        await test.step(`Entering text: ${value} at ${element.description}`, async () => {
            await element.locator.fill(value);
        });
    }
}

//Export function to scrollable element like $x("//div[@id='Stan Howard']//div[contains(@style,'scroll')]")[0].scrollBy(0,1000)
export async function scrollElementDown(element: UiElement) {
    //await test.step(`Scrolling down element: ${element.description}`, async () => {
        await element.locator.evaluate((el) => {
            el.scrollBy(0, 1000);
        });
    //});
}