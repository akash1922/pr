import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  return (
    <MovieContext.Provider value={{}}>
      {children}
    </MovieContext.Provider>
  );
};
