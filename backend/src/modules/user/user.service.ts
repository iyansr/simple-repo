import { and, desc, eq, sql } from 'drizzle-orm';
import type { Request } from 'express';

import { db } from '@/modules/db';
import { users, visitor } from '@/modules/db/schema';
import { UserInsertSchema } from '@/modules/types';
import { verifyJWT } from '@/modules/auth/auth.service';

export const createUser = async (data: UserInsertSchema) => {
  const newUser = await db.insert(users).values(data).returning();

  return newUser;
};

export const findAllUsers = async () => {
  const users = await db.query.users.findMany();
  return users;
};

export const findUserByUserName = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.providerUserName, username),
  });

  return user;
};

export const findUserById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return user;
};

export const getAuthenticatedUser = async (req: Request) => {
  const decoded = await verifyJWT(req);
  if (!decoded) return null;

  const user = await findUserById(decoded.aud.id);

  return user;
};

export const updateUserByProviderId = async (
  providerId: string,
  data: Partial<UserInsertSchema>,
) => {
  const newUser = await db
    .update(users)
    .set(data)
    .where(eq(users.providerAccountId, providerId))
    .returning();

  return newUser;
};

export const updateUserByProviderUserName = async (
  userName: string,
  data: Partial<UserInsertSchema>,
) => {
  const newUser = await db
    .update(users)
    .set(data)
    .where(eq(users.providerUserName, userName))
    .returning();

  return newUser;
};

export const createOrUpdateUserVisitor = async (
  userId: string,
  visitorId: string,
) => {
  console.log({ userId, visitorId });

  const currentVisitor = await db.query.visitor.findFirst({
    where: and(eq(visitor.visitorId, visitorId), eq(visitor.userId, userId)),
  });

  if (!currentVisitor) {
    await db.insert(visitor).values({
      visitorId,
      userId,
      lastVisitDate: sql`now()`,
    });

    return;
  }

  await db
    .update(visitor)
    .set({
      lastVisitDate: sql`now()`,
    })
    .where(and(eq(visitor.visitorId, visitorId), eq(visitor.userId, userId)));
};

export const getLatestVisitors = async (userId: string) => {
  const visitors = await db.query.visitor.findMany({
    where: eq(visitor.userId, userId),
    orderBy: [desc(visitor.lastVisitDate)],
    with: {
      user: {
        columns: {
          id: true,
          image: true,
          providerUserName: true,
        },
      },
    },
    limit: 3,
  });

  return visitors;
};
