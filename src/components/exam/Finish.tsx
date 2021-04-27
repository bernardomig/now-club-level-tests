import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tooltip, useTheme } from "@material-ui/core";
import Message from "./Message";

export default function Finish({
  onNext,
  onRetry,
  level,
}: {
  onNext: () => void;
  onRetry: () => void;
  level: string;
}) {
  const { spacing } = useTheme();

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Message
      heading={`Congratulatios! You are level ${level}`}
      message={[
        "Despite your current scoring, consider this a temporary score, as we have to review the oral answers to place you at your level.",
        "If you wish to apply for any course at NowClub, submit your answer.",
      ]}
      imageSrc={"/undraw_winners_ao2o.svg"}
      actions={
        <div style={{ display: "flex", gap: spacing(2) }}>
          <Button variant="outlined" onClick={onRetry}>
            Retry Again
          </Button>
          {isAuthenticated ? (
            <Button
              variant="contained"
              color="primary"
              disabled={!isAuthenticated}
              onClick={onNext}
            >
              Submit as {user.nickname}
            </Button>
          ) : (
            <Tooltip title="You must loggin to submit">
              <div>
                <Button variant="contained" color="primary" disabled>
                  Submit
                </Button>
              </div>
            </Tooltip>
          )}
        </div>
      }
    />
  );
}
