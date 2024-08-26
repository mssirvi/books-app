import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export const SqsProvider = {
  provide: 'SQS',
  useFactory: (configService: ConfigService) => {
    return new SQS({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: configService.get<string>('AWS_REGION'),
    });
  },
  inject: [ConfigService],
};
