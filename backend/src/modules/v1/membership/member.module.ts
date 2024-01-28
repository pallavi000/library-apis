import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entity/membership.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
  controllers: [MemberController],
  providers: [MemberService, JwtService],
  exports: [MemberModule, MemberService],
})
export class MemberModule {}
