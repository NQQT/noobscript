// Standard HTTP request headers
export type RestServiceRequestHeader = {
    'Content-Type'?:
        | 'application/json'
        | 'application/x-www-form-urlencoded'
        | 'multipart/form-data'
        | 'text/plain'
        | 'application/octet-stream';
    Accept?: string;
    Authorization?: string;
    'Accept-Language'?: string;
    'Accept-Encoding'?: string;
    'Cache-Control'?: 'no-cache' | 'no-store' | 'max-age=0' | 'must-revalidate';
    'X-Request-ID'?: string;
    'X-Correlation-ID'?: string;
    [key: string]: string | undefined;
};

export type RestServiceResponseBody = any;

export type RestServiceConfig = {
    header?: RestServiceRequestHeader;
    body?: Record<string, unknown> | BodyInit; // Accepts JSON objects, strings, FormData, Blob, etc.
};

// For Implementing Rest Service Configuration
export abstract class RestService {
    protected abstract host: string;

    async get(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const url = this.buildUrl(endpoint, input?.body);
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
            body: this.buildBody(input?.body)
        });
        return this.handleResponse(response);
    }

    async delete(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const url = this.buildUrl(endpoint, input?.body);
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
            body: this.buildBody(input?.body)
        });
        return this.handleResponse(response);
    }

    async put(endpoint: string, input?: RestServiceConfig): Promise<RestServiceResponseBody> {
        const response = await fetch(`${this.host}${endpoint}`, {
            method: 'PUT',
            headers: this.buildHeaders(input?.header),
            body: this.buildBody(input?.body)
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

    private buildBody(body?: Record<string, unknown> | BodyInit): BodyInit | undefined {
        if (body === undefined) return undefined;
        if (
            typeof body === 'string' ||
            body instanceof FormData ||
            body instanceof Blob ||
            body instanceof URLSearchParams ||
            body instanceof ArrayBuffer ||
            ArrayBuffer.isView(body)
        ) {
            return body as BodyInit;
        }
        // Plain object — serialize to JSON
        return JSON.stringify(body);
    }

    private buildUrl(endpoint: string, body?: Record<string, unknown> | BodyInit): string {
        const url = new URL(`${this.host}${endpoint}`);
        if (
            body &&
            typeof body === 'object' &&
            !(body instanceof FormData) &&
            !(body instanceof Blob) &&
            !(body instanceof URLSearchParams) &&
            !(body instanceof ArrayBuffer) &&
            !ArrayBuffer.isView(body)
        ) {
            Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
                if (typeof value !== 'object' && value !== undefined) {
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
        const contentType = response.headers.get('Content-Type') ?? '';
        if (contentType.includes('application/json')) {
            return response.json() as Promise<RestServiceResponseBody>;
        }
        const text = await response.text();
        return { data: text };
    }
}
