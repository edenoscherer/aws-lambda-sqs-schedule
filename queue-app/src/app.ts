import { SQSEvent } from 'aws-lambda';

export const handler = async (event: SQSEvent) => {
    console.log(JSON.stringify(event, null, 2));
};

// aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/408867156064/sam-app-MySqsQueue-qOJFYTvdOYlI --message-body "Test message"
