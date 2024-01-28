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

  async comparePassword(password, userPassword) {
    const isVaildPassword = password === userPassword;
    if (!isVaildPassword) {
      return 'Invalid password';
    }
    return userPassword;
  }

  async generateToken(user) {
    console.log(user, 'userrrrrrrrr');
    const token = this.jwtService.sign(user, { secret: 'test123' });
    return token;
  }
}
