import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "./entity/book.entity";
import { Repository } from "typeorm";
import { bookDto } from "./dto/book.dto";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookModel: Repository<BookEntity>
  ) {}

  async findAllBook(): Promise<bookDto[]> {
    const books = await this.bookModel.find({ relations: ["author", "genra"] });
    return books;
  }

  async createBook(body: bookDto) {
    return await this.bookModel.insert({
      ...body,
    });
  }

  async findBookById(id: number) {
    const book = await this.bookModel.findOne({ where: { id } });
    return book;
  }

  async findAvailableBook() {
    const books = await this.bookModel.find({ where: { isAvailable: true } });
    return books;
  }

  async findBookByTitle(title: string) {
    const books = await this.bookModel.find({
      where: { title: title },
      relations: ["author", "genra"],
    });
    return books;
  }

  async findBooksByFilter(
    genreId: number,
    authorId: number
  ): Promise<bookDto[]> {
    const books = await this.bookModel.find({
      where: {
        genra: { id: genreId },
        author: { id: authorId },
      },
      relations: ["author", "genra"],
    });
    return books;
  }

  async updateBookById(id: number, body: bookDto) {
    return await this.bookModel.update({ id }, { ...body });
  }

  async deleteBookById(id: number) {
    return await this.bookModel.delete({ id });
  }
}
