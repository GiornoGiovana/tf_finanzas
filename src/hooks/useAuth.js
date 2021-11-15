import { onAuthStateChanged } from "@firebase/auth";
import { useState } from "react/cjs/react.development";
import { auth } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user);
      // ...
    } else {
      // User is signed out
      // ...
      setUser(null);
    }
  });
  return user;
};
