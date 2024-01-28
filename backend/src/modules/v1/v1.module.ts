import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { GenraModule } from './genra/genra.module';
import { AuthorModel } from './author/author.module';
import { BorrowModule } from './borrow/borrow.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/utils/constant';
import connectionSource from 'src/config/typeorm';
import { MemberModule } from './membership/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionSource.options),
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
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
