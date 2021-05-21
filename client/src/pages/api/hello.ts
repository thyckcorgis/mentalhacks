// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiHandler } from "next";

const hello: NextApiHandler = (_, res) => {
  res.status(200).json({ name: "John Doe" });
};

export default hello;
