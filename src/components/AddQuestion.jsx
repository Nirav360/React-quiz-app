import { useEffect, useRef, useState } from "react";
import { Button, Card, CardContent, MenuItem, TextField } from "@mui/material";
import CustomAlert from "../shared/CustomAlert";
import usePostQuestion from "../hooks/usePostQuestion";

const AddQuestion = () => {
  const [showCorrectAns, setCorrectAns] = useState(false);
  const { loading, error, data, postData } = usePostQuestion(
    "http://localhost:5000/api/questions"
  );
  const questionRef = useRef(null);
  const inputRefs = useRef([]);
  const [choices, setChoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const correctAnswerRef = useRef(null);

  const onClickCorrectAnswer = () => {
    if (
      !questionRef.current.value ||
      !inputRefs.current.every((ref) => ref && ref.value)
    ) {
      // If any of the fields are empty, show an alert or error message
      setOpen(true);
      return;
    }
    setCorrectAns(true);
    const values = inputRefs.current.map((ref) => {
      return { label: ref?.value, value: ref?.value };
    });
    setChoices(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const choiceValues = inputRefs.current.map((ref) => ref?.value);
    const payload = {
      question: questionRef.current?.value,
      choices: choiceValues,
      correctAnswer: correctAnswerRef.current?.value,
    };
    await postData(payload);
    if (!error) {
      e.target.reset();
      setCorrectAns(false);
      inputRefs.current = [];
      questionRef.current = null;
      correctAnswerRef.current = null;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) return setSuccess(true);
  }, [data]);
  
  return (
    <>
      {open && (
        <CustomAlert
          open={open}
          handleClose={handleClose}
          type="error"
          message={
            "Please fill out all fields before selecting the correct answer."
          }
        />
      )}

      {success && (
        <CustomAlert
          open={data}
          handleClose={() => setSuccess(false)}
          type="success"
          message={data?.message}
        />
      )}

      {error && <div>{error}</div>}

      <Card className="w-[30%] !rounded-lg" elevation={10}>
        <CardContent>
          <h1 className="font-extrabold text-2xl text-center">Add Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 m-auto">
              <TextField
                label="Question"
                variant="standard"
                name="question"
                multiline
                rows={3}
                inputRef={questionRef}
                disabled={showCorrectAns}
                required
              />
              <TextField
                label="Choice 1"
                variant="standard"
                name="choice1"
                inputRef={(el) => (inputRefs.current[0] = el)}
                disabled={showCorrectAns}
                required
              />
              <TextField
                label="Choice 2"
                variant="standard"
                name="choice2"
                inputRef={(el) => (inputRefs.current[1] = el)}
                disabled={showCorrectAns}
                required
              />
              <TextField
                label="Choice 3"
                variant="standard"
                name="choice3"
                inputRef={(el) => (inputRefs.current[2] = el)}
                disabled={showCorrectAns}
                required
              />
              <TextField
                label="Choice 4"
                variant="standard"
                name="choice4"
                inputRef={(el) => (inputRefs.current[3] = el)}
                disabled={showCorrectAns}
                required
              />
              {!showCorrectAns && (
                <Button
                  variant="contained"
                  className="normal-case !my-4"
                  onClick={onClickCorrectAnswer}
                >
                  Select Correct Answer
                </Button>
              )}

              {showCorrectAns && (
                <>
                  <TextField
                    select
                    label="Correct Answer"
                    name="correctAnswer"
                    inputRef={correctAnswerRef}
                    defaultValue=""
                    required
                  >
                    {choices.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    className="normal-case"
                    type="submit"
                    disabled={loading}
                  >
                    Add
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddQuestion;
