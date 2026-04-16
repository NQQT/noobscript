import { RestService, RestServiceResponseBody } from './classes';

type Config = {
    bin: string;
};

export type FileBinFile = {};

const asFileBinFile = (content: any) => {
    return {
        filename: content.filename,
        filesize: content.bytes,
        checksum: content.sha256
    } as FileBinFile;
};

export class Filebin extends RestService {
    host = 'https://filebin.net';

    constructor(config: Config) {
        super();
        const { bin } = config;
        this.host = `${this.host}/${bin}/`;
    }

    async list() {
        const result = await this.get('');
        return result.files.map((file: any) => {
            return asFileBinFile(file);
        });
    }

    /**
     * Uploads file content to the configured Filebin bin.
     * @param data - The raw file content as a string.
     * @param filename - The name to give the file on Filebin.
     * @returns The Filebin response confirming the upload.
     */
    async upload(data: string, filename: string): Promise<RestServiceResponseBody> {
        const content = await this.post(filename, {
            header: {
                'Content-Type': 'application/octet-stream',
                filename
            },
            body: data
        });

        return asFileBinFile(content.file);
    }

    /**
     * Downloads a file from the configured Filebin bin.
     * @param filename - The name of the file to retrieve.
     * @returns The raw file content as a string (wrapped in { data: '...' }).
     */
    async download(filename: string): Promise<string> {
        const response = await this.get(filename, {
            header: {
                Cookie: 'verified=2024-05-24',
                Accept: '*/*'
            }
        });
        return response.data as string;
    }
}
