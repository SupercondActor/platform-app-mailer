try {
    let processor = MyEntryPoints.getEmailProcessor();
    processor.processMessage().then(r => {
        console.log('Mailer job done', r);
    }).catch(err => {
        console.error('Mailer error', err);
    });
}
catch (er) {
    console.error('Mailer error', er);
}
