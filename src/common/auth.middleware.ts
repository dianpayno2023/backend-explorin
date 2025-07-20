/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomJwtService } from '../auth/jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly customJwtService: CustomJwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key'] as string;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.customJwtService.verifyToken(token);
      (req as any).user = decoded;
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
