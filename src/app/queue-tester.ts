import { QueueProvider } from "./queue-provider";
import { appSettings } from "./appsettings";
import { EmailMessage } from "./email-message";

export class QueueTester {

    // _SupercondActor context object must be injected at runtime
    constructor(private supercondActor: SupercondActor.ISupercondActor) { }

    async queueTestEmail(): Promise<boolean> {

        let queue = new QueueProvider(appSettings.azureQueue.queueConnectionString);
        let message = new EmailMessage();
        message.fromAddr = appSettings.test.fromEmail;
        message.toAddr = appSettings.test.toEmail;
        message.subject = 'Test email from the Corporate mailer service sample';
        message.bodyText = `Test message from the Corporate mailer service sample. ${new Date()}`;
        message.bodyHtml = `<h1>Test message from the Corporate mailer service sample</h1> 
        <p>Created: ${new Date()}</p>
        <p><a href="https://www.SupercondActor.com">SupercondActor Business Platform for Microsoft Azure Service Fabric</a></p>`;

        try {
            await queue.sendQueueMessage(appSettings.azureQueue.queueName, message);
            this.supercondActor.Logger.logInfo('message sent to the queue.');
            return true;
        }
        catch (err) {
            this.supercondActor.Logger.logError('Error sending message: ' + err);
            return null;
        }
    }
}