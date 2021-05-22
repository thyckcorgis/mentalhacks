import React, { FC, useState } from "react";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Header from "../components/Header";
import Button from "../components/Button";

interface CourseProps {
  courses: string[];
}

const colours = [
  ["Red", "bg-courseRed"],
  ["Blue", "bg-courseBlue"],
  ["Green", "bg-courseGreen"],
  ["Yellow", "bg-courseYellow"],
  ["Pink", "bg-courseRed"],
  ["Purple", "bg-coursePurple"],
];

interface Props {
  name: string;
  colour: number;
}
const Course: FC<Props> = ({ name, colour }) => {
  const [colourIdx, setColourIdx] = useState(colour % colours.length);
  return (
    <div
      className={`text-medGreen flex px-4 py-2 rounded-lg flex-1 justify-between ${colours[colourIdx][1]}`}
    >
      {name}
      <button
        className="text-medGreen border border-transparent rounded-full shadow opacity-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setColourIdx((colourIdx + 1) % colours.length)}
      >
        Change Colour
      </button>
    </div>
  );
};

const Courses: FC<CourseProps> = ({ courses }) => {
  const AuthUser = useAuthUser();

  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div className="flex flex-col h-4/5 content-center">
        <p className="py-2 text-sans text-4xl text-center text-yellow">
          Are these your courses, {AuthUser.displayName}?
        </p>
        <div className="flex-col flex w-2/5 my-6 mx-auto space-y-4">
          {courses.map((course, idx) => (
            <Course key={`${course}-${idx}`} name={course} colour={idx} />
          ))}
          <div className="flex mx-auto my-6">
            <Button href="/dashboard">Confirm</Button>
          </div>
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
