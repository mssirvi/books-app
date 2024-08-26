import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]), LoggerModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
