import express from "express";
import cors from "cors";

import { getUser } from "./firebase";
import { connect, getRows, getSettings, insertNewSettings } from "./connectDatabase";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

async function main() {
  const client = await connect();
  app.post("/user", async (req, res) => {
    try {
      const token = req.headers["authorization"];
      const user = await getUser(token as string);
      const settings = req.body as Settings;
      await insertNewSettings(settings, user.uid)(client);
      console.log(req.body);
      res.json({ message: `Sent ${JSON.stringify(req.body)} as ${JSON.stringify(user)}` });
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  });

  app.get("/", async (req, res) => {
    try {
      const token = req.headers["authorization"];
      const user = await getUser(token as string);
      const settings = (await getRows(client, getSettings(user.uid)))[0] as unknown as SettingRow;

      res.json({ message: `Hello, these are your settings: ${settings.settings}` });
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  });

  app.listen(PORT, () => console.log("Listening on port", PORT));
}

main();
