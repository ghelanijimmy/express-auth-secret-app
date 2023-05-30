import express, { Response } from 'express';
import { BodyRequest } from '../types/RequestResponse';
import { UserWithEmailAndPassword } from '../types/user';
import { findUser } from '../db/user';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.post('/', (req: BodyRequest<UserWithEmailAndPassword>, res: Response) => {
  const { username, password } = req.body;
  findUser({ email: username, password }).then((user) => {
    if (user) {
      res.render('secrets');
    } else {
      res.redirect('/login');
    }
  });
});

export default loginRouter;
