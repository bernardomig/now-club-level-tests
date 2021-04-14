import { Container, makeStyles } from "@material-ui/core";
import { useState } from "react";
import WrittenExam from "./pages/written-exam";

import { writtenQuestions } from "./api/questions";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(3),
    marginBottom: spacing(3)
  }
}));

function checkScore(questions, answers) {
  const numQuestions = questions.length;
}

function App() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <WrittenExam
          questions={writtenQuestions}
          onNext={(answers) =>
            console.log(checkScore(writtenQuestions, answers))
          }
        />
      </Container>
    </>
  );
}

export default App;
