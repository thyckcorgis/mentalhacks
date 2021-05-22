import type { Client, types } from "cassandra-driver";

export type DBExec = (client: Client) => Promise<types.ResultSet>;
