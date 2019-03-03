try {
    let tester = new MyServiceTypes.QueueTester(_SupercondActor);
    let r = await tester.queueTestEmail();
    _SupercondActor.Logger.logInfo('Tester job done', r);
}
catch (er) {
    _SupercondActor.Logger.logError('Tester error: ' + er);
}