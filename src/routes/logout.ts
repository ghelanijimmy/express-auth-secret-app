import express from 'express';

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  req.logout({}, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      res.redirect('/secrets');
    }
  });
  res.redirect('/');
});

export default logoutRouter;
