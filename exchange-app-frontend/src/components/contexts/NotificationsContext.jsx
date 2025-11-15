import { useEffect, createContext, useState } from "react";
import axios from "axios";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({children}) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/notifications/all",
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
    setNotifications(prevNotifications => [...prevNotifications, notification])
  }

  return (
    <NotificationsContext.Provider value={{notifications, addNotification}}>
        {children}
    </NotificationsContext.Provider>
  )
}