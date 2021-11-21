import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { TCEA } from "./components/TCEA";
import { OperacionContext } from "./hooks/useOperacion";

function App() {
  const [operacion, setOperacion] = useState({});

  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <Header setIsLogged={setIsLogged} />
      <OperacionContext.Provider value={{ operacion, setOperacion }}>
        <Routes>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route
            path="/signup"
            element={<Signup setIsLogged={setIsLogged} />}
          />
          <Route path="/tcea/:id" element={<TCEA isLogged={isLogged} />} />
          <Route path="/" element={<Home isLogged={isLogged} />} />
        </Routes>
      </OperacionContext.Provider>
    </div>
  );
}

export default App;
