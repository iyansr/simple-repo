import 'dotenv/config';

import express from 'express';
import ViteExpress from 'vite-express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';

import { authRoute } from './modules/auth/auth.route';
import { userRoute } from './modules/user/user.route';
import { limiter } from './modules/utils/limiter';

const app = express();

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

// allow cors from all - no hustle and never safe
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(limiter);

app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

app.get('/hello', (_, res) => {
  res.send(`Hello Vite + TypeScript!`);
});

app.use('/auth', authRoute);
app.use('/users', userRoute);

ViteExpress.listen(app, 3001, () =>
  console.log('Server is listening on port 3001...'),
);
