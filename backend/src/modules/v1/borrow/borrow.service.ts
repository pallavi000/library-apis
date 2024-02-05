import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//entity
import { borrowEntity } from './entity/borrow.entity';

//dto
import { borrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(borrowEntity)
    private readonly borrowModal: Repository<borrowEntity>,
  ) {}

  async createBorrowBook(body: borrowDto) {
    return await this.borrowModal.insert({
      ...body,
      user: { id: body.user },
      book: { id: body.book },
    });
  }

  async returnBook(bookId: number, returnDate: Date) {
    return await this.borrowModal.update(
      { id: bookId },
      {
        returnDate,
        isReturned: true,
      },
    );
  }

  async findAllBorrowBook() {
    const borrowBooks = await this.borrowModal.find({
      relations: ['user', 'book'],
    });
    return borrowBooks;
  }

  async findBorrowById(id: number) {
    const borrowBook = await this.borrowModal.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    return borrowBook;
  }
}
