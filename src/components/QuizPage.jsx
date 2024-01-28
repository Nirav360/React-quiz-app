/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuizPage = ({ data }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [counter, setCounter] = useState(60);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  // const { questions, totalQuestions } = quiz;
  // const { question, choices, correctAnswer } = questions[activeQuestion];
  const navigate = useNavigate();

  const onClickNext = (finalAnswer) => {
    console.log(data);
    setSelectedAnswerIndex(null);
    setCounter(60);
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 2,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== data.totalQuestions - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === data.questions[activeQuestion].correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((oldCounter) => {
        if (oldCounter === 0) {
          return onClickNext(false);
        }
        return oldCounter - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Card className="customcard !rounded-lg">
        {!showResult ? (
          <>
            <CardContent>
              <div className="p-2 border border-solid rounded-lg">
                <div className="mx-8">
                  <div className="flex justify-between font-extrabold text-2xl m-4">
                    <h1>
                      Question {activeQuestion + 1}/{data.totalQuestions}
                    </h1>
                    <span
                      style={{
                        color: `${
                          counter > 30
                            ? "green"
                            : counter > 15
                            ? "orange"
                            : "red"
                        }`,
                      }}
                    >
                      {counter}
                    </span>
                  </div>
                  <Typography
                    variant="h6"
                    component="div"
                    className="p-4 text-center"
                  >
                    {data.questions[activeQuestion].question}
                  </Typography>
                </div>
              </div>
              <ol className="cursor-pointer">
                {data.questions[activeQuestion].choices.map((answer, index) => (
                  <li
                    className={
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }
                    onClick={() => onAnswerSelected(answer, index)}
                    key={index}
                  >
                    {answer}
                  </li>
                ))}
              </ol>
            </CardContent>
            <CardActions className="float-right mr-4">
              <Button
                size="small"
                onClick={() => onClickNext(selectedAnswer)}
                variant="contained"
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === data.totalQuestions - 1 ? "Finish" : "Next"}
              </Button>
            </CardActions>
          </>
        ) : (
          <>
            <h1 className="text-center font-extrabold text-3xl m-4">Result</h1>
            <CardContent className="m-4">
              <Typography variant="h5" component="div" className="p-4">
                Total Questions:
                <span className="font-bold">{data.totalQuestions}</span>
              </Typography>
              <Typography variant="h5" component="div" className="p-4">
                Total Score: <span className="font-bold">{result.score}</span>
              </Typography>
              <Typography variant="h5" component="div" className="p-4">
                Total Correct Answers:
                <span className="font-bold">{result.correctAnswers}</span>
              </Typography>
              <Typography variant="h5" component="div" className="p-4">
                Total Wrong Answers:
                <span className="font-bold">{result.wrongAnswers}</span>
              </Typography>
            </CardContent>
            <div className="text-center m-4">
              <Button
                size="small"
                onClick={() => navigate("/")}
                variant="contained"
              >
                Home
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default QuizPage;
