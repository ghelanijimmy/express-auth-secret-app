import express from 'express';
import { RequestUser } from '../types/user';
import { findUser } from '../db/DBUser';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/submit');
  } else {
    res.render('login');
  }
});

loginRouter.post('/', (req, res) => {
  findUser(req.body as RequestUser, req.login)
    .then((authResponse) => {
      authResponse(req, res, () => {
        res.redirect('/submit');
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.redirect('/login');
    });
});

export default loginRouter;
