// Standard Web Response
import { RestService } from './rest-service';

// Standard WebServices is API
export abstract class WebService extends RestService {
    // The host configuration, i.e. https://google.com
    public abstract host: string;
}
