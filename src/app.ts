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

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/secrets', secretsRouter);
app.use('/logout', logoutRouter);

app.get('/', async (req: Request, res: Response) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server is running');
});
