"use client";

import { ToDoItem } from "@/lib/server/databaseService";
import { createContext, useContext, useEffect, useState } from "react";

type FormContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: ToDoItem | undefined;
  setTodo: (todo: ToDoItem) => void;
};

const FormContext = createContext<FormContextType>({} as FormContextType);
export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState<ToDoItem | undefined>();

  useEffect(() => {
    if (isOpen === false) {
      setTodo(undefined);
    }
  }, [isOpen]);
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
