// Standard HTTP request headers
export type RestServiceRequestHeader = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    Accept?: string;
    Authorization?: string;
    'Accept-Language'?: string;
    'Accept-Encoding'?: string;
    'Cache-Control'?: 'no-cache' | 'no-store' | 'max-age=0' | 'must-revalidate';
    'X-Request-ID'?: string;
    'X-Correlation-ID'?: string;
    [key: string]: string | undefined; // Allow custom/non-standard headers
};

export type RestServiceRequestBody = {
    [key: string]: string | number | boolean | RestServiceRequestBody;
};

export type RestServiceResponseBody = {
    [key: string]: string | number | boolean | RestServiceResponseBody;
};

export type RestServiceConfig = {
    header?: RestServiceRequestHeader;
    request?: RestServiceRequestBody;
};

// For Implementing Rest Service Configuration
export abstract class RestService {
    protected abstract host: string;

    async get(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const url = this.buildUrl(endpoint, input?.request);
        const response = await fetch(url, {
            method: 'GET',
            headers: this.buildHeaders(input?.header)
        });
        return this.handleResponse(response);
    }

    async post(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const response = await fetch(`${this.host}${endpoint}`, {
            method: 'POST',
            headers: this.buildHeaders(input?.header),
            body: input?.request ? JSON.stringify(input.request) : undefined
        });
        return this.handleResponse(response);
    }

    async delete(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const url = this.buildUrl(endpoint, input?.request);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.buildHeaders(input?.header)
        });
        return this.handleResponse(response);
    }

    async patch(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const response = await fetch(`${this.host}${endpoint}`, {
            method: 'PATCH',
            headers: this.buildHeaders(input?.header),
            body: input?.request ? JSON.stringify(input.request) : undefined
        });
        return this.handleResponse(response);
    }

    async put(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const response = await fetch(`${this.host}${endpoint}`, {
            method: 'PUT',
            headers: this.buildHeaders(input?.header),
            body: input?.request ? JSON.stringify(input.request) : undefined
        });
        return this.handleResponse(response);
    }

    private buildHeaders(header?: RestServiceRequestHeader): HeadersInit {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...header
        };
    }

    private buildUrl(endpoint: string, params?: RestServiceRequestBody): string {
        const url = new URL(`${this.host}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (typeof value !== 'object') {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return url.toString();
    }

    private async handleResponse(response: Response): Promise<RestServiceResponseBody> {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<RestServiceResponseBody>;
    }
}
