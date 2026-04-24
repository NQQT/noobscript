import { WebService } from './web-service';

export abstract class FileService extends WebService {
    // For uploading something to the file service
    abstract upload(data: string): any;

    // Must return data string
    abstract download(input: any): string;
}
