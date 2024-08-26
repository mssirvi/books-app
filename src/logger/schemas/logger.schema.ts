import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Logger extends Document {

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);