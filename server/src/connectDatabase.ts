import { Client } from "cassandra-driver";

import { SECURE_CONNECT_PATH, CLIENT_ID, CLIENT_SECRET } from "./config";

const insert = (client: Client) =>
  client.execute(
    "INSERT INTO studies.course (name, user_id) VALUES('ECE 420', 'GHmhA4vbEugYymJ7k97I13H4jiU2')"
  );

async function run() {
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

  const rs = await client.execute("SELECT * from studies.course");
  console.log(rs.rows);
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

run();
