import { expect as baseExpect } from "@playwright/test"
import { APILogger } from "./logger"
import { schemaValidator } from "./schemaValidator";

declare global {
    namespace PlaywrightTest {
        interface Matchers<R, T> {
            toMatchPartialObject(expected: T): R
            toMatchSchema(dirName: string, fileName: string, createSchemaFlag?: boolean): Promise<R>
        }
    }
}

let apiLogger: APILogger;


export const setCustomExpectLogger = (logger: APILogger) => {
    apiLogger = logger
}

export const expect = baseExpect.extend({
    toMatchPartialObject(received: any, expected: any) {
        let pass: boolean
        let logs: string

        try {
            const expectation = this.isNot ? baseExpect(received).not : baseExpect(received);
            expectation.toEqual(expect.objectContaining(expected))
            pass = true;
        } catch (error: any) {
            pass = false;
            logs = apiLogger.getRecentLogs()
        }

        if (this.isNot) {
            pass = !pass;
        }

        const filteredReceived = Object.fromEntries(
            Object.keys(expected).map(key => [key, received[key]])
        )

        const message = () => this.utils.matcherHint('toMatchPartialObject', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            (this.isNot
                ? `It is assumed that the object will NOT contain the selected parameters, but as a result they were received:\n` +
                `${JSON.stringify(expected, null, 2)}`
                : this.utils.printDiffOrStringify(expected, filteredReceived, "Expected", "Received", true)) +
            `\n\nAPI Logs:\n\n${logs!}`

        return {
            message,
            pass,
            name: 'toMatchPartialObject',
            expected,
            actual: received,
        };
    },

    async toMatchSchema(received: any, dirName: string, fileName: string, createSchemaFlag: boolean = false) {
        let pass: boolean
        let logs: string
        let message: string;

        try {
            await schemaValidator(dirName, fileName, received, createSchemaFlag)
            pass = true;
        } catch (error: any) {
            pass = false;
            const logs = apiLogger.getRecentLogs()
            message = `${error.message}\n\nRecent API Activity: \n${logs}`
        }

        if (this.isNot) {
            pass = !pass;
        }

        return {
            message: () => message,
            pass,
            name: 'toMatchSchema',
            actual: received,
        };
    }
})