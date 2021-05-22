import React, { FC } from "react";
import { Formik, Field, Form } from "formik";
import { useAuthUser, withAuthUser, AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import LinearBackground from "../components/LinearBackground";
import Header from "../components/Header";
import Button from "../components/Button";

interface UserInputProps {
  questions: string[];
}

interface Props {
  questions: string;
}
const questions = [
  "I study every day",
  "I turn off the phone when studying",
  "I take regular breaks, like every 30 minutes",
  "I like to study weeks in advance",
  "I study the hardest things first, then the easier ones",
  "I take review notes as I study, using my own words",
  "I look at my notes regularly",
  "I take practice exams",
  "I reward myself after a study session",
  "I quiz myself on what I studied regularly",
  "I like studying in different places",
];
const Question: FC<Props> = ({ questions }) => {
  return (
    <Form>
      <div id="mc-question">{questions}</div>
      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <Field type="radio" name="picked" value="One" />
          Already Do
        </label>
        <label>
          <Field type="radio" name="picked" value="Two" />
          Plan to Do
        </label>
        <label>
          <Field type="radio" name="picked" value="Two" />
          Not Interested
        </label>
      </div>
    </Form>
  );
};

const UserInput: FC<UserInputProps> = ({ questions }) => {
  const AuthUser = useAuthUser();
  return (
    <LinearBackground colours={["from-medGreen", "to-yellow"]}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <p className="py-2 text-sans text-4xl text-center text-yellow">
        How do you study best, {AuthUser.displayName}?
      </p>
      <div className="flex-col flex w-2/5 my-6 mx-auto space-y-4">
        <Formik
          initialValues={{
            picked: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {questions.map((question, idx) => (
            <Question questions={question} />
          ))}
        </Formik>
        <div className="flex mx-auto my-6">
          <Button href="/dashboard">Done</Button>
        </div>
      </div>
    </LinearBackground>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(UserInput);
