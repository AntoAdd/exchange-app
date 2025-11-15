import { useContext } from "react";
import { NotificationsContext } from "./contexts/NotificationsContext";

const Notifications = () => {
  const { notifications } = useContext(NotificationsContext);

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
                <div key={notification.id}>
                  <li className="dropdown-item">
                    <span className="dropdown-item-text">
                      {notification.message}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </div>
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
