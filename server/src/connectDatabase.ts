import { Client } from "cassandra-driver";
import { v4 as uuidv4 } from "uuid";
import type { DBExec } from "./db";

import { SECURE_CONNECT_PATH, CLIENT_ID, CLIENT_SECRET } from "./config";

export const insertCourse =
  (name: string, userId: string, colour: string): DBExec =>
  (client) =>
    client.execute("INSERT INTO studies.courses (id, name, user_id, colour) VALUES(?, ?, ?, ?)", [
      uuidv4(),
      name,
      userId,
      colour,
    ]);

export const updateCourse =
  (name: string, colour: string, id: string): DBExec =>
  (client) =>
    client.execute(`UPDATE studies.courses SET name = ?, colour = ? WHERE id = ? IF EXISTS`, [
      name,
      colour,
      id,
    ]);

export const getCourses: DBExec = (client) => client.execute("SELECT * from studies.courses");
export const getCourse =
  (id: Buffer): DBExec =>
  (client) =>
    client.execute("SELECT * from studies.courses WHERE id = ?", [id]);

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
