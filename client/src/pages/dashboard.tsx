import React, { FC, useState } from "react";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import Header from "../components/Header";
import LinearBackground from "../components/LinearBackground";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
};

interface DashboardProps {
  name: string;
}

enum Tab {
  ALL,
  EXAMS,
  ASSES,
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WeekRowProps {
  start: number;
}

const WeekRow: FC<WeekRowProps> = ({ start }) => {
  return (
    <div className="flex space-x-4">
      {days.map((day, idx) => (
        <div key={`${start + idx}-${day}`}>
          <h1>
            {day} {start + idx}
          </h1>
          <div>Stuff</div>
        </div>
      ))}
    </div>
  );
};

const All: FC = () => {
  return (
    <div className="space-y-4">
      <WeekRow start={1} />
      <WeekRow start={8} />
      <WeekRow start={15} />
    </div>
  );
};

const Exams: FC = () => {
  return <Slick />;
};

const Assignments: FC = () => {
  return <div>Assignments</div>;
};

interface CurrentTabProps {
  currentTab: Tab;
}

const CurrentTab: FC<CurrentTabProps> = ({ currentTab }) => {
  switch (currentTab) {
    case Tab.ALL:
      return <All />;
    case Tab.EXAMS:
      return <Exams />;
    case Tab.ASSES:
      return <Assignments />;
  }
};

const tabs: [string, Tab][] = [
  ["All", Tab.ALL],
  ["Exams", Tab.EXAMS],
  ["Assignments", Tab.ASSES],
];

const Dashboard: FC<DashboardProps> = ({ name }) => {
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
              key={`${name}-${tab}`}
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
