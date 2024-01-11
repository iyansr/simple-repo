import Header from '@/components/header';
import { getCurrentUser } from '@/lib/actions';
import React, { type PropsWithChildren } from 'react';

const UserPageLayout = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <Header user={currentUser} />

      <main className="pt-12 lg:pt-20 h-full max-w-screen-xl w-full mx-auto">
        {children}
      </main>

      <footer className="text-center py-5 bg-slate-100 w-full mt-10">
        © {new Date().getFullYear()} Pixel8Labs. All rights reserved.
      </footer>
    </div>
  );
};

export default UserPageLayout;
