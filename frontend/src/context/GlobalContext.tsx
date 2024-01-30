import React, { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN } from "../constants/common";
import axiosInstance from "../utils/AxiosInstance";
import AppLoader from "../component/AppLoader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TUser } from "../@types/user";
import { TGlobalContextStates } from "../@types/context";

const initialState: TGlobalContextStates = {
  token: "",
  setToken: () => {},
  logout: () => {},
  user: null,
};

export const GlobalContext = createContext(initialState);

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [user, setUser] = useState<TUser | null>(null);
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN, "");

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      setUser(response.data);
    } catch (error) {
      //console.log(error.message);
    }
    setIsAppReady(true);
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setIsAppReady(true);
    }
  }, [token]);

  const logout = () => {
    setToken("");
    window.location.href = "/sign-in";
  };

  if (!isAppReady) return <AppLoader />;

  return (
    <GlobalContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
