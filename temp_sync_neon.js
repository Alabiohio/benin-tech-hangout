const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_Hu37agCqlMwp@ep-twilight-sea-aj75uc6s-pooler.c-3.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require'
  });

  try {
    await client.connect();
    await client.query("ALTER TABLE exhibitor_registrations ADD COLUMN IF NOT EXISTS registration_type VARCHAR(50) DEFAULT 'exhibitor';");
    const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'exhibitor_registrations' AND column_name = 'registration_type'");
    console.log(JSON.stringify(res.rows));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
