import { Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { TCEA } from "./components/TCEA";
import { useAuth } from "./hooks/useAuth";
import { OperacionContext } from "./hooks/useOperacion";
import { Navigate } from "react-router";

function App() {
  const [operacion, setOperacion] = useState({});

  const user = useAuth();

  return (
    <div className="App">
      <Header />
      <OperacionContext.Provider value={{ operacion, setOperacion }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user ? (
            <Route path="/tcea/:id" element={<TCEA />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </OperacionContext.Provider>
    </div>
  );
}

export default App;
