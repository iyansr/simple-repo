import { Router } from 'express';
import {
  getUser,
  getUserRepos,
  getUserLatestVisitors,
  getAllUsers,
  getCurrentUser,
} from './user.controller';
import { validateUserName } from './user.middleware';

const route = Router();

route.get('/profile/me', getCurrentUser);
route.get('/:username', validateUserName, getUser);
route.get('/', getAllUsers);
route.get('/:username/repos', validateUserName, getUserRepos);
route.get('/:username/visitors', validateUserName, getUserLatestVisitors);

export const userRoute = route;
