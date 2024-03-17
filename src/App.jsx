import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import QuizPage from "./components/QuizPage";
import AddQuestion from "./components/AddQuestion";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Routes>
          <Route path="/" index element={<WelcomePage />} />
          <Route path="/quiz" index element={<QuizPage />} />
          <Route path="/add" index element={<AddQuestion />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
