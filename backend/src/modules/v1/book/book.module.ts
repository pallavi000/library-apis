import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "./entity/book.entity";
import { JwtService } from "@nestjs/jwt";
import { ReservationEntity } from "./entity/reservation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, ReservationEntity])],
  controllers: [BookController],
  providers: [BookService, JwtService],
  exports: [BookModule, BookService],
})
export class BookModule {}
