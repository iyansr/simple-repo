'use server';

import { cookies } from 'next/headers';
import { User, Visitors, GithubRepo } from '../types';
import { redirect } from 'next/navigation';

export const getUser = async (username: string) => {
  const token = cookies().get('__token');

  const response = await fetch(
    `${String(process.env.API_URL)}/users/${username}`,
    {
      headers: {
        ...(token?.value ? { authorization: `Bearer ${token?.value}` } : {}),
      },
      next: {
        tags: ['gh-user'],
      },
    },
  );

  const data = (await response.json()) as { user: User };

  const { user } = data;

  return user;
};

export const getCurrentUser = async () => {
  const token = cookies().get('__token');

  if (!token?.name) {
    return null;
  }

  const response = await fetch(
    `${String(process.env.API_URL)}/users/profile/me`,
    {
      headers: {
        ...(token?.value ? { authorization: `Bearer ${token?.value}` } : {}),
      },
      next: {
        tags: ['gh-profile'],
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as User;

  if (!data) return null;

  return data;
};

export const getUserVisitors = async (username: string) => {
  const token = cookies().get('__token');

  const response = await fetch(
    `${String(process.env.API_URL)}/users/${username}/visitors`,
    {
      headers: {
        ...(token?.value ? { authorization: `Bearer ${token?.value}` } : {}),
      },
      next: {
        tags: ['gh-user-visitor'],
      },
    },
  );
  const data = (await response.json()) as { visitors: Visitors[] };
  const { visitors } = data;

  return visitors;
};

export const getUserRepos = async (username: string) => {
  const token = cookies().get('__token');

  const response = await fetch(
    `${String(process.env.API_URL)}/users/${username}/repos`,
    {
      headers: {
        ...(token?.value ? { authorization: `Bearer ${token?.value}` } : {}),
      },
      next: {
        tags: ['gh-user-repos'],
      },
    },
  );
  const data = (await response.json()) as { repos: GithubRepo[] };
  const { repos } = data;

  return repos;
};

export const logOut = () => {
  cookies().set({
    name: '__token',
    value: '',
    maxAge: 0,
  });

  redirect('/octocat');
};
