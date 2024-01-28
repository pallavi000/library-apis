import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthGuard } from "src/guards/auth-jwt/auth-jwt.guard";
import { IExpressRequest, IExpressUser } from "src/@types/auth";
import { ApiResponse } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { loginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post("/register")
  async register(@Body() body: RegisterDto) {
    try {
      const user = await this.authService.register(body);
      const token = await this.authService.generateToken(user);
      return { user, token };
    } catch (error) {
      throw new HttpException("Server Error", 400);
    }
  }

  @Post("/login")
  async login(@Body() body: loginDto) {
    try {
      const user = await this.userService.findUserByEmail(body.email);
      if (user) {
        const validUser = user.password === body.password;
        if (!validUser) {
          throw new BadRequestException("Invalid Password");
        }
        const token = this.authService.generateToken(body);
        return token;
      } else {
        throw new BadRequestException("User not found");
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: IExpressRequest) {
    const user = req.user;
    return user;
  }
}
