import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<Book>
  ) {}

  async create(createBookDto: CreateBookDto | CreateBookDto[]): Promise<Book> {
    const createdBook = new this.BookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.BookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.BookModel.findById(id).exec(); 

    if(!book) {
      console.log( `Book with ID: ${id} not found`);
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
