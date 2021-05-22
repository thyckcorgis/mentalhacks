import React from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import LinearBackground from "../components/LinearBackground";

const Dashboard = ({ name }) => {
  const AuthUser = useAuthUser();
  return (
    <LinearBackground colours={["from-darkGreen", "to-medGreen"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div className="flex flex-col content-center h-screen">
        <p className="py-12 text-sans text-xl text-center text-yellow">Welcome, {name}</p>
      </div>
    </LinearBackground>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);