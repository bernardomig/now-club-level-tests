import { Container, makeStyles } from "@material-ui/core";
import { useState } from "react";
import OralExam from "./pages/oral-exam";
import WrittenExam from "./pages/written-exam";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(3),
    marginBottom: spacing(3)
  }
}));

function App() {
  const classes = useStyles();
  const [step, setStep] = useState("written");

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        {step === "written" ? (
          <WrittenExam onNext={() => setStep("oral")} />
        ) : (
          <OralExam />
        )}
      </Container>
    </>
  );
}

export default App;
