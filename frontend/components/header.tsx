'use client';

import Image from 'next/image';
import React from 'react';

import { User } from '../types';
import DropdownHeader from './dropdown-header';

const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="fixed top-0 inset-x-0 bg-white h-20 shadow-sm z-20">
      <section className="max-w-screen-xl mx-auto w-full h-full flex justify-between items-center px-8">
        <div className="flex items-center justify-center">
          <Image src="/icon.svg" height={32} width={32} alt="Icon" />
          <p className="font-bold text-lg">
            Simple<span className="text-fuchsia-500">.</span>Repo
          </p>
        </div>
        <DropdownHeader user={user} />
      </section>
    </header>
  );
};

export default Header;
