import { Module, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerSchema } from './schemas/logger.schema';
import { Logger as MyLogger } from './schemas/logger.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: MyLogger.name, schema: LoggerSchema}])],
  providers: [LoggerService, Logger],
  exports: [LoggerService]
})
export class LoggerModule { }
