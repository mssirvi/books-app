import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<Book>,
    private Emitter: EventEmitter2,
    private logger: LoggerService
  ) { }

  async create(createBookDto: CreateBookDto | CreateBookDto[]): Promise<Book> {
    const createdBook = new this.BookModel(createBookDto);
    const bookResponse = createdBook.save();
    if (bookResponse) {
      this.Emitter.emit('Book.created', createBookDto);
      this.logger.log({
        event: 'Book.created',
        createBookDto
      });
    }
    return bookResponse;
  }

  async findAll(): Promise<Book[]> {
    return this.BookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.BookModel.findById(id).exec();
    if (!book) {
      this.logger.log({
        message: ` Book with ID: ${id} not found`
      });
      throw new NotFoundException(` Book with ID: ${id} not found`);
    }
    return book;
  }

  // TODO
  async update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  // TODO
  async remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
