import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

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
}
