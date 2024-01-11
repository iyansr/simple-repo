import { UserSchema } from './modules/types';

declare global {
  namespace Express {
    interface User extends UserSchema {}
    export interface Request {
      user?: User;
    }
  }
}

export {};
