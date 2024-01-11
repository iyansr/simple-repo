import React from 'react';
import { GithubRepo } from '../types';

const RepositoryItem = ({ repo }: { repo: GithubRepo }) => {
  return (
    <div className="border border-slate-200/50 rounded-md bg-slate-50 p-6">
      <div className="flex items-center space-x-3">
        <h3 className="font-bold">{repo.name}</h3>
        {repo.visibility === 'public' ? (
          <span className="rounded-full bg-purple-50 border border-purple-400 text-purple-400 text-xs px-2 font-semibold">
            {repo.visibility}
          </span>
        ) : (
          <span className="rounded-full bg-slate-50 border border-slate-400 text-slate-400 text-xs px-2 font-semibold">
            {repo.visibility}
          </span>
        )}
      </div>
      <p className="mt-2 leading-5 text-slate-700">{repo.description}</p>

      <div>Update Just Now</div>
    </div>
  );
};

export const RepositoryItemFallback = () => {
  return (
    <>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">Repository</h2>
      </div>
      <div className="flex flex-col space-y-6 mt-6">
        <div className="border border-slate-200/50 rounded-md bg-slate-100 h-32 animate-pulse p-6"></div>
        <div className="border border-slate-200/50 rounded-md bg-slate-100 h-32 animate-pulse p-6"></div>
        <div className="border border-slate-200/50 rounded-md bg-slate-100 h-32 animate-pulse p-6"></div>
      </div>
    </>
  );
};

export default RepositoryItem;
