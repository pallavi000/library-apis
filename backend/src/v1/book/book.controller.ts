import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { bookDto } from './dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  async fetchAllBooks() {
    try {
      const books = await this.bookService.findAllBook();
      return books;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  async addBook(@Body() body: bookDto): Promise<any> {
    console.log('hello');
    try {
      const book = await this.bookService.createBook(body);
      return book;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  async fetchBookById(@Param() param: any) {
    const { id } = param;
    try {
      const book = await this.bookService.findBookById(id);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Put('/:id')
  async updateBookById(@Param() param: any, @Body() body: bookDto) {
    const { id } = param;
    try {
      const book = await this.bookService.updateBookById(id, body);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Delete('/:id')
  async deleteBookById(@Param() param) {
    const { id } = param;
    try {
      const book = await this.bookService.deleteBookById(id);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
