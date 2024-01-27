import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { borrowDto } from './dto/borrow.dto';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

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
      const borrowBook = await this.borrowService.createBorrowBook(body);
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
