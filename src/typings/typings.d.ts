import { DBUser } from '../db/DBUser';

declare global {
  namespace Express {
    interface User extends DBUser {
      id?: string;
    }
  }
}
