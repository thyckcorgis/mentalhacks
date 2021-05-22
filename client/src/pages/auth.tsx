import React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";
import LinearBackground from "../components/LinearBackground";
import Head from "../public/head.svg";

const styles = {
  content: {
    padding: `100px 32px`,
    height: "100vh",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 16,
  },
};

const Auth = () => (
  <LinearBackground colours={["from-medGreen", "to-yellow"]}>
    <div style={styles.content}>
      <div style={styles.textContainer}>
        <p className="py-2 text-sans text-4xl text-center text-yellow">Sign in</p>
      </div>
      <div>
        <FirebaseAuth />
      </div>
      {/* <div className="mx-auto flex flex-col">
        <Head />
      </div> */}
    </div>
  </LinearBackground>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
