const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'qQiPDsekcCMcTTVM',
  host: 'db.lamlaonpeyttjmfjzcsd.supabase.co',
  port: 6543, // default Postgres port
  database: 'postgres',
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};