import React, { Suspense } from 'react';

import { RepositoryItemFallback } from '@/components/repository-item';
import { User } from '@/types/index';
import { getUser } from '@/lib/actions';
import Visitor from '@/components/visitors';
import VisitorFallback from '@/components/visitor-fallback';
import Repositories from '@/components/repositories';
import Profile from '@/components/profile';

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`${String(process.env.API_URL)}/users`);
  const json = (await response.json()) as { users: User[] };

  return json.users.map((user) => ({ username: user.providerUserName }));
}

type Props = {
  params: {
    username: string;
  };
};

const UserHomePage = async ({ params }: Props) => {
  const user = await getUser(params.username);

  if (!user) {
    throw new Error(
      'Looks like the user is not found, or the request exceeded the limit 👀',
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 px-6 lg:gap-8 lg:pt-8 lg:px-8">
      <section className="p-6 lg:col-span-3 space-y-6 lg:space-y-14">
        <Profile user={user} />

        <Suspense fallback={<VisitorFallback />}>
          <Visitor username={params.username} />
        </Suspense>
      </section>
      <section className="lg:col-span-9">
        <div className="p-6 border border-slate-200/70 rounded-md bg-white">
          <Suspense fallback={<RepositoryItemFallback />}>
            <Repositories username={params.username} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
