import { Filebin } from '@presource/web';

describe('filebin requirement', () => {
    it('should allows upload of file', () => {
        // Create a new filebin
        const filebin = new Filebin({
            bin: 'testing'
        });

        console.log(filebin.host);
    });
});
