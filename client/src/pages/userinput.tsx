import React, { FC } from "react";
import Router from "next/router";
import { Formik, Field, Form } from "formik";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Header from "../components/Header";

interface UserInputProps {}
type QuestionRow = [label: string, question: string];

interface Props {
  question: QuestionRow;
}
const questions: QuestionRow[] = [
  ["everyday", "I study every day"],
  ["no-phone", "I turn off the phone when studying"],
  ["breaks", "I take regular breaks, like every 30 minutes"],
  ["advance", "I like to study weeks in advance"],
  ["hard-first", "I study the hardest things first, then the easier ones"],
  ["write-notes", "I take review notes as I study, using my own words"],
  ["read-notes", "I look at my notes regularly"],
  ["practice", "I take practice exams"],
  ["reward", "I reward myself after a study session"],
  ["quiz", "I quiz myself on what I studied regularly"],
  ["different-place", "I like studying in different places"],
];
const Question: FC<Props> = ({ question }) => {
  return (
    <>
      <div id={`mc-question-${question[0]}`}>{question[1]}</div>
      <div role={`group-${question[0]}`} aria-labelledby={`radio-group-${question[0]}`}>
        {/* You should group each radio into the same name if you want them to be 
        the options for that value */}
        <label>
          Already Do
          <Field type="radio" name={question[0]} value="One" />
        </label>
        <label>
          Plan to Do
          <Field type="radio" name={question[0]} value="Two" />
        </label>
        <label>
          Not Interested
          <Field type="radio" name={question[0]} value="Three" />
        </label>
      </div>
    </>
  );
};

const UserInput: FC<UserInputProps> = () => {
  const AuthUser = useAuthUser();

  const submitHandler = async (values: Record<string, string>) => {
    // make http request here
    alert(JSON.stringify(values, null, 2));

    Router.push("/dashboard");
  };
  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <p className="py-2 text-sans text-4xl text-center text-yellow">
        How do you study best, {AuthUser.displayName}?
      </p>
      <div className="flex-col flex w-2/5 my-6 mx-auto space-y-4">
        <Formik initialValues={{}} onSubmit={submitHandler}>
          <Form>
            {questions.map((question, idx) => (
              <Question key={idx} question={question} />
            ))}
            <div className="flex mx-auto my-6">
              <Field
                type="submit"
                value="Submit"
                className="flex-grow text-center bg-yellow transition duration-300 ease-in-out transform hover:scale-105 hover:bg-hoverYellow text-medGreen font-sans py-2 px-16 rounded-full"
              />
            </div>
          </Form>
        </Formik>
      </div>
    </LinearBackground>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(UserInput);
