import { useEffect, createContext, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotReadBadge, setShowNotReadBadge] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/notifications/all`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setNotifications(response.data);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
    setShowNotReadBadge(true);
  };

  const clearNotifications = () => {
    axios({
      method: "get",
      url: `${API_URL}/notifications/clear-history`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) setNotifications([]);
      })
      .catch((err) => console.log(err));
  };

  const handleRead = () => setShowNotReadBadge(false);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        showNotReadBadge,
        addNotification,
        clearNotifications,
        handleRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
