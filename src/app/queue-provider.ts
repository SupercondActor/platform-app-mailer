import azure = require('azure-sb');

export class QueueProvider {
    private serviceBusService: any;
    constructor(sbConnectionString: string) {
        this.serviceBusService = azure.createServiceBusService(sbConnectionString);
    }

    createQueueIfNotExists(queueName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.serviceBusService.createQueueIfNotExists(queueName, function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    sendQueueMessage(queueName: string, message: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            var queueMessage = {
                body: JSON.stringify(message),
                customProperties: {
                    testproperty: 'TestValue'
                }
            };
            this.serviceBusService.sendQueueMessage(queueName, queueMessage, function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    receiveQueueMessage(queueName: string): Promise<any> {
        let serviceBusService = this.serviceBusService;
        return new Promise<any>((resolve, reject) => {
            serviceBusService.receiveQueueMessage(
                queueName,
                { isPeekLock: true, timeoutIntervalInS: 1 },
                function (error, receivedMessage) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        serviceBusService.deleteMessage(receivedMessage, function (deleteError) {
                            if (deleteError) {
                                reject(deleteError);
                            }
                            else {
                                resolve(receivedMessage);
                            }
                        });
                    }
                });
        });
    }

}