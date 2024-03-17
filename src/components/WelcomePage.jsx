import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useFetchQuestions from "../hooks/useFetchQuestions";

const WelcomePage = () => {
  const { data, isPending, error } = useFetchQuestions(
    "http://localhost:5000/api/questions"
  );
  const navigate = useNavigate();

  const onStart = () => {
    navigate("quiz", { state: data });
  };

  const onAdd = () => {
    navigate("add");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        {isPending && <div>Loading....</div>}
        {error && <div>{error}</div>}
        {data && (
          <>
            <h1 className="font-extrabold text-3xl">Welcome to Quiz App</h1>
            <div className="flex gap-2">
              <Button
                variant="contained"
                className="normal-case"
                onClick={onStart}
              >
                Take Quiz
              </Button>
              <Button
                variant="contained"
                className="normal-case"
                onClick={onAdd}
              >
                Add question
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WelcomePage;
