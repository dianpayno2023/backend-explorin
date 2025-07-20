/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ValidationService } from './../common/validation.service';
import {
  HttpException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CustomJwtService } from 'src/auth/jwt/jwt.service';
import { Logger } from 'winston';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private ValidationService: ValidationService,
    private readonly jwt: CustomJwtService,
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

  async login(request: LoginUserRequest): Promise<UserResponse> {
    try {
      this.logger.info(`User Login ${JSON.stringify(request)}`);
      const loginRequest: LoginUserRequest = this.ValidationService.validate(
        UserValidation.LOGIN,
        request,
      ) as LoginUserRequest;

      let user = await this.PrismaService.user.findUnique({
        where: {
          email: loginRequest.email,
        },
      });
      if (!user) {
        throw new HttpException(
          { code: 400, message: 'Email is not registered' },
          400,
        );
      }

      const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException({ code: 400, message: 'Password Wrong!' }, 400);
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = this.jwt.signToken(payload);

      user = await this.PrismaService.user.update({
        where: {
          email: user.email,
        },
        data: {
          token: token,
        },
      });
      return {
        token: user.token,
      };
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException(err.flatten());
      }

      throw err; // lempar error lain selain Zod
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async get(user: User): Promise<UserResponse> {
    return {
      email: user?.email ?? '',
      name: user?.name ?? '',
    };
  }
  async getAllUser(): Promise<User[]> {
    return this.PrismaService.user.findMany();
  }

  async updateUser(
    user: User,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    this.logger.info(`Update user ${JSON.stringify(request)}`);
    const updateUserRequest: UpdateUserRequest =
      this.ValidationService.validate(
        UserValidation.UPDATE,
        request,
      ) as UpdateUserRequest;

    const dataToUpdate: any = {};
    if (updateUserRequest.email) {
      dataToUpdate.email = updateUserRequest.email;
    }
    if (updateUserRequest.password) {
      dataToUpdate.password = await bcrypt.hash(updateUserRequest.password, 10);
    }

    const result = await this.PrismaService.user.update({
      where: {
        id: user.id,
      },
      data: dataToUpdate,
    });

    return {
      name: result.name,
      email: result.email,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const result = await this.PrismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });
    return {
      name: result.name,
      email: result.email,
    };
  }
}
