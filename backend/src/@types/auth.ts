import { Request } from 'express';

export interface IExpressUser {
  name: string;
  email: string;
  password: string;
}

export interface IExpressRequest extends Request {
  user: IExpressUser;
}
