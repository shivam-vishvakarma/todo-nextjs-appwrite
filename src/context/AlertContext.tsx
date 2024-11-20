"use client";

import { createContext, useContext, useState } from "react";

export type Type = "success" | "error" | "info";

export type AlertContextType = {
  message: string;
  type: Type;
  callAlert: (message: string, type: Type) => void;
  closeAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Type>("success");

  const callAlert = (message: string, type: Type) => {
    setMessage(message);
    setType(type);
  };

  const closeAlert = () => {
    setMessage("");
  };

  return (
    <AlertContext.Provider value={{ message, type, callAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
