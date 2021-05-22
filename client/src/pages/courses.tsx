import React, { FC, useState } from "react";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Header from "../components/Header";
import Button from "../components/Button";

interface CourseProps {
  courses: string[];
}

const colours = [
  ["Red", "bg-red-600"],
  ["Blue", "bg-blue-600"],
  ["Green", "bg-green-600"],
  ["Yellow", "bg-yellow"],
  ["Pink", "bg-pink-500"],
  ["Indigo", "bg-indigo-500"],
];

interface Props {
  name: string;
  colour: number;
}
const Course: FC<Props> = ({ name, colour }) => {
  const [colourIdx, setColourIdx] = useState(colour % colours.length);
  return (
    <div className={`flex flex-col ${colours[colourIdx][1]}`}>
      {name}
      <button onClick={() => setColourIdx((colourIdx + 1) % colours.length)}>Change Colour</button>
    </div>
  );
};

const Courses: FC<CourseProps> = ({ courses }) => {
  const AuthUser = useAuthUser();

  return (
    <LinearBackground colours={["from-darkGreen", "to-medGreen"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div className="flex flex-col h-4/5 content-center">
        <p className="py-2 text-sans text-4xl text-center text-yellow">
          Welcome, {AuthUser.displayName}
        </p>
        <div className="h-full w-4/5 bg-gradient-to-b from-medGreen rounded-lg mx-auto ">
          <p>Are these your courses?</p>
          {courses.map((course, idx) => (
            <Course key={`${course}-${idx}`} name={course} colour={idx} />
          ))}
          <Button href="/dashboard">Confirm</Button>
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
      courses: ["ECE 420", "MEC E 420", "CIV E 420", "CHE 420", "ENGG 420"],
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Courses);
