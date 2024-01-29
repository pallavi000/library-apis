import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterDto } from "../auth/dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>
  ) {}
  async createUser(body: RegisterDto) {
    const insertUser = new UserEntity();
    insertUser.name = body.name;
    insertUser.email = body.email;
    insertUser.password = body.password;
    const user = await this.userModel.save(insertUser);
    return { ...user };
  }

  async findUserById(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async generateHash(password: string, rounds = 10) {
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    const isRightPassword = await bcrypt.compare(password, hashPassword);
    if (!isRightPassword) {
      return false;
    }
    return true;
  }
}
