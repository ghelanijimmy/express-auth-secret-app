import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import session from 'express-session';
import passport from 'passport';
import secretsRouter from './routes/secrets';
import logoutRouter from './routes/logout';
import LocalStrategy from 'passport-local';
import { findOrCreateUser, User } from './db/DBUser';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import authRouter from './routes/auth';

const app = express();

app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy.Strategy(User.authenticate()));

passport.serializeUser(async (user: Express.User & { id?: string }, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
      const user = await findOrCreateUser({ googleId: profile.id });
      if (user) {
        cb(null, user);
      } else {
        cb(new Error('Error'));
      }
    },
  ),
);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/secrets', secretsRouter);
app.use('/logout', logoutRouter);
app.use('/auth', authRouter);

app.get('/', async (req: Request, res: Response) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server is running');
});
