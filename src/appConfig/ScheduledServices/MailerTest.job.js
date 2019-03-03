try {
    let tester = new MyServiceTypes.QueueTester(_SupercondActor);
    let r = await tester.queueTestEmail();
    console.log('Tester job done', r);
}
catch (er) {
    console.error('Tester error: ' + er);
}