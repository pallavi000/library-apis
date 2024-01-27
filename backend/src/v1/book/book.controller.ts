import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { bookDto } from './dto/book.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: bookDto,
    isArray: true,
  })
  async fetchAllBooks() {
    console.log('fetchbook');
    try {
      const books = await this.bookService.findAllBook();
      return books;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async addBook(@Body() body: bookDto): Promise<any> {
    console.log('hello');
    try {
      const book = await this.bookService.createBook(body);
      return book;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
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
