import { ValidationService } from './../common/validation.service';
import {
  HttpException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { UserValidation } from './user.validation';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
@Injectable()
export class UsersService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private PrismaService: PrismaService,
  ) {}
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    try {
      this.logger.info(`Register new user ${JSON.stringify(request)}`);
      const registerRequest: RegisterUserRequest =
        this.ValidationService.validate(
          UserValidation.REGISTER,
          request,
        ) as RegisterUserRequest;

      const totalUserWithTheSameUsername = await this.PrismaService.user.count({
        where: {
          email: registerRequest.email,
        },
      });
      if (totalUserWithTheSameUsername != 0) {
        throw new HttpException(
          { code: 400, message: 'Email already exist' },
          400,
        );
      }
      registerRequest.password = await bcrypt.hash(
        registerRequest.password,
        10,
      );

      const user = await this.PrismaService.user.create({
        data: registerRequest,
      });

      return {
        email: user.email,
        name: user.name,
      };
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException(err.flatten());
      }

      throw err; // lempar error lain selain Zod
    }
  }
}
