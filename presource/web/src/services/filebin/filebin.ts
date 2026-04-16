import { FileService } from '../file-service';

type Config = {
    bin: string;
};

export class Filebin extends FileService {
    host = 'https://filebin.net';

    // Building the bin configuration
    constructor(config: Config) {
        super();
        const { bin } = config;
        // Adding in the required bin
        this.host = `${this.host}/${bin}/`;
    }

    upload(data: string) {
        // TODO How to upload file?
        this.post('test.txt', {
            request: {}
        });

        // Should return entire response
    }

    download(input: any): string {
        this.get('test.txt');

        // should return the data/stream binary of the text
    }
}
