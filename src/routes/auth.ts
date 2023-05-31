import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

authRouter.get('/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/secrets');
});

export default authRouter;
