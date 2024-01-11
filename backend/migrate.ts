import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './src/modules/db';

async function main() {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Success Migrate');
  } catch (error) {
    console.log(error);
  } finally {
    connection.end();
  }
}

main();
