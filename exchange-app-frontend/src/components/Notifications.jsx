import { useContext } from "react";
import { NotificationsContext } from "./contexts/NotificationsContext";

const Notifications = () => {
  const { notifications, showNotReadBadge, clearNotifications, handleRead } =
    useContext(NotificationsContext);

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        onClick={() => handleRead()}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-bell-fill fs-5 position-relative">
          {showNotReadBadge && (
            <span
              className="position-absolute bg-danger border border-light rounded-circle"
              style={{
                width: "12px", 
                height: "12px",
                top: "-2px", 
                left: "12px", 
              }}
            >
              <span className="visually-hidden">New alerts</span>
            </span>
          )}
        </i>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end position-absolute overflow-auto"
        style={{
          width: "min(300px, 60vw)",
          maxHeight: "400px",
          right: "0",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <span className="ps-3 fs-6 fw-medium">Notifications</span>
          <button
            type="button"
            disabled={notifications.length === 0}
            className="btn btn-link text-decoration-none fs-6 fw-medium"
            onClick={() => clearNotifications()}
          >
            clear
          </button>
        </div>
        <hr className="mx-2 my-1" />
        {notifications.length === 0 ? (
          <li className="px-3 py-2 text-muted">
            You have no notification yet.
          </li>
        ) : (
          notifications.map((notification) => (
            <li
              key={notification.id}
              className="px-3 py-2 d-flex align-items-start gap-3"
            >
              <i
                className="bi bi-circle-fill text-primary"
                style={{ fontSize: "12px" }}
              ></i>
              <span className="flex-grow-1">{notification.message}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
