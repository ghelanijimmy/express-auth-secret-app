import express from 'express';
import { User } from '../db/DBUser';

const submitRouter = express.Router();

submitRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('submit');
  } else {
    res.redirect('/login');
  }
});

submitRouter.post('/', async (req, res) => {
  const { secret } = req.body;
  if (req.isAuthenticated()) {
    console.log(req.user);
    const updateResponse = await User.updateOne(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { _id: req.user.id },
      { $set: { secret } },
      { upsert: true },
    );
    if (updateResponse.modifiedCount > 0) {
      res.redirect('/secrets');
    } else {
      res.redirect('/submit');
    }
  }
});

export default submitRouter;
