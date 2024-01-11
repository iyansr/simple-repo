import Image from 'next/image';
import React from 'react';
import { getUserVisitors } from '@/lib/actions';

const Visitor = async ({ username }: { username: string }) => {
  const visitors = await getUserVisitors(username);

  return (
    <div>
      <h4 className="font-bold text-sm">Latest Visitors</h4>
      <div className="flex items-center space-x-3 mt-4">
        {visitors.map((item) => (
          <Image
            key={item.id}
            src={String(item.user.image)}
            width={56}
            height={56}
            alt={item.user.providerUserName}
            className="w-14 h-14 rounded-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Visitor;
