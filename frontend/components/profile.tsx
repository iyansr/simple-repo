'use client';

import React from 'react';
import { User } from '../types';
import Image from 'next/image';
import EmailIcon from './icons/email-icon';
import { login } from '@/lib/actions';
import PeopleIcon from './icons/people-icon';

const Profile = ({ user }: { user: User | null }) => {
  if (!user) return null;

  return (
    <>
      <div className="flex lg:flex-col items-center space-x-4 lg:space-x-0">
        <Image
          src={String(user.image)}
          width={460}
          height={460}
          alt="User Profile Avatar"
          className="h-20 w-20 lg:w-40 lg:h-40 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mt-4 leading-8 lg:text-center">
            {user.name}
          </h1>
          <p className="leading-6 text-slate-700 lg:text-center">
            @{user.providerUserName}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-sm">About</h4>
        <p className="leading-6 mt-4">{user.bio}</p>

        <div className="flex items-center mt-4 space-x-2">
          <EmailIcon />
          {user.email ? (
            <p>{user.email}</p>
          ) : (
            <button
              onClick={() => login()}
              className="text-xs px-2 py-1 border border-slate-100 bg-white"
            >
              Login to see
            </button>
          )}
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <PeopleIcon />
          <p>
            <b>{user.visitCount}</b> profile visitor
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
