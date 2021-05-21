import { Client } from "cassandra-driver";

import { SECURE_CONNECT_PATH, CLIENT_ID, CLIENT_SECRET } from "./config";

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

  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

run();
