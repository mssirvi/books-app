import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { SqsService } from './sqs/sqs.service';
import { SqsProvider } from './sqs/sqs.provider';

@Module({
  providers: [CommunicationService, SqsService, SqsProvider]
})
export class CommunicationModule {}
