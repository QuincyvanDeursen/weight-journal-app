import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, User } from '@weight-journal-app/domain';
import { APIResponse } from '../shared/api.response';

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
      return APIResponse.success('Login successful', result);
    } catch (error) {
      return APIResponse.error('Login failed', error);
    }
  }

  @Post('register')
  async createUser(@Body() user: User) {
    try {
      const newUser: User = await this.authService.register(user);
      return APIResponse.success('Creating user successful', newUser);
    } catch (error) {
      return APIResponse.error('Creating user failed', error);
    }
  }
}
