import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// import Navbar from "./components/Navbar";
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import History from "./components/History";
import Attempt from "./components/Attempt";
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
          <Route path="/quiz" element={user ? <Quiz /> : <Login /> } />
          <Route path="/score" element={<Scoreboard />} />
          <Route path="/history" element={user ? <History /> : <Login /> } />
          <Route path="/attempt" element={<Attempt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
