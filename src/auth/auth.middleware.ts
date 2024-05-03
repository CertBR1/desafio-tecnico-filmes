import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new HttpException('Token é obrigatório', HttpStatus.UNAUTHORIZED);
      }
      const payload = await this.authService.validarToken(token);
      req['user'] = payload;
      next();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
