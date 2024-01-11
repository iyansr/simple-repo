import React from 'react';
import RepositoryItem from './repository-item';
import { getUserRepos } from '@/lib/actions';
import { User } from '../types';

const Repositories = async ({ user }: { user: User | null }) => {
  if (!user) {
    return null;
  }

  const repos = await getUserRepos(user.providerUserName);

  return (
    <>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">Repository</h2>
        <span className="aspect-square bg-slate-100 ml-3 text-xs font-normal text-center rounded-full p-1 px-2">
          {user.publicRepos}
        </span>
      </div>
      <div className="flex flex-col space-y-6 mt-6">
        {repos.map((item) => (
          <RepositoryItem key={item.id} repo={item} />
        ))}
      </div>
    </>
  );
};

export default Repositories;
