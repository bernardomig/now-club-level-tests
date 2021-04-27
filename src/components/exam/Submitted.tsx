import { Button } from "@material-ui/core";
import Message from "./Message";

export default function Submitted({ onNext }: { onNext: () => void }) {
  return (
    <Message
      heading="Your test has been submitted!"
      message={[
        "You will now receive an email with the confirmation. The test will be reviewed by one of ower staff to confirm your level.",
      ]}
      imageSrc="/undraw_Mail_sent_re_0ofv.svg"
      actions={
        <>
          <Button variant="contained" color="primary" onClick={onNext}>
            Book a Course
          </Button>
        </>
      }
    />
  );
}
