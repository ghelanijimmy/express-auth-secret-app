import express, { Response } from 'express';
import { BodyRequest } from '../types/RequestResponse';
import { RequestUser } from '../types/user';
import { saveUser } from '../db/DBUser';

const registerRouter = express.Router();
registerRouter.get('/', (req, res) => {
  res.render('register');
});

registerRouter.post('/', async (req: BodyRequest<RequestUser>, res: Response) => {
  saveUser(req.body)
    .then((authResponse) => {
      authResponse(req, res, () => {
        res.redirect('/secrets');
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.redirect('/register');
    });
});

export default registerRouter;
