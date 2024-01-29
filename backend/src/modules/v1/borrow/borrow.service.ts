import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { borrowEntity } from "./entity/borrow.entity";
import { Repository } from "typeorm";
import { borrowDto } from "./dto/borrow.dto";

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(borrowEntity)
    private readonly borrowModal: Repository<borrowEntity>
  ) {}

  async createBorrowBook(body: borrowDto) {
    return await this.borrowModal.insert({
      ...body,
    });
  }

  async returnBook(bookId: number, body: borrowDto) {
    const borrowBook = await this.borrowModal.update(
      { id: bookId },
      { ...body }
    );
    return "successfully book returned";
  }

  async findAllBorrowBook() {
    const borrowBooks = await this.borrowModal.find({
      relations: ["user", "book"],
    });
    return borrowBooks;
  }

  async findBorrowBookById(id: number) {
    const borrowBook = await this.borrowModal.findOne({
      where: { id },
      relations: ["user", "book"],
    });
    return borrowBook;
  }
}
