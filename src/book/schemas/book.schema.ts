import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Book extends Document {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop()
    publishedYear: string;

    @Prop()
    genre: string

    @Prop()
    summary: string

}

export const BookSchema = SchemaFactory.createForClass(Book);
