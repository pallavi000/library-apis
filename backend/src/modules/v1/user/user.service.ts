import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IsNull, Repository } from 'typeorm';

//dto
import { RegisterDto } from '../auth/dto/register.dto';
import { userDto } from './dto/user.dto';

//entity
import { UserEntity } from './entity/user.entity';

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

  findAllUsers() {
    const users = this.userModel.find();
    return users;
  }

  fetchUsersWithoutMembership() {
    const users = this.userModel.find({ where: { member: IsNull() } });
    return users;
  }

  async updateUser(id: number, body: userDto) {
    const user = await this.userModel.update({ id }, { ...body });
    return 'success';
  }

  async deleteUser(id: number) {
    const user = await this.userModel.delete({ id });
    return 'success';
  }

  async findUserById(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      relations: ['member'],
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      relations: ['member'],
    });
    return user;
  }

  async generateHash(password: string, rounds = 10) {
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isRightPassword = await bcrypt.compare(password, hashPassword);
    if (!isRightPassword) {
      return false;
    }
    return true;
  }
}
