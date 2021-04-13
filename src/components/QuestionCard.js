import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(({ typography, palette, spacing }) => ({
  root: { padding: spacing(3) },
  answerCompleted: {
    height: typography.h5.fontSize,
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

export default function QuestionCard({
  index,
  question,
  answers,
  value,
  onChange,
}) {
  const classes = useStyles();
  const [left, right] = question.split("_");

  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant="overline">Question {index}</Typography>
        <Box display="flex">
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {left}{" "}
            <span className={classes.answerCompleted}>
              {value !== undefined && answers[value]}
            </span>
            {right}
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select the correct answer</FormLabel>
          <RadioGroup
            row
            // the value must be a string, otherwise there are numerous problems:
            // - 0 is interpreted as a no-answer
            value={`${value}`}
            onChange={(event) => onChange(event.target.value)}
          >
            {answers.map((answer, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={`${index}`}
                  control={<Radio />}
                  label={answer}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  );
}
