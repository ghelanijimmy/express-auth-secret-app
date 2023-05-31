import { DBUser } from '../db/DBUser';

declare global {
  namespace Express {
    interface AuthInfo {}
    interface User extends DBUser {
      id: number;
    }
  }
}
