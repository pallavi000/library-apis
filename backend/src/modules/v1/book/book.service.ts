import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { Repository } from 'typeorm';
import { bookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookModel: Repository<BookEntity>,
  ) {}

  async findAllBook(): Promise<bookDto[]> {
    const books = await this.bookModel.find({ relations: ['author', 'genra'] });
    return books;
  }

  async createBook(body: bookDto) {
    console.log(body);
    const books = await this.bookModel.insert({
      ...body,
    });
    return 'success';
  }

  async findBookById(id: number) {
    const book = await this.bookModel.findOne({ where: { id } });
    return book;
  }

  async findAvailableBook() {
    const books = this.bookModel.find({ where: { isAvailable: true } });
    return books;
  }

  async findBookByTitle(title: string) {
    const books = this.bookModel.find({
      where: { title: title },
      relations: ['author', 'genra'],
    });
    return books;
  }

  findBooksByFilter(genreId: number, authorId: number): Promise<bookDto[]> {
    const books = this.bookModel.find({
      where: {
        genra: { id: genreId },
        author: { id: authorId },
      },
      relations: ['author', 'genra'],
    });
    return books;
  }

  async updateBookById(id: number, body: bookDto) {
    const book = await this.bookModel.update({ id }, { ...body });
    return 'success';
  }

  async deleteBookById(id: number) {
    const book = await this.bookModel.delete({ id });
    return 'success';
  }
}
