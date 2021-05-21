import express from "express";

import { getUser } from "./firebase";

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const user = await getUser(token as string);
    console.log(user.uid);
    res.json({ message: `Hello, you are signed in as ${user.email}` });
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

app.listen(PORT, () => console.log("Listening on port", PORT));
