"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  category: string;
  setCategory: (category: string) => void;
}

const defaultValues: AppContextType = {
  category: "TOURS",
  setCategory: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValues);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<string>("TOURS");

  return (
    <AppContext.Provider value={{ category, setCategory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
