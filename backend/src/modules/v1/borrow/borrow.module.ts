import { Module } from "@nestjs/common";
import { BorrowController } from "./borrow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { borrowEntity } from "./entity/borrow.entity";
import { BorrowService } from "./borrow.service";
import { JwtService } from "@nestjs/jwt";
import { BookModule } from "../book/book.module";
import { MemberModule } from "../membership/member.module";

@Module({
  imports: [TypeOrmModule.forFeature([borrowEntity]), BookModule, MemberModule],
  controllers: [BorrowController],
  providers: [BorrowService, JwtService],
})
export class BorrowModule {}
