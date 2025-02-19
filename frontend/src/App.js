import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// import Navbar from "./components/Navbar";
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import AuthContext from './Context/AuthContext';
import { useContext } from "react";
// import Create from "./components/Create";
// import About from "./components/About";

function App() {
  const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    if(user)
      console.log(user);
  },[user])

  return (
    <div className="App">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />         
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<Scoreboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
