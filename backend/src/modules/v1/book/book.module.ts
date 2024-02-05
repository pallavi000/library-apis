import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

//controller
import { BookController } from './book.controller';

//service
import { BookService } from './book.service';

//entity
import { BookEntity } from './entity/book.entity';
import { ReservationEntity } from './entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, ReservationEntity])],
  controllers: [BookController],
  providers: [BookService, JwtService],
  exports: [BookModule, BookService],
})
export class BookModule {}
