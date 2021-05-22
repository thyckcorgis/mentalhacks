import { Client } from "cassandra-driver";
import type { DBExec } from "./types";

import { SECURE_CONNECT_PATH, CLIENT_ID, CLIENT_SECRET } from "./config";

export const insert =
  (name: string, userId: string, colour: string): DBExec =>
  (client) =>
    client.execute(
      `INSERT INTO studies.course (name, user_id, colour) VALUES(${name}, ${userId}, ${colour})`
    );

export const getCourses: DBExec = (client) => client.execute("SELECT * from studies.course");

export const getRows = async (client: Client, fn: DBExec) => {
  const rs = await fn(client);
  return rs.rows;
};

export async function connect() {
  const client = new Client({
    cloud: {
      secureConnectBundle: SECURE_CONNECT_PATH,
    },
    credentials: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
  });

  await client.connect();
  return client;
}
