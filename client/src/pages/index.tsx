import React from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import LinearBackground from "../components/LinearBackground";
import Head from "../public/head.svg";
import Button from "../components/Button";

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      <a href="/auth">
        {/* <Header email={AuthUser.email} signOut={AuthUser.signOut} /> */}
        <div className="flex flex-col content-center h-screen">
          <p className="py-12 text-sans text-6xl text-center text-yellow">Study Planner</p>
          <div className="flex justify-center">
            <Head />
          </div>
          <p className="text-center text-medGreen">Click anywhere to start.</p>
        </div>
      </a>
    </LinearBackground>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
