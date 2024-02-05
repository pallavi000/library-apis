import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

//entity
import { BookEntity } from './entity/book.entity';
import { ReservationEntity } from './entity/reservation.entity';

//dto
import { bookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookModel: Repository<BookEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationModel: Repository<ReservationEntity>,
  ) {}

  filterExpiredBookReservations(book: BookEntity): ReservationEntity[] {
    return book.reservations.filter(
      (reservation) => reservation.expirationDate >= new Date(),
    );
  }

  async findAllBook(): Promise<bookDto[]> {
    const books = await this.bookModel.find({
      relations: ['author', 'genra', 'reservations'],
    });
    for (const book of books) {
      book.reservations = this.filterExpiredBookReservations(book);
    }
    // const expirationDate = new Date();
    // const books = await this.bookModel
    //   .createQueryBuilder("book")
    //   .leftJoinAndSelect("book.author", "author")
    //   .leftJoinAndSelect("book.genra", "genra")
    //   .leftJoinAndSelect(
    //     "book.reservations",
    //     "reservation",
    //     "reservation.expirationDate >= :expirationDate",
    //     { expirationDate }
    //   )
    //   .leftJoinAndSelect("reservation.user", "user")
    //   .getMany();
    return books;
  }

  async findBooksPagination(
    page: number = 1,
    limit: number = 10,
    genre: number = 0,
    author: number = 0,
  ): Promise<bookDto[]> {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (genre) {
      where.genra = {};
      where.genra.id = genre;
    }
    if (author) {
      where.author = {};
      where.author.id = author;
    }
    return await this.bookModel.find({
      where: where,
      take: limit,
      skip,
      relations: ['author', 'genra', 'reservations'],
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
      relations: ['author', 'genra', 'reservations'],
    });
    book.reservations = this.filterExpiredBookReservations(book);
    return book;
  }

  async findAvailableBook() {
    const books = await this.bookModel.find({
      where: { isAvailable: true },
      relations: ['author', 'genra', 'reservations'],
    });
    return books;
  }

  async findBookByTitle(title: string) {
    const books = await this.bookModel.find({
      where: { title: title },
      relations: ['author', 'genra', 'reservations'],
    });
    return books;
  }

  async findBooksByFilter(
    genreId: number,
    authorId: number,
  ): Promise<bookDto[]> {
    const books = await this.bookModel.find({
      where: {
        genra: { id: genreId },
        author: { id: authorId },
      },
      relations: ['author', 'genra', 'reservations'],
    });
    return books;
  }

  async updateBookById(id: number, body: bookDto) {
    return await this.bookModel.update({ id }, { ...body });
  }

  async markBookUnavailable(id: number) {
    return await this.bookModel.update(
      { id },
      {
        isAvailable: false,
      },
    );
  }

  async markBookAvailable(id: number) {
    return await this.bookModel.update(
      { id },
      {
        isAvailable: true,
      },
    );
  }

  async deleteBookById(id: number) {
    return await this.bookModel.delete({ id });
  }

  async reserveBook(bookId: number, userId: number, expirationDate: Date) {
    return await this.reservationModel.insert({
      book: { id: bookId },
      user: { id: userId },
      expirationDate,
    });
  }

  isBookReserved(book: BookEntity, userId: number): boolean {
    if (!book.reservations.length) return false;
    const reservations = this.filterExpiredBookReservations(book);
    const reservationsBySomeoneElse = reservations.filter(
      (reservation) => reservation.userId != userId,
    );
    if (reservationsBySomeoneElse.length) return true;
    return false;
  }
}
