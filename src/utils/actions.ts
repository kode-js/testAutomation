import * as allure from "allure-js-commons";
import { UiElement } from './UiElement';
import { Page, Locator, expect } from '@playwright/test';


export async function waitFor(page: Page, seconds: number) {
    await page.waitForTimeout(seconds * 1000);
}

export async function clickElement(element: UiElement) {
    await allure.step(`Clicking on element: ${element.description}`, async () => {
        await element.locator.click();
    });
}

export async function enterText(element: UiElement, value: string) {
    if (value && value.trim() !== '' && !value.includes('null')) {
        await allure.step(`Entering text: ${value} at ${element.description}`, async () => {
            await element.locator.fill(value);
        });
    }
}

