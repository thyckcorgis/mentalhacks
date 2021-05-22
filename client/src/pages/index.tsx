import React from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import LinearBackground from "../components/LinearBackground";
import DemoPageLinks from "../components/DemoPageLinks";
import Button from "../components/Button";

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
};

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      {/* <Header email={AuthUser.email} signOut={AuthUser.signOut} /> */}
      <div className="justify-items-center">
        <p className="text-sans text-6xl text-center text-yellow">Study Planner</p>
        <Button href="/auth">Sign in</Button>
      </div>
    </LinearBackground>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
