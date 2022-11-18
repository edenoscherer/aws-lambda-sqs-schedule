import { ScheduledEvent } from 'aws-lambda';
import { SQS } from 'aws-sdk';

export const handler = async (event: ScheduledEvent) => {
    console.log(JSON.stringify(event, null, 2));
    console.log('CronScheduleMails', process.env.TZ, process.env.QUEUE_URL, process.env.MONGO_URL);

    return new Promise((resolve, reject) => {
        const payload: SQS.Types.SendMessageRequest = {
            QueueUrl: process.env.QUEUE_URL ?? '',
            MessageBody: JSON.stringify([
                'CronScheduleMails',
                process.env.TZ,
                process.env.QUEUE_URL,
                process.env.MONGO_URL,
            ]),
        };
        const sqs = new SQS();
        sqs.sendMessage(payload, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    // await DatabaseConnection.connect(process.env.MONGO_URL ?? '');
    // const data = await DatabaseConnection.getCollection('scheduledEmail')
    //     .find({
    //         validToSendToClient: true,
    //         sended: false,
    //         scheduledFor: { $gte: new Date('2022-11-17') },
    //     })
    //     // .limit(100)
    //     .toArray();

    // console.log(`Total ${data.length}`);
    // return data.length;
    // const promises: Promise<unknown>[] = [];
    // const sqs = new SQS();

    // for (const doc of data) {
    //     promises.push(
    //         new Promise((resolve, reject) => {
    //             const payload: SQS.Types.SendMessageRequest = {
    //                 QueueUrl: process.env.QUEUE_URL ?? '',
    //                 MessageBody: JSON.stringify(doc),
    //             };

    //             sqs.sendMessage(payload, (err, data) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(data);
    //                 }
    //             });
    //         }),
    //     );
    // }

    // return Promise.all(promises);
};
