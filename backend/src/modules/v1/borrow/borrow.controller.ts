import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { borrowDto } from './dto/borrow.dto';
import { BookService } from '../book/book.service';

@Controller('borrows')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
  ) {}

  @Get('/')
  async getAllBorrowBooks() {
    try {
      const borrowBooks = await this.borrowService.findAllBorrowBook();
      return borrowBooks;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/')
  async createBorrowBook(@Body() body: borrowDto) {
    try {
      const bookId = body.book?.id;
      let book = await this.bookService.findBookById(bookId);
      if (!book.isAvailable) {
        throw new HttpException('Book is not available', 404);
      }
      const borrowBook = await this.borrowService.createBorrowBook(body);
      book = await this.bookService.updateBookById(bookId, {
        ...book,
        isAvailable: false,
      });
      return borrowBook;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  async findBorrowBookById(@Param() param: any) {
    const { id } = param;
    try {
      const borrowBook = await this.borrowService.findBorrowBookById(id);
      return borrowBook;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
