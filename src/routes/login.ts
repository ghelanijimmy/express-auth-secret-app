import express, { Response } from 'express';
import { BodyRequest } from '../types/RequestResponse';
import { RequestUser } from '../types/user';
import { findUser } from '../db/DBUser';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.post('/', (req: BodyRequest<RequestUser>, res: Response) => {
  findUser(req.body, req.login)
    .then((authResponse) => {
      authResponse(req, res, () => {
        res.redirect('/secrets');
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.redirect('/login');
    });
});

export default loginRouter;
