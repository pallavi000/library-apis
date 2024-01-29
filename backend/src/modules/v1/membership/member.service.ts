import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipEntity } from "./entity/membership.entity";
import { Repository } from "typeorm";
import { memberDto } from "./dto/member.dto";

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly memberModal: Repository<MembershipEntity>
  ) {}

  async findAllMember() {
    const members = await this.memberModal.find({ relations: ["user"] });
    return members;
  }

  async findMemberById(id: number) {
    const member = await this.memberModal.findOne({
      where: { id },
      relations: ["user"],
    });
    return member;
  }

  async createMember(body: memberDto) {
    const member = await this.memberModal.insert({
      ...body,
    });
    return {};
  }

  async findMemberByUserId(userId: number) {
    const member = await this.memberModal.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    return member;
  }
}
