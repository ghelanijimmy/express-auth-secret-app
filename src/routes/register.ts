import express from 'express';
import { RequestUser } from '../types/user';
import { saveUser } from '../db/DBUser';

const registerRouter = express.Router();
registerRouter.get('/', (req, res) => {
  res.render('register');
});

registerRouter.post('/', async (req, res) => {
  saveUser(req.body as RequestUser)
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
