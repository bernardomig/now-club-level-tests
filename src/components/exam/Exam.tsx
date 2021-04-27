import { Container, makeStyles } from "@material-ui/core";
import { usePersistState } from "../../hooks/persist-state-hook";
import Finish from "./Finish";
import Intro from "./Intro";
import OralExam from "./OralExam";
import Submitted from "./Submitted";
import WrittenExam from "./WrittenExam";

const useStyles = makeStyles(({ spacing }) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
    justifyContent: "center",
  },
}));

type Steps = "intro" | "finish" | "written" | "oral" | "submitted";

export default function Exam({ exam }) {
  const classes = useStyles();
  const [state, setState, clearState] = usePersistState<{
    step: Steps;
    level: string;
    written: Array<{ question_id: string; answer: string }>;
    oral: Array<{ question_id: string; answer: string }>;
  }>("exam", { step: "intro", level: "A1", written: [], oral: [] });

  const { step } = state;

  function setStep(step: Steps) {
    setState({ ...state, step });
  }

  return (
    <Container maxWidth="md" className={classes.main}>
      {step === "intro" && <Intro onNext={() => setStep("written")} />}
      {step === "written" && (
        <WrittenExam
          questions={exam.written}
          onSubmit={(level, answers) => {
            setState({ ...state, step: "oral", level, written: answers });
          }}
        />
      )}
      {step === "oral" && (
        <OralExam
          questions={exam.oral}
          onSubmit={(answers) => {
            setState({ ...state, step: "finish", oral: answers });
          }}
        />
      )}
      {step === "finish" && (
        <Finish
          level={state.level}
          onRetry={() => clearState()}
          onNext={() => {
            setStep("submitted");
            clearState();
          }}
        />
      )}
      {step === "submitted" && <Submitted onNext={() => clearState()} />}
    </Container>
  );
}
