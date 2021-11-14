import { createContext, useContext } from "react";

export const OperacionContext = createContext(null);

export const useOperacion = () => useContext(OperacionContext);
