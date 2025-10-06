//import requried modules
import { test, expect } from '@playwright/test';

// create a utility funtion to sleep for x milliseconds
export function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// create a utility function to click an element
export async function click(element: any, elementName: string) {
  await element.click();
}

// create a utility function to type text into an element
export async function type(element: any, elementName: string, text: string) {
  await element.fill(text);
}

// create a utility function to select an option from a dropdown
export async function selectOption(element: any, elementName: string, option: string) {
  await element.selectOption(option);
}

// create a utility function to get text from an element
export async function getText(element: any, elementName: string) {
  return await element.textContent();
}

// create a utility function to hover over an element
export async function hover(element: any, elementName: string) {
  await element.hover();
}

// create a utility function to scroll to an element
export async function scrollTo(element: any, elementName: string) {
  await element.scrollIntoViewIfNeeded();
}
// create a utility function to click an element with allure step
export async function clickWithStep(element: any, elementName: string) {
  await test.step(`Clicking on ${elementName}`, async () => {
    await element.click();
  });
}

// create a utility function to type text into an element with allure step
export async function typeWithStep(element: any, elementName: string, text: string) {
  await test.step(`Typing ${text} into ${elementName}`, async () => {
    await element.fill(text);
  });
}

// create a utility function to select an option from a dropdown with allure step
export async function selectOptionWithStep(element: any, elementName: string, option: string) {
  await test.step(`Selecting ${option} from ${elementName}`, async () => {
    await element.selectOption(option);
  });
}

// create a utility function to get text from an element with allure step
export async function getTextWithStep(element: any, elementName: string) {
  let text = '';
  await test.step(`Getting text from ${elementName}`, async () => {
    text = await element.textContent();
  });
  return text;
}

// create a utility function to hover over an element with allure step
export async function hoverWithStep(element: any, elementName: string) {
  await test.step(`Hovering over ${elementName}`, async () => {
    await element.hover();
  });
}

// create a utility function to scroll to an element with allure step
export async function scrollToWithStep(element: any, elementName: string) {
  await test.step(`Scrolling to ${elementName}`, async () => {
    await element.scrollIntoViewIfNeeded();
  });
}