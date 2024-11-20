"use client";
import authService from "@/lib/server/authService";
import { Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";

type AuthContextType = {
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  signup: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => void;
  user: Models.User<Models.Preferences> | null;
  session: Models.Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { callAlert } = useAlert();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Models.Session>({} as Models.Session);
  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await authService.signup(name, email, password);
      await login({ email, password });
    } catch (error) {
      callAlert(`Error: ${error}`, "error");
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setSession(await authService.login(email, password));
      setUser(await authService.getUser());
    } catch (error) {
      callAlert(`Error: ${error}`, "error");
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    authService
      .getUser()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() =>{
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, user, session, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
