import React, { createContext, useState, useCallback, useContext } from 'react';

// 1. Create the context with default values
export const ErrorContext = createContext({
  hasError: false,       // Boolean flag
  setErrorTrue: () => {}, // Function to set true
  setErrorFalse: () => {} // Function to set false
});

// 2. Provider component
export function ErrorContextProvider({ children }) {
  const [hasError, setHasError] = useState(false);

  // set error ON
  const setErrorTrue = useCallback(() => setHasError(true), []);
  // set error OFF
  const setErrorFalse = useCallback(() => setHasError(false), []);

  return (
    <ErrorContext.Provider value={{ hasError, setErrorTrue, setErrorFalse }}>
      {children}
    </ErrorContext.Provider>
  );
}

// 3. Hook for consuming context easily
export function useError() {
  return useContext(ErrorContext);
}
