// contexts/AuthContext.tsx
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber:string;
  role: "business" | "faculty";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setErrorMessage(null); // clear old errors

    try {
      const loginRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (loginRes.status === 200) {
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user`,
          { withCredentials: true }
        );

        if (userRes.data) {
          setUser(userRes.data.data);
          localStorage.setItem("user", JSON.stringify(userRes.data));
        }

        setIsAuthenticated(true);
        return true;
      }
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Login failed";
      setErrorMessage(errMsg);
      console.error("Login error:", errMsg);
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
