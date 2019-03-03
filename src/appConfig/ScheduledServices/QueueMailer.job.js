try {
    let processor = new MyServiceTypes.EmailProcessor();
    let messageId = await processor.processMessage();
    _SupercondActor.Logger.logInfo('Mailer job done', messageId);
}
catch (err) {
    _SupercondActor.Logger.logError('Mailer error: ' + err);
}
