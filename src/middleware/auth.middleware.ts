import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = getAuth();
    if (auth.currentUser == null) {
      res.status(404).json({ message: 'please login' });
    } else {
      next();
    }
  }
}
