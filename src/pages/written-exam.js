import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { writtenQuestions } from "../api/questions";

import Layout from "../components/Layout";

import QuestionCard from "../components/QuestionCard";

export default function WrittenExam({ onNext, onPrev }) {
  const questions = writtenQuestions;

  const [answered, setAnswered] = useState({});

  function answerQuestion(id, answer) {
    setAnswered({ ...answered, [id]: answer });
  }

  return (
    <Layout
      title="Written Exam"
      description={
        <>
          <Typography paragraph>
            Occaecat proident ex culpa consectetur incididunt. Deserunt est elit
            reprehenderit do ullamco aliqua dolore laborum sit mollit ut
            occaecat. Mollit dolor cupidatat dolore sunt occaecat aliqua. Aliqua
            velit sit excepteur eiusmod exercitation.
          </Typography>
          <Typography paragraph>
            Occaecat proident ex culpa consectetur incididunt. Deserunt est elit
            reprehenderit do ullamco aliqua dolore laborum sit mollit ut
            occaecat. Mollit dolor cupidatat dolore sunt occaecat aliqua. Aliqua
            velit sit excepteur eiusmod exercitation.
          </Typography>
        </>
      }
      onNext={onNext}
    >
      <Grid container component="form" direction="column" spacing={3}>
        {questions.map(({ id, question, answers }, index) => (
          <Grid item key={index}>
            <QuestionCard
              index={index + 1}
              question={question}
              answers={answers}
              value={answered[id]}
              onChange={(value) => answerQuestion(id, value)}
            ></QuestionCard>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
