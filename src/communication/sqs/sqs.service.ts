import { Injectable, Inject } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class SqsService {
    private sqsQueueUrl: string;

    constructor(
        @Inject('SQS') private readonly sqs: SQS,
        private readonly configService: ConfigService,
        private logger: LoggerService
    ) {
        this.sqsQueueUrl = this.configService.get<string>('SQS_QUEUE_URL');
    }

    async sendMessage(message: any) {
        try {
            const params = {
                MessageBody: JSON.stringify(message),
                QueueUrl: this.sqsQueueUrl
            };

            this.logger.log({type: "SQS" , message: params.MessageBody});
            return await this.sqs.sendMessage(params).promise();
        } catch (error) {
            throw error;
        }

    }
}
