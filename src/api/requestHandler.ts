import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";
import { APILogger } from "../utils/logger";

export class RequestHandler {

    private request: APIRequestContext
    private logger: APILogger;
    private baseUrl: string | undefined;
    private apiPath: string = ''
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};

    constructor(request: APIRequestContext, APIBaseUrl: string, logger: APILogger) {
        this.request = request;
        this.baseUrl = APIBaseUrl;
        this.logger = logger;
    }

    url(url: string): RequestHandler {
        this.baseUrl = url;
        return this;
    }

    path(path: string): RequestHandler {
        this.apiPath = path;
        return this;
    }

    params(params: object): RequestHandler {
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>): RequestHandler {
        this.apiHeaders = headers;
        return this;
    }

    body(body: object): RequestHandler {
        this.apiBody = body;
        return this;
    }

    private getUrl(): string {
        const url = new URL(`${this.baseUrl}${this.apiPath}`);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value)
        }
        return url.toString();
    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function): void {
        if (actualStatus !== expectedStatus) {
            const logs = this.logger.getRecentLogs();
            const error = new Error(`Expected status code: ${expectedStatus} but got ${actualStatus}\n\nAPI Logs:\n\n${logs}`)
            Error.captureStackTrace(error, callingMethod)
            throw error
        }
    }

    private cleanupFields() {
        this.apiBody = {}
        this.apiHeaders = {}
        this.baseUrl = undefined;
        this.apiPath = '';
        this.queryParams = {}
    }

    async getRequest(statusCode: number) {
        const url = this.getUrl()
        this.logger.logRequest("GET", url, this.apiHeaders)
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        })
        this.cleanupFields()

        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        this.logger.logResponse(actualStatusCode, responseJSON)
        this.statusCodeValidator(actualStatusCode, statusCode, this.getRequest)

        return responseJSON
    }

    async postRequest(statusCode: number) {
        const url = this.getUrl()
        this.logger.logRequest("POST", url, this.apiHeaders, this.apiBody)
        const response = await this.request.post(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })
        this.cleanupFields()

        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        this.logger.logResponse(actualStatusCode, responseJSON)
        this.statusCodeValidator(actualStatusCode, statusCode, this.postRequest)

        return responseJSON
    }

    async putRequest(statusCode: number) {
        const url = this.getUrl()
        this.logger.logRequest("PUT", url, this.apiHeaders, this.apiBody)
        const response = await this.request.put(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })
        this.cleanupFields()

        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        this.logger.logResponse(actualStatusCode, responseJSON)
        this.statusCodeValidator(actualStatusCode, statusCode, this.putRequest)

        return responseJSON
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl()
        this.logger.logRequest("DELETE", url, this.apiHeaders, this.apiBody)

        const response = await this.request.delete(url, {
            headers: this.apiHeaders
        })
        this.cleanupFields()

        const actualStatusCode = response.status()

        this.logger.logResponse(actualStatusCode)
        this.statusCodeValidator(actualStatusCode, statusCode, this.deleteRequest)
    }


}