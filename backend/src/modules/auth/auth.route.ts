import { Router } from 'express';
import type { NextFunction } from 'express';
import passport from 'passport';

import { authenticate, signJwt } from './auth.service';

const route = Router();

route.get('/github', authenticate, (_, __, next: NextFunction) => {
  next();
});

route.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  signJwt,
);

export const authRoute = route;
