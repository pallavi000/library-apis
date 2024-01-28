import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { borrowDto } from './dto/borrow.dto';
import { BookService } from '../book/book.service';
import { AuthGuard } from 'src/guards/auth-jwt/auth-jwt.guard';
import { Request } from 'express';

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
  @UseGuards(AuthGuard)
  async createBorrowBook(@Body() body: borrowDto, @Req() req: Request) {
    try {
      const bookId = body.book?.id;
      var book = await this.bookService.findBookById(bookId);
      if (!book.isAvailable) {
        throw new HttpException('Book is not available', 404);
      }

      // const member = await this.memberService.findMemberByUserId(req.user?.id);
      // if (!member) {
      //   throw new HttpException('user is not library member yet', 404);
      // }

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
