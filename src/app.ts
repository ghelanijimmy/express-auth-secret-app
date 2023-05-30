import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from './db/user';
import { BodyRequest } from './types/RequestResponse';
import { UserWithEmailAndPassword } from './types/user';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.render('home');
});

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.get('/register', (req: Request, res: Response) => {
  res.render('register');
});

app.post('/register', async (req: BodyRequest<UserWithEmailAndPassword>, res: Response) => {
  const { username, password } = req.body;
  const user = new User({ email: username, password });
  await user
    .save()
    .then(() => {
      res.render('secrets');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/login', async (req: BodyRequest<UserWithEmailAndPassword>, res: Response) => {
  const { username, password } = req.body;
  User.findOne({ email: username })
    .then((user) => {
      if (user && user.password === password) {
        res.render('secrets');
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('Server is running');
});
