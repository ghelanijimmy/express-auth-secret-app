import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import { Schema, Document } from 'mongoose';
import { RequestUser } from '../types/user';
import { NextFunction } from 'express';

export interface DBUser extends Document {
  email: string;
  password: string;
  googleId: string;
  secret: string;
  id: string;
}

mongoose.connect('mongodb://127.0.0.1:27017/userDB').then(() => console.log('Connected to MongoDB'));

const userSchema = new Schema<DBUser>({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  passwordField: 'password',
});

export const User = mongoose.model<DBUser>('User', userSchema);

export const saveUser = async (user: RequestUser) => {
  return new Promise<(req: Express.Request, res: Express.Response, next: NextFunction) => void>((resolve, reject) => {
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
): Promise<(req: Express.Request, res: Express.Response, next: NextFunction) => void> => {
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

export const findOrCreateUser = async (user: { googleId: string }) => {
  const dbUser = await User.findOne({ googleId: user.googleId });
  if (dbUser) {
    return dbUser;
  }
  const newUser = await new User({
    googleId: user.googleId,
  });
  return await newUser.save();
};
