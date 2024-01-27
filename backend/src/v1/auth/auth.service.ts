import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(body: RegisterDto) {
    const user = await this.userService.createUser(body);
    return user;
  }

  async generateToken(user) {
    const token = this.jwtService.sign(user);
    return token;
  }
}
