import AWS = require('aws-sdk');
import { EmailMessage } from './email-message';

export class EmailProvider {

    constructor(accessKeyId: string, secretKey: string, region: string) {
        AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretKey, region: region });
    }

    sendEmail(message: EmailMessage): Promise<string> {
        console.log('Sending message', message)
        let msgBody: AWS.SES.Body = {};
        if (!!message.bodyHtml) {
            msgBody.Html = {
                Charset: "UTF-8",
                Data: message.bodyHtml
            };
        }
        if (!!message.bodyText) {
            msgBody.Text = {
                Charset: "UTF-8",
                Data: message.bodyText
            };
        }

        let sendEmailParams: AWS.SES.SendEmailRequest = {
            Destination: { /* required */
                CcAddresses: [],
                ToAddresses: [message.toAddr]
            },
            Message: { /* required */
                Body: msgBody,
                Subject: {
                    Charset: 'UTF-8',
                    Data: message.subject
                }
            },
            Source: message.fromAddr, /* required */
            ReplyToAddresses: [message.fromAddr],
        };
        return new Promise<string>((resolve, reject) => {
            var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(sendEmailParams).promise();
            sendPromise.then(data => {
                console.log('Returned from Amazon:', data);
                resolve(data.MessageId);
            }).catch(err => {
                reject(err);
            });
        });
    }
}