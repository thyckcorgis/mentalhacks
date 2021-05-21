import * as admin from "firebase-admin";

import { NEXT_PUBLIC_FIREBASE_DATABASE_URL } from "./config";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});

export const getUser = (token: string) => app.auth().verifyIdToken(token);
