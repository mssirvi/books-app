import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommunicationModule } from './communication/communication.module';
import { LoggerModule } from './logger/logger.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
    EventEmitterModule.forRoot({
      wildcard: true
    }),
    CommunicationModule,
    LoggerModule,
    OpenaiModule
  ],
})
export class AppModule { }
