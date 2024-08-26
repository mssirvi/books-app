import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger as MyLogger } from './schemas/logger.schema';

@Injectable()
export class LoggerService {
    constructor(
        @InjectModel(MyLogger.name)
        private LogModel: Model<MyLogger>,
        private readonly logger: Logger

    ) { }

    async log(message: any): Promise<void> {
        try {
            const createLog = new this.LogModel({ message: JSON.stringify(message) });
            await createLog.save();
            this.logger.log(message);
        } catch (error) {
            this.logger.error('Failed to log message', error);
        }

    }
}
