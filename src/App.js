import { Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { TCEA } from "./components/TCEA";
import { OperacionContext } from "./hooks/useOperacion";

function App() {
  const [operacion, setOperacion] = useState({});

  return (
    <div className="App">
      <Header />
      <OperacionContext.Provider value={{ operacion, setOperacion }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tcea/:id" element={<TCEA />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </OperacionContext.Provider>
    </div>
  );
}

export default App;
