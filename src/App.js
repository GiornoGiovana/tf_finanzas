import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { TCEA } from "./components/TCEA";
import { auth } from "./firebase";
import { OperacionContext } from "./hooks/useOperacion";

function App() {
  const [operacion, setOperacion] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  console.log("operacion: ", operacion);

  return (
    <div className="App">
      <Header />
      <OperacionContext.Provider value={{ operacion, setOperacion }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tcea" element={<TCEA />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </OperacionContext.Provider>
    </div>
  );
}

export default App;
