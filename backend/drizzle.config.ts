import 'dotenv/config';

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/db/schema.ts',
  driver: 'pg',
  dbCredentials: { connectionString: String(process.env.DATABASE_URL) },
  out: './drizzle',
} satisfies Config;
