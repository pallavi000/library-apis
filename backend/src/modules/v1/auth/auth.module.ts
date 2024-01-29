import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWT } from "src/utils/constant";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [],
})
export class AuthModule {}
