import express, { Response } from 'express';
import { BodyRequest } from '../types/RequestResponse';
import { UserWithEmailAndPassword } from '../types/user';
import { saveUser } from '../db/user';

const registerRouter = express.Router();

registerRouter.get('/', (req, res) => {
  res.render('register');
});

registerRouter.post('/', async (req: BodyRequest<UserWithEmailAndPassword>, res: Response) => {
  const { username, password } = req.body;
  await saveUser({ email: username, password }).then(() => {
    res.render('secrets');
  });
});

export default registerRouter;
