import { Button } from "@material-ui/core";
import Message from "./Message";

export default function Intro({ onNext }: { onNext: () => any }) {
  return (
    <Message
      heading={"Welcome to the English Level Test"}
      message={[
        "This test is composed of two small tests that will evaluate both your writting english skills, as well as your spoken skills.",
        "The duration of this exam is around 30 minutes, depending on your level.",
        "You need to be either logged-in or provide an email to submit the exam.",
      ]}
      imageSrc={"/undraw_exams_g4ow.svg"}
      actions={
        <Button variant="contained" color="primary" onClick={onNext}>
          Start
        </Button>
      }
    />
  );
}
