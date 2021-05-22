import React, { FC } from "react";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import LinearBackground from "../components/LinearBackground";

interface DashboardProps {
  name: string;
}

const Dashboard: FC<DashboardProps> = ({ name }) => {
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  return {
    props: {
      name: AuthUser.displayName,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard);
