import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/authot.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModel {}
