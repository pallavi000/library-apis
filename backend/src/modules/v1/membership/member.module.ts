import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//entity
import { MembershipEntity } from './entity/membership.entity';

//controller
import { MemberController } from './member.controller';

//service
import { MemberService } from './member.service';
import { JwtService } from '@nestjs/jwt';

//module
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity]), UserModule],
  controllers: [MemberController],
  providers: [MemberService, JwtService],
  exports: [MemberModule, MemberService],
})
export class MemberModule {}
