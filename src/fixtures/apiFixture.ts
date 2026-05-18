import { test as base } from "@playwright/test";
import { RequestHandler } from "../api/requestHandler";
import { API_URL } from "../../test-data/urls"
import { APILogger } from "../utils/logger"
import { setCustomExpectLogger } from "../utils/customAssertion"

export type FixtureOptions = {
    API: RequestHandler
}

export const test = base.extend<FixtureOptions>({
    API: async ({ request }, use) => {
        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHanlder = new RequestHandler(request, API_URL, logger);
        await use(requestHanlder)
    }
})