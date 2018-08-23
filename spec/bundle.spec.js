require('../dist/Scripts/bundle');

describe("EmailProcessor", () => {
    let result;

    // publish test message to the queue
    beforeAll(async (done) => {
        let tester = getQueueTester();
        await tester.queueTestEmail();
        console.log("published QueueMessage.");
        done();
    });

    // run async test to receive queue message and send email
    beforeEach(async (done) => {
        let processor = getEmailProcessor();
        result = await processor.processMessage();
        console.log('bundle test', result);
        done();
    });

    // check result
    it("should be able to send email", () => {
        expect(result).toBeDefined();
    });
});