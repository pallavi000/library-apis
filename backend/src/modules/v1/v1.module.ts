import { Module } from '@nestjs/common';
import connectionSource from 'src/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { GenraModule } from './genra/genra.module';
import { AuthorModel } from './author/author.module';
import { BorrowModule } from './borrow/borrow.module';
import { MemberModule } from './membership/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionSource.options),
    UserModule,
    AuthModule,
    BookModule,
    GenraModule,
    AuthModule,
    AuthorModel,
    BorrowModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module {}
