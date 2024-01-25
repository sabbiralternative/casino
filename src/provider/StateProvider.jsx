import { createContext, useEffect, useState } from "react";

export const StateContext = createContext(null);
const StateProvider = ({ children }) => {
  const [oddsData, setOddsData] = useState([]);
  const [token, setToken] = useState("");
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;

  /* path */
  useEffect(() => {
    const relativeURL = currentUrl.replace(baseUrl, "");
    const tokenSplit = relativeURL?.split("/");
    const token = tokenSplit.at(1);
    if (token && token?.length > 20) {
      localStorage.setItem("token", token);
      const newUrl = baseUrl + relativeURL.replace(`/${token}`, "");
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [baseUrl, currentUrl]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 

  if (!token) {
    return;
  }

  const stateInfo = {
    oddsData,
    setOddsData,
    token,
    setToken,
  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
