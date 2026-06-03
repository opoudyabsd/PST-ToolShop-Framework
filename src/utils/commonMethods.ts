import { type Locator } from '@playwright/test';

export async function firstElementWaitForStable(locator: Locator): Promise<void> {
    await locator.first().waitFor({ state: "visible" })
}