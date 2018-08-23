try {
    let tester = getQueueTester();
    tester.queueTestEmail().then(r => {
        console.log('Tester job done', r);
    }).catch(err => {
        console.error('Tester error', err);
    });
}
catch (er) {
    console.error('Tester error', er);
}