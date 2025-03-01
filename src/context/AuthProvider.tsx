import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  getUser?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        "https://anout-api.up.railway.app/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
    } catch (err) {
      return {
        error: true,
        msg: (err as any).data ? (err as any).response.data.message : err,
      };
    }
  };

  const me = async () => {
    try {
      const result = await axios.get(
        "https://anout-api.up.railway.app/api/auth/me",
        {
          withCredentials: true,
        }
      );

      return result.data.user;
    } catch (err) {
      return { error: true, msg: (err as any).data.message };
    }
  };

  const logout = async () => {
    setAuthState({
      token: null,
      authenticated: false,
    });

    axios.defaults.headers.common["Authorization"] = "";
  };

  const value = {
    authState,
    onLogin: login,
    onLogout: logout,
    getUser: me,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
