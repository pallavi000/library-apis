import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

//controller
import { UserController } from './user.controller';

//services
import { UserService } from './user.service';

//entity
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserModule, UserService],
})
export class UserModule {}
