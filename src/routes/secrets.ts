import express from 'express';
import { User } from '../db/DBUser';

const secretsRouter = express.Router();

secretsRouter.get('/', async (req, res) => {
  const secrets = await User.find({ secret: { $ne: null } });
  console.log(secrets);
  if (!secrets) {
    res.render('secrets', { usersWithSecrets: [] });
  } else {
    res.render('secrets', { usersWithSecrets: secrets });
  }
});

export default secretsRouter;
