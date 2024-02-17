import { Client } from "pg";
import { envVarNames } from "../application/global_consts";

export const migrateDb = async () => {
  const client = new Client({ connectionString: process.env[envVarNames.dbUrl] })
  client.connect()

  const dropQuery = 'DROP TABLE IF EXISTS devices';
  await client.query(dropQuery)

  const query = `
    CREATE TABLE IF NOT EXISTS devices (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      macAddress TEXT NOT NULL,
      location TEXT NOT NULL,
      status TEXT NOT NULL,
      lastReported TEXT NOT NULL
    );
  `;
  await client.query(query)
  
  client.end()
}