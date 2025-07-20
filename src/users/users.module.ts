import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomJwtModule } from 'src/auth/jwt/jwt.module';

@Module({
  imports: [CustomJwtModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
