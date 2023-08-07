import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, User } from '@weight-journal-app/domain';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.signIn(
        loginDto.username,
        loginDto.password
      );
      return result;
    } catch (error) {

      return error;
    }
  }

  @Post('register')
  async createUser(@Body() user: User) {
    try {
      const newUser: User = await this.authService.register(user);
      return { message: 'User created successfully', data: newUser };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
