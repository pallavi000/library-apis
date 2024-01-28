import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/authot.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/utils/constant';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([AuthorEntity]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModel {}
