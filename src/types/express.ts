import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestType extends Request {
  user?: {
    id: string;
  };
}

export interface DecodedToken extends JwtPayload {
  id: string;
}
