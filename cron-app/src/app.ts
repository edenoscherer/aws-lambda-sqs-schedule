import { ScheduledEvent } from 'aws-lambda';

export const handler = async (event: ScheduledEvent) => {
    console.log(JSON.stringify(event, null, 2));
    console.log('ScheduledEvent', process.env.TZ, process.env.QUEUE_URL);
};
