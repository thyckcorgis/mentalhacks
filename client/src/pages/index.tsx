import React, { FC, useEffect } from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Head from "../public/head.svg";
import Router from "next/router";

const Home: FC = () => {
  const AuthUser = useAuthUser();
  useEffect(() => {
    if (AuthUser.id) Router.push("/dashboard");
  }, [AuthUser]);
  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      {/* <Header email={AuthUser.email} signOut={AuthUser.signOut} /> */}
      <div className="flex flex-col content-center h-screen">
        <p className="py-12 text-sans text-6xl text-center text-yellow">Study Planner</p>
        <a
          href="/auth"
          className="mx-auto flex-col transition duration-300 ease-in-out transform hover:scale-105 justify-items-center"
        >
          <Head />
          {/* <p className="py-4 opacity-100 text-center text-darkGreen">Click to start.</p> */}
        </a>
      </div>
    </LinearBackground>
  );
};

export default withAuthUser()(Home);
