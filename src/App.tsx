import {
  AppBar,
  Avatar,
  Grow,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useTheme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Exam from "./components/exam";
import { Menu as MenuIcon } from "@material-ui/icons";
import Menu from "./components/Menu";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const [exam, setExam] = useState();

  useEffect(() => {
    fetch("/english_exam.json", { method: "GET" })
      .then((res) => res.json())
      .then((exam) => setExam(exam));
  }, []);

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography>Level Tests</Typography>

          <div style={{ flexGrow: 1 }}></div>

          {/* <IconButton color="inherit" size="small">
            <MenuIcon />
          </IconButton> */}

          {isAuthenticated && (
            <>
              <Menu />
            </>
          )}
          {!isAuthenticated && (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {exam ? <Exam exam={exam} /> : <></>}
    </>
  );
}
