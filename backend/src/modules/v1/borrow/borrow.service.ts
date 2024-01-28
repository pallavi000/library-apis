import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { borrowEntity } from './entity/borrow.entity';
import { Repository } from 'typeorm';
import { borrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(borrowEntity)
    private readonly borrowModal: Repository<borrowEntity>,
  ) {}

  async createBorrowBook(body: borrowDto) {
    const borrowBook = await this.borrowModal.insert({
      ...body,
    });
    console.log(borrowBook);
    return 'success';
  }

  async findAllBorrowBook() {
    try {
      const borrowBooks = this.borrowModal.find({
        relations: ['user', 'book'],
      });
      return borrowBooks;
    } catch (error) {
      return error;
    }
  }

  async findBorrowBookById(id: number) {
    try {
      const borrowBook = await this.borrowModal.findOne({
        where: { id },
        relations: ['user', 'book'],
      });
      return borrowBook;
    } catch (error) {
      console.log(error);
    }
  }
}
