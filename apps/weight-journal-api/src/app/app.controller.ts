import { Controller, Get, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { APIResponse } from './shared/api.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const data = this.appService.getData();
    return APIResponse.success('Data retrieved successfully', data);
  }
}
