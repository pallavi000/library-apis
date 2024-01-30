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

  async findBooksPagination(
    page: number = 1,
    limit: number = 10,
    genre: number = 0,
    author: number = 0
  ): Promise<bookDto[]> {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (genre) {
      where.genra = genre;
    }
    if (author) {
      where.author = author;
    }
    return await this.bookModel.find({
      where: where,
      take: limit,
      skip,
      relations: ["author", "genra"],
    });
  }

  async createBook(body: bookDto) {
    return await this.bookModel.insert({
      ...body,
    });
  }

  async findBookById(id: number) {
    const book = await this.bookModel.findOne({
      where: { id },
      relations: ["author", "genra"],
    });
    return book;
  }

  async findAvailableBook() {
    const books = await this.bookModel.find({
      where: { isAvailable: true },
      relations: ["author", "genra"],
    });
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
