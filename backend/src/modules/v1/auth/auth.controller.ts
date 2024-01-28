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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth-jwt/auth-jwt.guard';
import { IExpressRequest, IExpressUser } from 'src/@types/auth';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post('/register')
  async register(@Body() body: RegisterDto) {
    console.log(body);
    try {
      const hashPassword = await this.userService.generateHashPassword(
        body.password,
      );
      const user = await this.authService.register({
        ...body,
        password: hashPassword,
      });
      const token = await this.authService.generateToken(user);

      console.log(token, 'tokennnnnnn');
      return 'success';
      // return { user, token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('/login')
  async login(@Body() body: loginDto) {
    try {
      const user = await this.userService.findUserByEmail(body.email);
      if (user) {
        console.log(user, 'userrrrrrrrrr');
        const validUser = await this.authService.comparePassword(
          body.password,
          user.password,
        );
        if (!validUser) {
          throw new BadRequestException('Invalid Password');
        }
        const token = this.authService.generateToken(body);
        return token;
      } else {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: IExpressRequest) {
    console.log(req.user);
    const user = req.user;
    return user;
  }
}
