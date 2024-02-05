import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

//controller
import { BorrowController } from './borrow.controller';

//entity
import { borrowEntity } from './entity/borrow.entity';

//service
import { BorrowService } from './borrow.service';

//module
import { BookModule } from '../book/book.module';
import { MemberModule } from '../membership/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([borrowEntity]), BookModule, MemberModule],
  controllers: [BorrowController],
  providers: [BorrowService, JwtService],
})
export class BorrowModule {}
