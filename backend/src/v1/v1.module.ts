import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { GenraModule } from './genra/genra.module';
import { AuthorModel } from './author/author.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/utils/constant';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-test',
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    BookModule,
    GenraModule,
    AuthModule,
    AuthorModel,
    BorrowModule,
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}
