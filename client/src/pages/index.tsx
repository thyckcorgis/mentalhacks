import React from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import Button from "../components/Button";
import DemoPageLinks from "../components/DemoPageLinks";

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
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <p className="text-6xl text-center text-yellow">Study Planner</p>
        <p>
          If you remove `getServerSideProps` from this page, it will be static and load the authed
          user only on the client side.
        </p>
        <Button>Poop</Button>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
