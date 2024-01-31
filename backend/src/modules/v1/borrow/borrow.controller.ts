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
} from "@nestjs/common";
import { BorrowService } from "./borrow.service";
import { borrowDto } from "./dto/borrow.dto";
import { BookService } from "../book/book.service";
import { MemberService } from "../membership/member.service";
import { AdminAuthGuard } from "src/guards/auth-jwt/admin-auth.guard";
import { IExpressRequest } from "src/@types/auth";
import { ApiError } from "src/exceptions/api-error.exception";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Borrow Book")
@Controller("borrows")
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
    private readonly memberService: MemberService
  ) {}

  @Get("/")
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

  @Post("/")
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async createBorrowBook(@Body() body: borrowDto, @Req() req: IExpressRequest) {
    try {
      const bookId = body.book;
      const book = await this.bookService.findBookById(bookId);
      if (!book) {
        throw new NotFoundException("Book not found");
      }
      if (!book.isAvailable) {
        throw new BadRequestException("Book is not available");
      }
      const member = await this.memberService.findMemberByUserId(body.user);
      if (!member) {
        throw new BadRequestException("user is not a library member yet");
      }
      const isReserved = this.bookService.isBookReserved(book, body.user);
      if (isReserved) {
        throw new NotFoundException("Book is reserved by someone else.");
      }
      await this.borrowService.createBorrowBook(body);
      await this.bookService.markBookUnavailable(bookId);
      return {};
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put("/return-book/:id")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async returnBook(@Param("id") borrowId: number) {
    try {
      let borrowedBook = await this.borrowService.findBorrowById(borrowId);
      if (!borrowedBook) {
        throw new NotFoundException("Borrow book not found.");
      }
      if (borrowedBook.isReturned) {
        throw new Error("Book is already returned.");
      }
      const returnDate = new Date();
      const book = this.borrowService.returnBook(borrowId, returnDate);
      this.bookService.markBookAvailable(borrowedBook.user.id);
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/:id")
  // @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async findBorrowBookById(@Param() param: any) {
    const { id } = param;
    try {
      const borrowBook = await this.borrowService.findBorrowById(id);
      return borrowBook;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
