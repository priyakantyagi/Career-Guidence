// src/context/ScoreContext.jsx
import React, { createContext, useState, useContext } from "react";

// 1. Create Context
const ScoreContext = createContext();

// 2. Custom Hook (for cleaner access)
export const useScore = () => useContext(ScoreContext);

// 3. Provider Component
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    quantitative: 0,
    verbal: 0,
    gk: 0,
  });

  return (
    <ScoreContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoreContext.Provider>
  );
};
