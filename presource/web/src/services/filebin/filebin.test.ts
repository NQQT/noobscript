import { Filebin } from '@presource/web';

describe('filebin requirement', () => {
    // Use a unique bin name so each test run is isolated
    const binName = `noobscript-test-${Date.now()}`;
    const filename = 'hello.txt';
    const content = 'hello world!';
    const filebin = new Filebin({ bin: binName });

    it('should upload a file to filebin and retrieve its content', async () => {
        // Upload the file — real HTTP POST to filebin.net
        const uploadResponse = await filebin.upload(content, filename);
        expect(uploadResponse).toBeDefined();
        // Expecting the bin name is correct
        expect(uploadResponse.bin.id, binName);
        // Expect the file name to be correct
        expect(uploadResponse.file.filename, filename);
    });

    it('should able to retrieve the content', async () => {
        // Download the file — real HTTP GET from filebin.net
        const downloaded = await filebin.download(filename);

        // Ensuring the downloaded has the same content
        expect(downloaded).toBe(content);
    });
});
