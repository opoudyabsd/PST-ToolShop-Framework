import { API_URL } from "../../test-data/urls"
export class RequestHandler {
    private baseUrl: string = API_URL;
    private apiPath: string = ''
    private queryParams: object = {};
    private apiHeaders: object = {};
    private apiBody: object = {};

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

    headers(headers: object): RequestHandler {
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
}