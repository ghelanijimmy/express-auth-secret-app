import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Schema, Document } from 'mongoose';
import { RequestUser } from '../types/user';

export interface DBUser extends Document {
  email: string;
  password: string;
}

mongoose.connect('mongodb://127.0.0.1:27017/userDB').then(() => console.log('Connected to MongoDB'));

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  passwordField: 'password',
});

const User = mongoose.model<DBUser>('User', userSchema);

passport.use(new LocalStrategy.Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser() as (user: Express.User, done: (err: Error, id?: string) => void) => void);

passport.deserializeUser(User.deserializeUser());

export const saveUser = async (user: { username: string; password: string }) => {
  return new Promise<(req: Request, res: Response, next: NextFunction) => void>((resolve, reject) => {
    User.register(new User({ email: user.username, password: user.password }), user.password, (err) => {
      if (err) {
        reject(err);
      } else {
        const authMethod = User.authenticate();
        authMethod(user.username, user.password).then(() => {
          resolve(passport.authenticate('local'));
        });
      }
    });
  });
};

export const findUser = async (
  user: RequestUser,
  login: (user: Express.User, dont: (err: unknown) => void) => void,
): Promise<(req: Request, res: Response, next: NextFunction) => void> => {
  const dbUser = new User({
    email: user.username,
    password: user.password,
  });

  return new Promise((resolve, reject) => {
    login(dbUser, (err) => {
      if (err) {
        reject(err);
      }
      resolve(passport.authenticate('local', { failureRedirect: '/login' }));
    });
  });
};
