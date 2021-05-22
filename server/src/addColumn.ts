import { Client } from "cassandra-driver";
import { connect } from "./connectDatabase";

export const addColumn = (client: Client) =>
  client.execute("ALTER TABLE studies.courses ADD colour text");
async function main() {
  const client = await connect();

  await client.execute(
    "CREATE TABLE studies.courses(id UUID PRIMARY KEY, name text, colour text, user_id text)"
  );
  await client.shutdown();
}

main();
