import { Box, Typography, Grid, Button } from "@material-ui/core";
import { oralQuestions } from "../api/questions";
import RecordingCard from "../components/RecordingCard";

export default function OralExam() {
  return (
    <>
      <Box component="header" mb={4}>
        <Typography variant="h2" gutterBottom>
          Oral Exam
        </Typography>

        <Typography variant="body1" paragraph>
          Occaecat proident ex culpa consectetur incididunt. Deserunt est elit
          reprehenderit do ullamco aliqua dolore laborum sit mollit ut occaecat.
          Mollit dolor cupidatat dolore sunt occaecat aliqua. Aliqua velit sit
          excepteur eiusmod exercitation.
        </Typography>
        <Typography variant="body1" paragraph>
          Occaecat proident ex culpa consectetur incididunt. Deserunt est elit
          reprehenderit do ullamco aliqua dolore laborum sit mollit ut occaecat.
          Mollit dolor cupidatat dolore sunt occaecat aliqua. Aliqua velit sit
          excepteur eiusmod exercitation.
        </Typography>
      </Box>

      <Grid container component="main" direction="column" spacing={3}>
        {oralQuestions.map(({ id, question }, index) => {
          return (
            <Grid item key={index}>
              <RecordingCard
                index={index + 1}
                question={question}
              ></RecordingCard>
            </Grid>
          );
        })}
      </Grid>

      <Box
        mt={4}
        component="footer"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Button size="large" variant="text" color="default">
          Back
        </Button>
        <Button size="large" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </>
  );
}
