import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { memberDto } from './dto/member.dto';
import { AuthGuard } from 'src/guards/auth-jwt/auth-jwt.guard';
import { AdminAuthGuard } from 'src/guards/auth-jwt/admin-auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/')
  async findAllMembers(): Promise<memberDto[]> {
    try {
      const members = await this.memberService.findAllMember();
      return members;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  async addNewMember(@Body() body: memberDto) {
    try {
      const member = await this.memberService.createMember(body);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async findMemberById(@Param() param: any): Promise<memberDto> {
    try {
      const { id } = param;
      const member = await this.memberService.findMemberById(id);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/user/:id')
  async findMemberByUserId(@Param() param: any) {
    const { id } = param;
    try {
      const member = await this.memberService.findMemberByUserId(id);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
