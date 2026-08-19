import { Role } from '../../generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}