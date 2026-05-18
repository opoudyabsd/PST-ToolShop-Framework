export class APILogger {

    private recentLogs: any[] = [];

    logRequest(method: string, url: string, headers: Record<string, string>, body?: any): void {
        const logData = { method, url, headers, body };
        this.recentLogs.push({
            type: "Request Details",
            data: logData
        })
    }

    logResponse(statusCode: number, body?: any): void {
        const logData = { statusCode, body }
        this.recentLogs.push({
            type: "Response Details",
            data: logData
        })
    }

    getRecentLogs(): string {
        const logs = this.recentLogs.map(log => {
            return `==== ${log.type} ====\n\n${JSON.stringify(log.data, null, 2)}\n________________________________________`
        }).join('\n\n')

        return logs
    }

}