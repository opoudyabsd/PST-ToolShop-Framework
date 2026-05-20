import { test as base, expect } from "@playwright/test";
import { RequestHandler } from "../api/requestHandler";
import { API_URL, API_PATH } from "../../test-data/urls"
import { APILogger } from "../utils/logger"
import { setCustomExpectLogger } from "../utils/customAssertion"
import { ADMIN_ACCOUNT, BEARER_REGEXP_MATCH } from "../../test-data/requestData"


export type FixtureOptions = {
    API: RequestHandler,
    adminToken: string
}

export const test = base.extend<FixtureOptions>({
    API: async ({ request }, use) => {
        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHanlder = new RequestHandler(request, API_URL, logger);
        await use(requestHanlder)
    },

    adminToken: async ({ API }, use) => {
        const response = await API
            .path(API_PATH.user.login)
            .body(ADMIN_ACCOUNT)
            .postRequest(200)
        const accessToken = response["access_token"]

        expect(accessToken).toMatch(BEARER_REGEXP_MATCH)
        expect(response).toMatchPartialObject({
            token_type: "bearer",
            expires_in: 300
        })

        use(accessToken)
    }
})