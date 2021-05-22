import React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";
import LinearBackground from "../components/LinearBackground";

const styles = {
  content: {
    padding: `100px 32px`,
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
    </div>
  </LinearBackground>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
