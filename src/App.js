import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { TCEA } from "./components/TCEA";
import { auth } from "./firebase";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tcea" element={<TCEA />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
