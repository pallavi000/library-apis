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
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(body: bookDto) {
    try {
      console.log(body);
      const books = await this.bookModel.insert({
        ...body,
      });
      return 'success';
    } catch (error) {
      console.log(error);
    }
  }

  async findBookById(id: number) {
    try {
      const book = await this.bookModel.findOne({ where: { id } });
      return book;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBookById(id: number, body: bookDto) {
    try {
      const book = await this.bookModel.update({ id }, { ...body });
      return 'success';
    } catch (error) {
      return error;
    }
  }

  async deleteBookById(id: number) {
    try {
      const book = await this.bookModel.delete({ id });
      return 'sucess';
    } catch (error) {
      return error;
    }
  }
}
