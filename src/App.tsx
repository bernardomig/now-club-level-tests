import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Exam from "./components/exam";
import Menu from "./components/Menu";

export default function App() {
  const [exam, setExam] = useState();

  useEffect(() => {
    fetch("/english_exam.json", { method: "GET" })
      .then((res) => res.json())
      .then((exam) => setExam(exam));
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography>Level Tests</Typography>

          <div style={{ flexGrow: 1 }}></div>

          <Menu />
        </Toolbar>
      </AppBar>
      {exam ? <Exam exam={exam} /> : <></>}
    </>
  );
}
