import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

export class RequestHandler {

    private request: APIRequestContext
    private baseUrl: string;
    private apiPath: string = ''
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};

    constructor(request: APIRequestContext, APIBaseUrl: string) {
        this.request = request;
        this.baseUrl = APIBaseUrl;
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

    async getRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        })

        expect(response.status()).toEqual(statusCode)
        const responseJSON = await response.json()

        return responseJSON
    }

    async postRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.post(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })

        expect(response.status()).toEqual(statusCode)
        const responseJSON = await response.json()

        return responseJSON
    }

    async putRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.put(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })

        expect(response.status()).toEqual(statusCode)
        const responseJSON = await response.json()

        return responseJSON
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.delete(url, {
            headers: this.apiHeaders
        })

        expect(response.status()).toEqual(statusCode)
    }


}