import { Injectable, Inject } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
    private sqsQueueUrl: string;

    constructor(
        @Inject('SQS') private readonly sqs: SQS,
        private readonly configService: ConfigService
    ) {
        this.sqsQueueUrl = this.configService.get<string>('SQS_QUEUE_URL');
    }

    async sendMessage(message: any) {
        try {
            const params = {
                MessageBody: JSON.stringify(message),
                QueueUrl: this.sqsQueueUrl
            };

            return await this.sqs.sendMessage(params).promise();
        } catch (error) {
            throw error;
        }

    }
}
