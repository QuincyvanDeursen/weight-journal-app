import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@weight-journal-app/domain';
import { APIResponse } from '../shared/api.response';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  ////////////////////////////////////////////////
  ///////////////        GET       ///////////////
  ////////////////////////////////////////////////

  @Get(':id')
  async getUserById(@Request() req) {
    try {
      const user: User = await this.userService.findUserById(req.params.id);
      return APIResponse.success('Getting user by id successful', user);
    } catch (error) {
      return APIResponse.error(
        'Getting user by id failed | Error: ' + error.message,
        null
      );
    }
  }
}
