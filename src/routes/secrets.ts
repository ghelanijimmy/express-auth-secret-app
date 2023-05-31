import express from 'express';

const secretsRouter = express.Router();

secretsRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
});

export default secretsRouter;
