import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { MemberService } from "./member.service";
import { memberDto } from "./dto/member.dto";
import { AuthGuard } from "src/guards/auth-jwt/auth-jwt.guard";
import { AdminAuthGuard } from "src/guards/auth-jwt/admin-auth.guard";
import { ApiError } from "src/exceptions/api-error.exception";
import { ApiTags } from "@nestjs/swagger";
import { MembershipEntity } from "./entity/membership.entity";
import { UserService } from "../user/user.service";

@ApiTags("Member")
@Controller("members")
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly userService: UserService
  ) {}

  @Get("/")
  async findAllMembers(): Promise<MembershipEntity[]> {
    try {
      const members = await this.memberService.findAllMember();
      return members;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/inactive")
  async findInactiveMembers(): Promise<MembershipEntity[]> {
    try {
      const members = await this.memberService.findInactiveMembers();
      return members;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post("/")
  async addNewMember(@Body() body: memberDto) {
    try {
      const hasAlreadyMembership = await this.memberService.findMemberByUserId(
        body.user
      );
      if (hasAlreadyMembership) {
        throw new BadRequestException("User already has membership.");
      }
      const member = await this.memberService.createMember(body);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/:id")
  async findMemberById(@Param() param: any): Promise<MembershipEntity> {
    try {
      const { id } = param;
      const member = await this.memberService.findMemberById(id);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/user/:id")
  async findMemberByUserId(@Param() param: any) {
    const { id } = param;
    try {
      const member = await this.memberService.findMemberByUserId(id);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put("/:id")
  async activateMembership(
    @Body() body: memberDto,
    @Param() param: { id: number }
  ) {
    try {
      const { id } = param;
      const member = await this.memberService.activeMembership(id);
      const user = await this.userService.findUserById(body.user);
      user.member = member;
      await this.userService.updateUser(user.id, user);
      return member;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMembership(@Param() param: { id: number }) {
    try {
      const { id } = param;
      return await this.memberService.deleteMembership(id);
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
