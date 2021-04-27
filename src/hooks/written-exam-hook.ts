import { useState } from "react";
import Question from "../interfaces/question";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function useWrittenExam(
  questions: Array<Question>,
  passingScore: number
) {
  const [done, setDone] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [allAnswers, setAllAnswers] = useState<
    Array<{ question_id: string; answer: string }>
  >([]);

  const level = LEVELS[currentLevel];

  const currentQuestions = questions.filter((q) => q.level === level);

  function advanceLevel() {
    setCurrentLevel(currentLevel + 1);
    if (currentLevel + 2 === LEVELS.length) setDone(true);
  }

  function submit(answers: Record<string, string>) {
    if (done) return;

    setAllAnswers([
      ...allAnswers,
      ...currentQuestions.map(({ question_id }) => ({
        question_id,
        answer: answers[question_id],
      })),
    ]);

    const correctAnswers = currentQuestions.filter(
      ({ question_id, correct }) => answers[question_id] === correct
    ).length;
    const score = correctAnswers / currentQuestions.length;

    if (score >= passingScore) advanceLevel();
    else setDone(true);
  }

  return {
    level,
    questions: currentQuestions,
    submit,
    done,
    answers: allAnswers,
  };
}
