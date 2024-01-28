import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { borrowDto } from './dto/borrow.dto';
import { BookService } from '../book/book.service';
import { AuthGuard } from 'src/guards/auth-jwt/auth-jwt.guard';
import { Request } from 'express';
import { MemberService } from '../membership/member.service';

@Controller('borrows')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
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
      const book = await this.bookService.findBookById(bookId);
      if (!book.isAvailable) {
        throw new HttpException('Book is not available', 404);
      }

      const member = await this.memberService.findMemberByUserId(req.user?.id);
      if (!member) {
        throw new HttpException('user is not library member yet', 404);
      }

      const borrowBook = await this.borrowService.createBorrowBook(body);
      const updatedBook = await this.bookService.updateBookById(bookId, {
        ...book,
        isAvailable: false,
      });
      return borrowBook;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('/return-book/:id')
  async returnBook(@Param('id') bookId: number) {
    try {
      let borrowedBook = await this.borrowService.findBorrowBookById(bookId);
      if (!borrowedBook) {
        throw new NotFoundException('Borrow book not found.');
      }
      if ((await borrowedBook).returnDate) {
        throw new Error('Book is already returned.');
      }
      (await borrowedBook).returnDate = new Date();
      const book = this.borrowService.returnBook(bookId, borrowedBook);
      return book;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Get('/:id')
  async findBorrowBookById(@Param() param: any): Promise<borrowDto> {
    const { id } = param;
    try {
      const borrowBook = await this.borrowService.findBorrowBookById(id);
      return borrowBook;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
