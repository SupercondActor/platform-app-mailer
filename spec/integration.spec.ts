import { EmailProcessor } from "../src/app/email-processor";
import { QueueTester } from "../src/app/queue-tester";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("EmailProcessor", () => {
    let result: any;

    // publish test message to the queue
    beforeAll(async (done) => {
        let tester = new QueueTester();
        await tester.queueTestEmail();
        console.log("published QueueMessage.");
        done();
    });

    // run async test to receive queue message and send email
    beforeEach(async (done) => {
        let processor = new EmailProcessor();
        result = await processor.processMessage();
        console.log("sent email ID:", result);
        done();
    });

    // check result
    it("should be able to send email", () => {
        expect(result).toBeDefined();
    });
});