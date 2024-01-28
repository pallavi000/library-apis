import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipEntity } from './entity/membership.entity';
import { Repository } from 'typeorm';
import { memberDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly memberModal: Repository<MembershipEntity>,
  ) {}

  findAllMember() {
    const members = this.memberModal.find({ relations: ['user'] });
    return members;
  }

  findMemberById(id: number) {
    const member = this.memberModal.findOne({
      where: { id },
      relations: ['user'],
    });
    return member;
  }

  createMember(body: memberDto) {
    const member = this.memberModal.insert({
      ...body,
    });
    return 'success';
  }

  findMemberByUserId(userId: number) {
    const member = this.memberModal.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return member;
  }
}
