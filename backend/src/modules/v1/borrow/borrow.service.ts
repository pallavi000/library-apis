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

  createBorrowBook(body: borrowDto) {
    const borrowBook = this.borrowModal.insert({
      ...body,
    });
    console.log(borrowBook);
    return 'success';
  }

  returnBook(bookId: number, body: borrowDto) {
    const borrowBook = this.borrowModal.update({ id: bookId }, { ...body });
    return 'successfully book returned';
  }

  async findAllBorrowBook() {
    const borrowBooks = this.borrowModal.find({
      relations: ['user', 'book'],
    });
    return borrowBooks;
  }

  async findBorrowBookById(id: number) {
    const borrowBook = await this.borrowModal.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    return borrowBook;
  }
}
