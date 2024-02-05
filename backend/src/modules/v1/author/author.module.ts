import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//entity
import { AuthorEntity } from './entity/authot.entity';

//service
import { AuthorService } from './author.service';

//controller
import { AuthorController } from './author.controller';

//constant
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
