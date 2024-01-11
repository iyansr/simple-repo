import React from 'react';
import RepositoryItem from './repository-item';
import { getUserRepos } from '@/lib/actions';

const Repositories = async ({ username }: { username: string }) => {
  const repos = await getUserRepos(username);

  return (
    <>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">Repository</h2>
        <span className="aspect-square bg-slate-100 ml-3 text-xs font-normal text-center rounded-full p-1 px-2">
          {repos.length}
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
