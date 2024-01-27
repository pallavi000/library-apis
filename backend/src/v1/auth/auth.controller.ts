import {
  Body,
  Controller,
  Get,
  HttpException,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: any) {
    const user = this.authService.login(body);
    return user;
  }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      throw new HttpException('Server Error', 400);
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: IExpressRequest) {
    const user = req.user;
    return user;
  }
}
