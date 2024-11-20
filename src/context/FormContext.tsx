"use client";

import { createContext, useContext, useState } from "react";

type FormContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: any;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
};

const FormContext = createContext<FormContextType>({} as FormContextType);
export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState({});
  return (
    <FormContext.Provider
      value={{
        isOpen,
        setIsOpen,
        todo,
        setTodo,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
