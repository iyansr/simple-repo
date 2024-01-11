import { RequestHandler } from 'express';
import { AxiosError } from 'axios';

import {
  createOrUpdateUserVisitor,
  createUser,
  findAllUsers,
  findUserByUserName,
  getAuthenticatedUser,
  getLatestVisitors,
  updateUserByProviderUserName,
} from './user.service';
import {
  getGithubUser,
  getGithubUserRepositories,
} from '@/modules/github/github.service';

export const getUser: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    const authedUser = await getAuthenticatedUser(req);
    const currentUser = await findUserByUserName(username);
    const githubUser = await getGithubUser(username, authedUser?.accessToken);

    if (currentUser) {
      const user = await updateUserByProviderUserName(username, {
        visitCount: currentUser.visitCount + 1,
        /**
         * The email is available when user logged in,
         * by doing this, will prevent the email getting null
         * when user request from unauthenticated
         */
        email: currentUser.email || githubUser.email,
        bio: githubUser.bio,
        image: githubUser.avatar_url,
        name: githubUser.name,
      });

      if (authedUser && authedUser.id !== currentUser.id) {
        await createOrUpdateUserVisitor(currentUser.id, authedUser.id);
      }

      return res.status(200).json({ user: user[0] });
    }

    const newUser = await createUser({
      providerUserName: username,
      providerAccountId: String(githubUser.id),
      email: githubUser.email,
      image: githubUser.avatar_url,
      name: githubUser.name,
      visitCount: 1,
    });

    if (authedUser) {
      await createOrUpdateUserVisitor(newUser[0].id, authedUser.id);
    }

    return res.status(200).json({ user: newUser[0] });
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError) {
      return res
        .status(error.response?.status ?? 500)
        .json(error.response?.data);
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const authedUser = await getAuthenticatedUser(req);

    if (!authedUser) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    return res.status(200).json(authedUser);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res
        .status(error.response?.status ?? 500)
        .json(error.response?.data);
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getUserRepos: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    const authedUser = await getAuthenticatedUser(req);
    const repos = await getGithubUserRepositories(
      username,
      authedUser?.accessToken,
    );

    return res.status(200).json({ repos });
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError) {
      return res
        .status(error.response?.status ?? 500)
        .json(error.response?.data);
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json({ users });
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError) {
      return res
        .status(error.response?.status ?? 500)
        .json(error.response?.data);
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getUserLatestVisitors: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    const currentUser = await findUserByUserName(username);

    if (!currentUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    const visitors = await getLatestVisitors(currentUser.id);

    return res.status(200).json({ visitors });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};
