import { EmailProcessor } from "./src/app/email-processor";
import { QueueTester } from "./src/app/queue-tester";

// global entry points should be listed here

(global as any).getEmailProcessor = function () {
    return new EmailProcessor();
};

(global as any).getQueueTester = function () {
    return new QueueTester();
};