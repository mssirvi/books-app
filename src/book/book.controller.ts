import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiBody({ type: CreateBookDto, isArray: true })
  async create(@Body() createBookDto: CreateBookDto | CreateBookDto[]): Promise<Book | Book[]> {
    try {
      if (Array.isArray(createBookDto)) {
        if (createBookDto.length === 0) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "The array cannot be empty"
          }, HttpStatus.BAD_REQUEST)
        }

        if (createBookDto.length <= 20) {
          const bookDtoPromises = createBookDto.map(bookdto => {
            return this.bookService.create(bookdto);
          });
          
          return await Promise.all(bookDtoPromises);
        }
      }

      return await this.bookService.create(createBookDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookService.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  @Patch(':id')
  @ApiBody({ type: UpdateBookDto })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
