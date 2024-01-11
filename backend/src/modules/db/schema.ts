import { pgTable, text, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  email: text('email'),
  image: text('image'),
  bio: text('bio'),
  providerAccountId: text('providerAccountId').notNull().unique(),
  providerUserName: text('provider_user_name').notNull().unique(),
  accessToken: text('access_token'),
  visitCount: integer('visit_count').notNull().default(0),
});

export const visitor = pgTable('visitor', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  visitorId: uuid('visitor_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  lastVisitDate: timestamp('last_visit_date').notNull().defaultNow(),
});

export const visitorRelations = relations(visitor, ({ one }) => ({
  user: one(users, { fields: [visitor.visitorId], references: [users.id] }),
}));
