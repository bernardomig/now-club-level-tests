import { renderHook, act } from "@testing-library/react-hooks";
import { useWrittenExam } from "./written-exam-hook";

const exampleQuestions = [
  {
    question_id: "d01b3a92-b8fb-4a24-acb7-b79b8193038b",
    level: "A1",
    question: "",
    answers: ["a", "b", "c", "d"],
    correct: "a",
  },
  {
    question_id: "b84a2192-b035-4069-b15d-4f49e7a46a72",
    level: "A2",
    question: "",
    answers: ["a", "b", "c", "d"],
    correct: "a",
  },
  {
    question_id: "225cf79e-d9be-4f4f-81d4-396bb6ff3827",
    level: "B1",
    question: "",
    answers: ["a", "b", "c", "d"],
    correct: "a",
  },
  {
    question_id: "beaf9ad4-d228-4053-b118-c05f2267fbd0",
    level: "B2",
    question: "",
    answers: ["a", "b", "c", "d"],
    correct: "a",
  },
  {
    question_id: "0d8df1a2-be89-4864-b5d4-4f808aa8c40a",
    level: "C1",
    question: "",
    answers: ["a", "b", "c", "d"],
    correct: "a",
  },
];

test("should start at level 0", () => {
  const { result } = renderHook(() => useWrittenExam(exampleQuestions, 0.7));

  expect(result.current.level).toBe("A1");
});

test("should provide only questions of the first level", () => {
  const { result } = renderHook(() => useWrittenExam(exampleQuestions, 0.7));

  expect(result.current.questions).toHaveLength(1);
});

test("should advance one level if provided the correct answer", () => {
  const { result } = renderHook(() => useWrittenExam(exampleQuestions, 0.7));

  act(() =>
    result.current.submit({ "d01b3a92-b8fb-4a24-acb7-b79b8193038b": "a" })
  );

  expect(result.current.done).toBe(false);
  expect(result.current.level).toBe("A2");
});

test("should be done if provided the incorrect answer", () => {
  const { result } = renderHook(() => useWrittenExam(exampleQuestions, 0.7));

  act(() => {
    result.current.submit({ "d01b3a92-b8fb-4a24-acb7-b79b8193038b": "b" });
  });

  expect(result.current.done).toBe(true);
  expect(result.current.level).toBe("A1");
});
