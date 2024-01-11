import React, { Suspense } from 'react';

import { RepositoryItemFallback } from '@/components/repository-item';
import { getCurrentUser, getUser } from '@/lib/actions';
import Visitor from '@/components/visitors';
import VisitorFallback from '@/components/visitor-fallback';
import Repositories from '@/components/repositories';
import Profile from '@/components/profile';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    username: string;
  };
};

const UserHomePage = async ({ params }: Props) => {
  const user = await getUser(params.username);
  const currentUser = await getCurrentUser();

  if (!user) {
    throw new Error(
      'Looks like the user is not found, or the request exceeded the limit 👀',
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 px-6 lg:gap-8 lg:pt-8 lg:px-8">
      <section className="p-6 lg:col-span-3 space-y-6 lg:space-y-14">
        <Profile user={user} currentUser={currentUser} />

        <Suspense fallback={<VisitorFallback />}>
          <Visitor username={params.username} />
        </Suspense>
      </section>
      <section className="lg:col-span-9">
        <div className="p-6 border border-slate-200/70 rounded-md bg-white">
          <Suspense fallback={<RepositoryItemFallback />}>
            <Repositories user={user} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
