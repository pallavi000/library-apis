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
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { bookDto } from './dto/book.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/guards/auth-jwt/admin-auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';

@ApiTags('Book')
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
    try {
      const books = await this.bookService.findAllBook();
      return books;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  async addBook(@Body() body: bookDto): Promise<any> {
    console.log('hello');
    try {
      const book = await this.bookService.createBook(body);
      return {};
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async updateBookById(@Param() param: any, @Body() body: bookDto) {
    const { id } = param;
    try {
      const book = await this.bookService.updateBookById(id, body);
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async deleteBookById(@Param() param) {
    const { id } = param;
    try {
      const book = await this.bookService.deleteBookById(id);
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async fetchBookById(@Param() param: any) {
    const { id } = param;
    try {
      const book = await this.bookService.findBookById(id);
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/available-book')
  async findAvailableBook() {
    try {
      const book = await this.bookService.findAvailableBook();
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/search')
  async fetchProductByTitle(@Query('title') title: string) {
    try {
      const book = await this.bookService.findBookByTitle(title);
      return book;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/filter')
  async fetchBooksByFilter(
    @Query('genre') genre: number,
    @Query('author') author: number,
  ) {
    try {
      const books = await this.bookService.findBooksByFilter(genre, author);
      if (books.length > 0) {
        return books;
      } else {
        throw new BadGatewayException('Books not found for the given filter');
      }
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
