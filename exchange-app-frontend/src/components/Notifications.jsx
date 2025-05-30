import { useEffect, useContext } from "react";
import axios from "axios";
import { RealTimeContext } from "./contexts/RealTimeContext";

const Notifications = () => {
  const {notifications, initializeNotifications} = useContext(RealTimeContext);

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
          console.log("initial notifications fetched: ", response.data);
          initializeNotifications(response.data);
        }
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
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
            <span className="dropdown-item-text">
              You have no notification yet.
            </span>
          </li>
        ) : (
          notifications.map((notification, index) => {
            console.log(notifications);
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
