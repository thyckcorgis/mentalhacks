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
      {/* <Header email={AuthUser.email} signOut={AuthUser.signOut} /> */}
      <div className="flex flex-col content-center h-screen">
        <p className="py-12 text-sans text-6xl text-center text-yellow">Study Planner</p>
        <a
          href="/auth"
          className="mx-auto flex-col transition duration-500 ease-in-out transform hover:scale-105 justify-items-center"
        >
          <Head />
          {/* <p className="py-4 opacity-100 text-center text-darkGreen">Click to start.</p> */}
        </a>
      </div>
    </LinearBackground>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
