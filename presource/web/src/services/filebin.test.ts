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

        // Ensuring the file uploaded
        expect(uploadResponse).toStrictEqual({
            filename,
            filesize: 12,
            checksum: '7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9'
        });
    });

    it('should returns the file listing', async () => {
        const list = await filebin.list();
        // Expecting the list to matches
        expect(list).toStrictEqual([
            {
                filename,
                filesize: 12,
                checksum: '7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9'
            }
        ]);
    });

    it('should able to retrieve the content', async () => {
        // Download the file — real HTTP GET from filebin.net
        const downloaded = await filebin.download(filename);

        // Ensuring the downloaded has the same content
        expect(downloaded).toBe(content);
    });
});
