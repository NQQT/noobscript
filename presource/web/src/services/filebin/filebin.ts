import { RestService, RestServiceResponseBody } from '../rest-service';

type Config = {
    bin: string;
};

export class Filebin extends RestService {
    host = 'https://filebin.net';

    constructor(config: Config) {
        super();
        const { bin } = config;
        this.host = `${this.host}/${bin}/`;
    }

    /**
     * Uploads file content to the configured Filebin bin.
     * @param data - The raw file content as a string.
     * @param filename - The name to give the file on Filebin.
     * @returns The Filebin response confirming the upload.
     */
    async upload(data: string, filename: string): Promise<RestServiceResponseBody> {
        return this.post(filename, {
            header: {
                'Content-Type': 'application/octet-stream',
                filename
            },
            body: data
        });
    }

    /**
     * Downloads a file from the configured Filebin bin.
     * @param filename - The name of the file to retrieve.
     * @returns The raw file content as a string (wrapped in { data: '...' }).
     */
    async download(filename: string): Promise<string> {
        const response = await this.get(filename);
        return response.data as string;
    }
}
