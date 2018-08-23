import { QueueProvider } from "./queue-provider";
import { EmailProvider } from "./email-provider";
import { appSettings } from "./appsettings";
import { EmailMessage } from "./email-message";

export class EmailProcessor {

    async processMessage(): Promise<string> {

        let queue = new QueueProvider(appSettings.azureQueue.queueConnectionString);
        let queueMessage;
        try {
            queueMessage = await queue.receiveQueueMessage(appSettings.azureQueue.queueName);
        }
        catch (err) {
            return null;
        }

        let mailProvider = new EmailProvider(
            appSettings.amazonSES.accessKeyId,
            appSettings.amazonSES.secretAccessKey,
            appSettings.amazonSES.region
        );

        let mailMessage = JSON.parse(queueMessage.body) as EmailMessage;

        return await mailProvider.sendEmail(mailMessage)
    }
}