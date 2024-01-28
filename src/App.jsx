import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import QuizPage from "./components/QuizPage";
import useFetchQuestions from "./hooks/useFetchQuestions";

function App() {
  const { data, isPending, error } = useFetchQuestions(
    "http://localhost:5000/api/questions"
  );
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {isPending && <div>Loading....</div>}
        {error && <div>{error}</div>}
        <Routes>
          <Route path="/" index element={data && <WelcomePage />} />
          <Route
            path="/quiz"
            index
            element={data && <QuizPage data={data} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
