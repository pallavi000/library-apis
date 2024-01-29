import { ClassSerializerInterceptor, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { plainToClass, plainToInstance } from "class-transformer";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../user/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async compareHashedPassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    try {
      await bcrypt.compare(password, hashPassword);
      return true;
    } catch (error) {
      return false;
    }
  }

  generateToken(payload: any): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
