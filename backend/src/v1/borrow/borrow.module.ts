import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { borrowEntity } from './entity/borrow.entity';
import { BorrowService } from './borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([borrowEntity])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
