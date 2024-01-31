/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useEffect, useState } from "react";



export const StateContext = createContext(null);
const StateProvider = ({ children }) => {
  const [oddsData, setOddsData] = useState([]);
  const [token, setToken] = useState("");
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;



  /* path */
  useEffect(() => {
    const relativeURL = currentUrl.replace(baseUrl, "");
    const tokenSplit = relativeURL?.split("/");
    let token = "";
    let eventId = tokenSplit.length > 0 ? tokenSplit[0] : "";
    tokenSplit.forEach((item) => {
      if (item.length > token.length) {
        token = item;
      }
      if (item.length < eventId.length || eventId === "") {
        item?.length < 10 ? (eventId = item) : (eventId = "");
      }
    });

    if (token && token?.length > 20) {
      localStorage.setItem("token", token);
      const newUrl = baseUrl + (eventId?.length > 0 ? `/${eventId}` : "/");

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
    showTapToPlay, setShowTapToPlay

  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
