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

  async findInactiveMembers() {
    const members = await this.memberModal.find({
      where: { isActive: false },
      relations: ["user"],
    });
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
    const member = this.memberModal.create({
      ...body,
      user: { id: body.user },
    });
    return await this.memberModal.save(member);
  }

  async findMemberByUserId(userId: number) {
    const member = await this.memberModal.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    return member;
  }

  async updateMembership(id: number, body: memberDto) {
    return await this.memberModal.update(
      { id },
      {
        ...body,
        user: { id: body.user },
      }
    );
  }

  async activeMembership(id: number) {
    const updatedMember = await this.memberModal.findOneBy({ id });
    updatedMember.isActive = true;
    return await this.memberModal.save(updatedMember);
  }

  async deleteMembership(id: number) {
    return await this.memberModal.delete({ id: id });
  }
}
