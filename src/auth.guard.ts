import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const requireAuthentication = this.reflector.get<boolean>(
      'requireAuthentication',
      context.getHandler(),
    );
    if (requireAuthentication === undefined) return true;

    const authHeader = request.get('authorization');
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    const decode = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    console.log(decode);
    return true;
  }
}
