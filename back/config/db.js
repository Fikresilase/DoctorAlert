const { Client } = require('pg');

const connectDB = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Use the Heroku Postgres URL
    ssl: {
      rejectUnauthorized: false // Required for Heroku Postgres
    }
  });

  try {
    await client.connect();
    console.log(`PostgreSQL Connected: ${client.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  return client; // Return the client for further queries
};

module.exports = connectDB;