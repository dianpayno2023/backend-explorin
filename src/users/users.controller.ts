// import { Body, Controller, Post } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { RegisterUserRequest, UserResponse } from 'src/model/user.model';
// import { WebResponse } from 'src/model/web.model';

import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from '@/common';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async find(@Query() query: UsersDTO) {
    return this.service.find();
  }
  //   @Post('register')
  //   async register(
  //     @Body() request: RegisterUserRequest,
  //   ): Promise<WebResponse<UserResponse>> {
  //     const result = await this.userService.register(request);
  //     return {
  //       data: result,
  //     };
  //   }
}
