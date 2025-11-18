import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TradesContext = createContext();

export const TradesProvider = ({ children }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/trades/user-trades",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) setTrades(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewTrade = (newTrade) => {
    setTrades((prevTrades) => [...prevTrades, newTrade]);
  };

  const handleTradesClear = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/trades/clear-history",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) setTrades([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TradesContext.Provider
      value={{ trades, handleNewTrade, handleTradesClear }}
    >
      {children}
    </TradesContext.Provider>
  );
};
