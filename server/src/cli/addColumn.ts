import { Client } from "cassandra-driver";
import { connect } from "../database";

export const addColumn = (client: Client) =>
  client.execute("ALTER TABLE studies.courses ADD colour text");

export const createCoursesTable = (client: Client) =>
  client.execute(
    "CREATE TABLE studies.courses(id UUID PRIMARY KEY, name text, colour text, user_id text)"
  );

export const deleteTable = (client: Client) => client.execute("DROP TABLE studies.settings");

export const createSettingsTable = (client: Client) =>
  client.execute("CREATE TABLE studies.settings(user_id text PRIMARY KEY, settings text)");

export async function main() {
  const client = await connect();

  await client.shutdown();
}
