import passport from 'passport';
import type { RequestHandler, Request } from 'express';
import { Strategy, type Profile } from 'passport-github2';

import type { JWTPayload, UserSchema } from '@/modules/types';
import {
  createUser,
  findUserByUserName,
  updateUserByProviderId,
} from '@/modules/user/user.service';
import { signAsync, verifyAsync } from '@/modules/utils/jwt';

export const signJwt: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Not authenticated',
    });
  }

  const token = await signAsync(
    {
      aud: {
        id: req.user.id,
      },
      issuer: 'pixel8',
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d',
    },
  );

  return req.logIn(req.user as UserSchema, function (err: any) {
    if (err)
      return res.status(400).json({
        error: err,
      });

    const callbackUrl = `${process.env.CALLBACK_URL}`;
    const redirectPath =
      req.params.redirectPath || `/${req.user?.providerUserName ?? ''}`;

    return res.redirect(
      `${callbackUrl}?token=${token}&redirectPath=${redirectPath}`,
    );
  });
};

export const verifyJWT = async (req: Request) => {
  const bearer = String(req.headers.authorization);
  const token = bearer.split(' ')[1];

  if (!token) {
    return null;
  }

  const decoded = await verifyAsync<JWTPayload>(
    token,
    String(process.env.JWT_SECRET),
  );

  if (!decoded) {
    return null;
  }

  return decoded;
};

passport.use(
  new Strategy(
    {
      callbackURL: String(process.env.GITHUB_CALLBACK_URL),
      clientID: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
      scope: ['public_profile', 'repo'],
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: any,
    ) => {
      const { id, emails, username, photos, displayName, name } = profile;

      const currentUser = await findUserByUserName(String(username));

      if (currentUser) {
        const updatedUser = await updateUserByProviderId(id, {
          accessToken,
          providerUserName: username,
          image: String(photos?.[0]?.value),
        });
        return done(null, updatedUser[0]);
      }
      const newUser = await createUser({
        email: String(emails?.[0]?.value),
        providerAccountId: id,
        providerUserName: String(username),
        image: String(photos?.[0]?.value),
        accessToken,
        name: name?.givenName || displayName,
      });

      return done(null, newUser[0]);
    },
  ),
);

export const authenticate: RequestHandler = (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', {
    scope: [],
    state,
    session: true,
  });
  return authenticator(req, res, next);
};
