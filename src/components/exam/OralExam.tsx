import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import VoiceRecorder from "../VoiceRecorder";
import { Cell } from "./Layout";

export default function OralExam({
  questions,
  onSubmit,
}: {
  questions: any;
  onSubmit: (answers: Array<{ question_id: string; answer: string }>) => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Record<string, string>>();

  return (
    <form
      onSubmit={handleSubmit((answers) =>
        onSubmit(
          questions.map(({ question_id }) => ({
            question_id,
            answer: answers[question_id],
          }))
        )
      )}
    >
      <Paper>
        <Cell>
          <Typography variant="h3" component="h1">
            Oral Part
          </Typography>
          <Box mt={2}>
            <Typography paragraph>
              Formulate an answer around the provided topic, and record you
              talking.
            </Typography>
          </Box>
        </Cell>

        {questions.map(({ question_id, question }, index) => (
          <Cell key={question_id}>
            <Typography variant="overline">
              Question {index + 1} of {questions.length}
            </Typography>

            <Typography variant="h5" component="h2">
              {question}
            </Typography>

            <Box mt={2}>
              <FormControl
                component="fieldset"
                error={errors[question_id] !== undefined}
                required
              >
                <FormLabel component="legend">Record your answer</FormLabel>
                <Box mt={1}>
                  <Controller
                    name={question_id}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <VoiceRecorder value={value} onChange={onChange} />
                    )}
                  />
                </Box>

                {errors[question_id] !== undefined && (
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
