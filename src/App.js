import { Routes, Route, Link } from "react-router-dom";
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
          <Route path="/tcea/:id" element={<TCEA />} />
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="*" element={<Forbidden />} />
        </Routes>
      </OperacionContext.Provider>
    </div>
  );
}

const Forbidden = () => {
  var root = document?.documentElement;
  var eyef = document?.getElementById("eyef");
  var cx = document?.getElementById("eyef")?.getAttribute("cx");
  var cy = document?.getElementById("eyef")?.getAttribute("cy");

  document.addEventListener("mousemove", (evt) => {
    let x = evt?.clientX / window.innerWidth;
    let y = evt?.clientY / window.innerHeight;

    root?.style?.setProperty("--mouse-x", x);
    root?.style?.setProperty("--mouse-y", y);

    cx = 115 + 30 * x;
    cy = 50 + 30 * y;
    eyef?.setAttribute("cx", cx);
    eyef?.setAttribute("cy", cy);
  });

  document.addEventListener("touchmove", (touchHandler) => {
    let x = touchHandler.touches[0].clientX / window.innerWidth;
    let y = touchHandler.touches[0].clientY / window.innerHeight;

    root?.style?.setProperty("--mouse-x", x);
    root?.style?.setProperty("--mouse-y", y);
  });
  return (
    <div className="forbidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
      >
        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />{" "}
          </clipPath>
          <text id="text-s" class="error-text" y="106">
            {" "}
            403{" "}
          </text>
        </defs>
        <path
          class="alarm"
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black"></use>
        <use xlinkHref="#text-s" fill="#2b2b2b"></use>
        <g id="robot">
          <g id="eye-wrap">
            <use xlinkHref="#white-eye"></use>
            <circle
              id="eyef"
              class="eye"
              clip-path="url(#white-clip)"
              fill="#000"
              stroke="#2aa7cc"
              stroke-width="2"
              stroke-miterlimit="10"
              cx="130"
              cy="65"
              r="11"
            />
            <ellipse
              id="white-eye"
              fill="#2b2b2b"
              cx="130"
              cy="40"
              rx="18"
              ry="12"
            />
          </g>
          <circle class="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
          <use xlinkHref="#tornillo" x="50"></use>
          <use xlinkHref="#tornillo" x="50" y="60"></use>
          <use xlinkHref="#tornillo" y="60"></use>
        </g>
      </svg>
      <h1>You are not allowed to enter here</h1>
      <h2>
        Go <Link to="/">Home!</Link>
      </h2>
    </div>
  );
};

export default App;
