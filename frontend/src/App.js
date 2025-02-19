import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
// import Create from "./components/Create";
// import About from "./components/About";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />          
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
