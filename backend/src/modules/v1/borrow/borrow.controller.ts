import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { MemberService } from '../membership/member.service';
import { AdminAuthGuard } from 'src/guards/auth-jwt/admin-auth.guard';
import { IExpressRequest } from 'src/@types/auth';
import { ApiError } from 'src/exceptions/api-error.exception';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow Book')
@Controller('borrows')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
  ) {}

  @Get('/')
  // @UseGuards(AdminAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: borrowDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAllBorrowBooks() {
    try {
      const borrowBooks = await this.borrowService.findAllBorrowBook();
      return borrowBooks;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  // @UseGuards(AdminAuthGuard)
  async createBorrowBook(@Body() body: borrowDto, @Req() req: IExpressRequest) {
    try {
      const bookId = body.book?.id;
      const book = await this.bookService.findBookById(bookId);
      if (!book.isAvailable) {
        throw new HttpException('Book is not available', 404);
      }

      const member = await this.memberService.findMemberByUserId(req.user.id);
      if (!member) {
        throw new HttpException('user is not library member yet', 404);
      }

      const borrowBook = await this.borrowService.createBorrowBook(body);
      const updatedBook = await this.bookService.updateBookById(bookId, {
        ...book,
        isAvailable: false,
      });
      return {};
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/return-book/:id')
  // @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
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
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  // @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async findBorrowBookById(@Param() param: any): Promise<borrowDto> {
    const { id } = param;
    try {
      const borrowBook = await this.borrowService.findBorrowBookById(id);
      return borrowBook;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
