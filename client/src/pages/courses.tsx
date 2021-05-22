import React, { FC, useState } from "react";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Button from "../components/Button";

interface CourseProps {}

const Courses: FC<CourseProps> = ({}) => {
  const AuthUser = useAuthUser();
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);
  const changeTab = (tab: Tab) => {
    if (tab === currentTab) return;
    setCurrentTab(tab);
  };
  return (
    <LinearBackground colours={["from-darkGreen", "to-medGreen"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div className="flex flex-col h-4/5 content-center">
        <p className="py-2 text-sans text-4xl text-center text-yellow">Welcome, {name}</p>
        <div className="mx-auto">
          {tabs.map(([name, tab]) => (
            <button
              className={`rounded-t-lg px-10 py-2 bg-medGreen opacity-70 focus:outline-none focus:opacity-100 ${
                tab === currentTab ? "opacity-100" : "opacity-70"
              }`}
              onClick={() => changeTab(tab)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="h-full w-4/5 bg-gradient-to-b from-medGreen rounded-lg mx-auto ">
          <CurrentTab currentTab={currentTab} />
        </div>
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
