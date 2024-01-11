'use client';

import React from 'react';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logOut } from '@/lib/actions';

import Image from 'next/image';
import { User } from '../types';
import { useRouter } from 'next/navigation';

const DropdownHeader = ({ user }: { user: User | null }) => {
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push('/api/auth/login')}
        className="text-sm bg-pink-500 font-semibold text-white px-4 py-2 rounded-md"
      >
        Login With Github
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-1 px-4 py-2 rounded-full border border-slate-200 bg-slate-100">
          <Image
            src={String(user.image)}
            height={40}
            width={40}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <MenuIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center space-x-4">
          <Image
            src={String(user.image)}
            height={40}
            width={40}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />

          <div>
            <p className="text-sm text-slate-700 font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${user.providerUserName}`}>View Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logOut()}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownHeader;
