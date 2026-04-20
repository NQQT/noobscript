import { RestService, RestServiceResponseBody } from './classes';

type Config = {
    bin: string;
};

export type FileBinFile = {};

const asFileBinFile = (content: any) => {
    return {
        filename: content.filename,
        filesize: content.bytes,
        checksum: content.sha256,
        updated: content.updated_at
    } as FileBinFile;
};

export class Filebin extends RestService {
    protected host = 'http://localhost:3000';
    private bin: string;
    private proxyBase = 'https://filebin.net';

    constructor(config: Config) {
        super();
        this.bin = config.bin;
    }

    // Override buildUrl to inject X-Proxy-Target header approach,

    async list() {
        const result = await fetch(this.fileBinUrl(''), {
            headers: { Accept: 'application/json' },
            credentials: 'include'
        });
        const json = await result.json();
        return json.files.map((file: any) => asFileBinFile(file));
    }

    async upload(data: string, filename: string): Promise<RestServiceResponseBody> {
        const result = await fetch(this.fileBinUrl(filename), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                Accept: 'application/json'
            },
            body: data,
            credentials: 'include'
        });
        const json = await result.json();
        return asFileBinFile(json.file);
    }

    async download(filename: string): Promise<string> {
        const result = await fetch(this.fileBinUrl(filename), {
            headers: {
                Accept: '*/*',
                Cookie: 'verified=2024-05-24'
            },
            credentials: 'include'
        });
        return result.text();
    }

    // OR just construct URLs correctly:
    private fileBinUrl(path: string): string {
        return `${this.host}/?url=${encodeURIComponent(`${this.proxyBase}/${this.bin}/${path}`)}`;
    }
}
