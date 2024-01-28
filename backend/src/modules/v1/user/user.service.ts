import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
  ) {}
  async createUser(body: RegisterDto) {
    const insertUser = new UserEntity();
    insertUser.name = body.name;
    insertUser.email = body.email;
    insertUser.password = body.password;
    const user = await this.userModel.save(insertUser);
    return { ...user };
  }

  findUserById(id) {
    const user = this.userModel.findOne({ where: { id } });
    return user;
  }

  findUserByEmail(email: string) {
    const user = this.userModel.findOne({ where: { email } });
    return user;
  }

  async generateHashPassword(password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password, hashPassword) {
    const isRightPassword = await bcrypt.compare(password, hashPassword);
    if (!isRightPassword) {
      return 'wrong password';
    }
    return isRightPassword;
  }
}
