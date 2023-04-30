import DisplayBook from "./components/DisplayBook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DisplayBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
