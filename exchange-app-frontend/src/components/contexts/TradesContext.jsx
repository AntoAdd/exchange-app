import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export const TradesContext = createContext();

export const TradesProvider = ({ children }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/trades/user-trades`,
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
      url: `${API_URL}/trades/clear-history`,
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
