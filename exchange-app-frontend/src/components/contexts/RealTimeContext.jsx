import { useState, createContext, useEffect, useContext } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { NotificationsContext } from "./NotificationsContext";
import { OffersContext } from "./OffersContext";
import { TradesContext } from "./TradesContext";

export const RealTimeContext = createContext();

export const RealTimeProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const { addNotification } = useContext(NotificationsContext);
  const { handleAddNewOffer, handleOfferRemove, handleModifyOffer } =
    useContext(OffersContext);
  const { handleNewTrade } = useContext(TradesContext);

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
        (message) => addNotification(JSON.parse(message.body))
      );

      client.subscribe(
        "/user/" + localStorage.getItem("user") + "/trades",
        (message) => handleNewTrade(JSON.parse(message.body))
      );

      client.subscribe("/topic/offers", (message) => {
        const messageType = message.headers["messageType"];

        switch (messageType) {
          case "OFFER_PUBLISHED":
            const offer = JSON.parse(message.body);
            handleAddNewOffer(offer);
            break;
          case "OFFER_DELETED":
            const offerId = JSON.parse(message.body);
            handleOfferRemove(offerId);
            break;
          case "OFFER_MODIFIED":
            const modifiedOffer = JSON.parse(message.body);
            handleModifyOffer(modifiedOffer);
            break;
          default:
            throw new Error(`"${messageType}" is not a valid message type`);
        }
      });

      setStompClient(client);
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNotification = (username, message) => {
    console.log("enter send Notification");
    if (stompClient && stompClient.connected) {
      console.log("stomp client connected!!");
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

  return (
    <RealTimeContext.Provider value={{ sendNotification }}>
      {children}
    </RealTimeContext.Provider>
  );
};
