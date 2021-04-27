export default interface Question {
  question_id: string;
  level: string;
  question: string;
  answers: Array<string>;
  correct: string;
}
