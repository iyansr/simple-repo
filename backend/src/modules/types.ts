import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

import { users } from './db/schema';

export type UserSchema = InferSelectModel<typeof users>;
export type UserInsertSchema = InferInsertModel<typeof users>;

export type JWTPayload = {
  aud: {
    id: string;
  };
  issuer: string;
};

export type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  email: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

export type GithubRepoRaw = {
  id: number;
  name: string;
  visibility: string;
  description: string | null;
  updated_at: string;
  language: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  visibility: string;
  description: string | null;
  updated_at: string;
  language: {
    name: string;
    color: string;
  };
};
