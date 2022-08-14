import { useState } from "react";

export const useSetState = (initialState = {}) => {
  const [state, regularSetState] = useState(initialState);
  const setState = (newState) => {
    const key = Object.keys(newState)[0];
    const value = newState[key];
    regularSetState((prevState) => {
      return {
        ...prevState,
        [key]: { ...prevState[key], ...value },
      };
    });
  };

  return [state, setState];
};
