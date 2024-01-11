export type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  providerAccountId: string;
  providerUserName: string;
  accessToken: string | null;
  bio: string | null;
  visitCount: number;
  followers: number;
  following: number;
  publicRepos: number;
};

export type Visitors = {
  id: string;
  userId: string;
  visitorId: string;
  lastVisitDate: string;
  user: Pick<User, 'id' | 'image' | 'providerUserName'>;
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
