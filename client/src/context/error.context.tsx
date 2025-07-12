"use client";

import { IErrorContext } from "@/interfaces/context/error-context.interface";
import { createContext, useState } from "react";

export const ErrorContext = createContext<IErrorContext | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
