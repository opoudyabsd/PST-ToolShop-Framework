import { test as base, expect } from "@playwright/test";
import { RequestHandler } from "../api/requestHandler";

export type FixtureOptions = {
    API: RequestHandler
}

export const test = base.extend<FixtureOptions>({
    API: async ({ }, use) => {
        const requestHanlder = new RequestHandler();
        await use(requestHanlder)
    }
})