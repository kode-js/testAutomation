import { Locator } from '@playwright/test';

export class UiElement {
  readonly locator: Locator;
  readonly description: string;

  private constructor(locator: Locator, description: string) {
    this.locator = locator;
    this.description = description;
  }

  static of(locator: Locator, description: string): UiElement {
    return new UiElement(locator, description);
  }
}