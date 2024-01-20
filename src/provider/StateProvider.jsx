import { createContext, useEffect, useState } from "react";

export const StateContext = createContext(null);
const StateProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  /* path */
  useEffect(() => {
    const relativeURL = currentUrl.replace(baseUrl, "");
    const tokenSplit = relativeURL?.split("/");
    const token = tokenSplit.at(-1);
    setToken(token);
  }, [baseUrl, currentUrl]);
  const stateInfo = {
    setToken,
    token,
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
