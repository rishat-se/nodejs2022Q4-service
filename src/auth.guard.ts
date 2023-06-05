import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const allowAnonymous = this.reflector.get<boolean>(
      'allow-anonymous',
      context.getHandler(),
    );
    if (allowAnonymous) return true;

    const authHeader = request.get('authorization');
    if (!authHeader)
      throw new HttpException(
        'authorization header missing',
        HttpStatus.UNAUTHORIZED,
      );

    const token = authHeader.split(' ')[1];
    try {
      this.authService.validateAccessToken(token);
    } catch (err) {
      throw new HttpException('invalid access token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
