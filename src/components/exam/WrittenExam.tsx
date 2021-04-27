import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWrittenExam } from "../../hooks/written-exam-hook";
import { Cell } from "./Layout";

export default function WrittenExam({ onSubmit, questions }) {
  const {
    questions: currentQuestions,
    level,
    done,
    submit,
    answers,
  } = useWrittenExam(questions, 0.7);

  useEffect(() => {
    if (done) {
      onSubmit(level, answers);
    }
  }, [done]);

  return (
    <WrittenExamStep
      questions={currentQuestions}
      level={level}
      onSubmit={(answers) => submit(answers)}
    />
  );
}

function WrittenExamStep({
  questions,
  onSubmit,
  level,
}: {
  questions: any;
  onSubmit: (answers: Record<string, string>) => void;
  level: string;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Record<string, string>>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper>
        <Cell>
          <Typography variant="h3" component="h1">
            Written Part
          </Typography>
          <Typography variant="subtitle1">Level {level}</Typography>
          <Box mt={2}>
            <Typography paragraph>
              Try to complete the following sentences so they make sense
              gramatically. Each question scores the same. You will advance one
              level if the score is greater than 70%.
            </Typography>
          </Box>
        </Cell>

        {questions.map(({ question_id: id, question, answers }, index) => (
          <Cell key={index}>
            <Typography variant="overline">
              Question {index + 1} of {questions.length}
            </Typography>
            <Typography variant="h5" component="h2">
              <CompleteQuestion answer={watch(id)}>{question}</CompleteQuestion>
            </Typography>

            <Box mt={2}>
              <FormControl
                component="fieldset"
                error={errors[id] !== undefined}
                required
              >
                <FormLabel component="legend">
                  Select the correct answer
                </FormLabel>
                <RadioGroup row {...register(id, { required: true })}>
                  {answers.map((answer, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                      />
                    );
                  })}
                </RadioGroup>
                {errors[id] !== undefined && (
                  <FormHelperText>Please answer this question</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Cell>
        ))}

        <Cell>
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Box>
        </Cell>
      </Paper>
    </form>
  );
}

const useStyles = makeStyles(({ typography, palette }) => ({
  answerCompleted: {
    color: palette.primary.main,
    borderBottom: `3px solid ${palette.primary.main}`,
    fontWeight: typography.fontWeightBold,
    "&:empty": {
      display: "inline-block",
      width: "32px",
      transform: "translateY(9px)",
    },
  },
}));

const CompleteQuestion: React.FC<{ children: string; answer?: string }> = ({
  children,
  answer,
}) => {
  const classes = useStyles();
  const [left, right] = children.split("_");

  return (
    <>
      {left} <span className={classes.answerCompleted}>{answer}</span> {right}
    </>
  );
};
