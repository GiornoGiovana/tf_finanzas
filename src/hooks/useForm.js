import { useState } from "react";

export const useForm = (formData) => {
  const [state, setState] = useState(formData);

  return [
    state,
    (e) => {
      setState((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    },
  ];
};
