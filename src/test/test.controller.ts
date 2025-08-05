// src/test/test.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  getHello(): string {
    return '🚀 API NestJS berhasil jalan!';
  }
}
