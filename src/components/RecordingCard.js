import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import VoiceRecorder from "./VoiceRecorder";

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

export default function RecordingCard({ index, question }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant="overline">Question {index}</Typography>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          {question}
        </Typography>
      </Box>

      <Box mt={3}>
        <VoiceRecorder />
      </Box>
    </Paper>
  );
}
