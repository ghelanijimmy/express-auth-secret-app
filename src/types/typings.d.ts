import { DBUser } from '../db/DBUser';

type _User = DBUser;

declare global {
  namespace Express {
    interface User extends _User {
      email: string;
      password: string;
    }
  }
}
