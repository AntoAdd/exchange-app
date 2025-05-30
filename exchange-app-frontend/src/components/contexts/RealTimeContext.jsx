import { useState, createContext, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const RealTimeContext = createContext();

export const RealTimeProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  console.log("real time provider renders");

  useEffect(() => {
    console.log("user effect called inside RealTimeProvider");

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to STOMP");

      client.subscribe(
        "/user/" + localStorage.getItem("user") + "/private",
        (message) => {
          console.log("Received message: ", message.body);
          const notification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            notification,
          ]);
        }
      );
      setStompClient(client);
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const sendNotification = (username, message) => {
    if (stompClient && stompClient.connected) {
      const payload = {
        username: username,
        message: message,
      };

      stompClient.publish({
        destination: "/exchange-app/private-notification",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      console.warn(
        "STOMP client not connected or target username/message missing."
      );
    }
  };

  const initializeNotifications = (initialNotifications) => {
    setNotifications(initialNotifications);
    console.log("Initial notifications: ", notifications);
  };

  return (
    <RealTimeContext.Provider
      value={{ notifications, initializeNotifications, sendNotification }}
    >
      {children}
    </RealTimeContext.Provider>
  );
};
