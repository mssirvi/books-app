import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { OpenAiProvider } from './openai.provider';

@Module({
  providers: [OpenaiService, OpenAiProvider],
  controllers: [OpenaiController]
})
export class OpenaiModule {}
