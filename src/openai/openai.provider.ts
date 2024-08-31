import OpenAI from "openai";
import { ConfigService } from '@nestjs/config';

export const OpenAiProvider = {
  provide: 'openai',
  useFactory: (configService: ConfigService) => {
    return new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  },
  inject: [ConfigService],
};
