import { connect } from "./connectDatabase";

async function main() {
  const client = await connect();

  await client.execute("ALTER TABLE studies.course ADD colour text");

  await client.shutdown();
}

main();
