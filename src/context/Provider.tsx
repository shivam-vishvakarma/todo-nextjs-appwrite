"use client";

import { AlertProvider } from "./AlertContext";
import { AuthProvider } from "./AuthContext";
import { FormProvider } from "./FormContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <AuthProvider>
        <FormProvider>{children}</FormProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
