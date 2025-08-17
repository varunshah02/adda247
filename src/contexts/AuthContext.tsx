import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "business" | "teacher";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = [
      {
        id: "1",
        name: "John Admin",
        email: "admin@education.com",
        role: "business" as const,
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150",
      },
      {
        id: "2",
        name: "Sarah Teacher",
        email: "teacher@education.com",
        role: "teacher" as const,
        avatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=150",
      },
    ];

    // const foundUser = mockUsers.find((u) => u.email === email);
    // if (foundUser && password === "password") {
    //   setUser(foundUser);
    //   setIsAuthenticated(true);
    //   localStorage.setItem("user", JSON.stringify(foundUser));
    //   return true;
    // }

    const response = await apiService.login({ email, password });

    if (response && response.token) {
      localStorage.setItem("token", response.token);
      setUser(mockUsers[0]);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
