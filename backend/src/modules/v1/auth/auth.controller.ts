import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "src/guards/auth-jwt/auth-jwt.guard";
import { IExpressRequest } from "src/@types/auth";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { loginDto } from "./dto/login.dto";
import { ApiError } from "src/exceptions/api-error.exception";
import { MemberService } from "../membership/member.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly membershipService: MemberService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post("/register")
  async register(@Body() body: RegisterDto) {
    try {
      const hashPassword = await this.userService.generateHash(body.password);
      const user = await this.userService.createUser({
        ...body,
        password: hashPassword,
      });
      const member = await this.membershipService.createMember({
        user: user.id,
      });

      // add member to user table
      user.member = member;
      await this.userService.updateUser(user.id, user);

      const { password, ...payload } = user;
      const token = this.authService.generateToken(payload);
      return { token };
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post("/login")
  async login(@Body() body: loginDto) {
    try {
      const user = await this.userService.findUserByEmail(body.email);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const validUser = await this.authService.compareHashedPassword(
        body.password,
        user.password
      );
      if (!validUser) {
        throw new BadRequestException("Invalid Password");
      }
      const { password, ...payload } = user;
      const token = this.authService.generateToken(payload);
      return { token };
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  async getProfile(@Req() req: IExpressRequest) {
    try {
      const user = await this.userService.findUserById(req.user.id);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
