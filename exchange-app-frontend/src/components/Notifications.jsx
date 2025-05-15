import { useState, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      "http://localhost:8080/notifications/subscribe/" +
        localStorage.getItem("user"),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    eventSource.onmessage = (event) => {
      const newNotification = event.data;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
          console.log(response.data); // TODO - remove this line after testing.
          setNotifications(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-bell-fill"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <h6 className="dropdown-header">All Notifications</h6>
        </li>
        {notifications.length === 0 ? (
          <li>
            <span className="dropdown-item-text">You have no notification yet.</span>
          </li>
        ) : (
          notifications.map((notification, index) => {
            if (index < notifications.length - 1) {
              return (
                <>
                  <li key={notification.id} className="dropdown-item">
                    <span className="dropdown-item-text">
                      {notification.message}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </>
              );
            } else {
              return (
                <li key={notification.id} className="dropdown-item">
                  <span className="dropdown-item-text">
                    {notification.message}
                  </span>
                </li>
              );
            }
          })
        )}
      </ul>
    </div>
  );
};

export default Notifications;
