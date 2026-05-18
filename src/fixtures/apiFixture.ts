import { test as base } from "@playwright/test";
import { RequestHandler } from "../api/requestHandler";
import { API_URL } from "../../test-data/urls"


export type FixtureOptions = {
    API: RequestHandler
}

export const test = base.extend<FixtureOptions>({
    API: async ({ request }, use) => {
        const requestHanlder = new RequestHandler(request, API_URL);
        await use(requestHanlder)
    }
})