import { EmailProcessor } from "./app/email-processor";
import { QueueTester } from "./app/queue-tester";

// Entry points should be listed here.

// These global functions are just an example.
// You can use any kind of coding style here, the only requirement is that
// you should be able to call your entry point from your service's job script at runtime.

export class MyEntryPointsDefinition {
    getEmailProcessor = function () {
        return new EmailProcessor();
    };

    getQueueTester = function () {
        return new QueueTester();
    };
}

(global as any).MyEntryPoints = new MyEntryPointsDefinition();
