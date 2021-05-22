import { connect, getRows, getCourses, getCourse } from "../database";

async function main() {
  const client = await connect();

  // const rs = await insertCourse("ECE 420", "GHmhA4vbEugYymJ7k97I13H4jiU2", "pink")(client);
  const rs = (await getRows(client, getCourses)) as unknown as Course[];
  const id = rs[0].id.buffer;
  console.log(id);
  const rs2 = (await getRows(client, getCourse(id))) as unknown as Course[];
  console.log(rs2[0].id.buffer);

  // const { name, user_id } = rs[0] as unknown as Course;

  // await updateCourse(name, "pink", user_id)(client);

  await client.shutdown();
}

main();
