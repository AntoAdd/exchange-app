import { useEffect, useState } from "react";
import Item from "./items/Item";
import React from "react";
import axios from "axios";

const UserItems = ({ updateToggle }) => {
  const [items, setItems] = useState([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertTimeoutId, setSuccessAlertTimeoutId] = useState(null);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertTimeoutId, setErrorAlertTimeoutId] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/items/user-items",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));
  }, [updateToggle]);

  // Cleanup function for the timers
  useEffect(() => {
    return () => {
      if (successAlertTimeoutId) {
        clearTimeout(successAlertTimeoutId);
      }
      if (errorAlertTimeoutId) {
        clearTimeout(errorAlertTimeoutId);
      }
    };
  }, [successAlertTimeoutId, errorAlertTimeoutId]);

  const handleItemDeletion = (id) => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);

    axios({
      method: "delete",
      url: "http://localhost:8080/items/delete",
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setItems((prevItems) => prevItems.filter((item) => item.id !== id));

          setShowSuccessAlert(true);
          if (successAlertTimeoutId) {
            clearTimeout(successAlertTimeoutId);
          } // Clear previous success timeout
          const newSuccessTimeout = setTimeout(() => {
            setShowSuccessAlert(false);
            setSuccessAlertTimeoutId(null);
          }, 3000); // 3 seconds for success
          setSuccessAlertTimeoutId(newSuccessTimeout);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowErrorAlert(true);

        // 3. Clear previous error timeout and set a new one
        if (errorAlertTimeoutId) clearTimeout(errorAlertTimeoutId);
        const newErrorTimeout = setTimeout(() => {
          setShowErrorAlert(false);
          setErrorAlertTimeoutId(null);
        }, 5000); // 5 seconds for error (maybe longer than success)
        setErrorAlertTimeoutId(newErrorTimeout);
      });
  };

  return (
    <div className="row justify-content-start m-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="col-3 m-4">
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
              handleDeletion={() => handleItemDeletion(item.id)}
            />
          </div>
        );
      })}
      {showSuccessAlert && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 p-3 m-3"
          role="alert"
          style={{
            zIndex: 1050,
            width: '50%', 
            textAlign: 'center',
          }}
        >
          Item deleted successfully!
        </div>
      )}
      {showErrorAlert && (
        <div
          className="alert alert-danger position-fixed bottom-0 end-0 p-3 m-3" // Use alert-danger for errors
          role="alert"
          style={{
            zIndex: 1050,
            width: '50%', 
            textAlign: 'center',
          }}
        >
          Cannot delete items currently in a trade.
        </div>
      )}
    </div>
  );
};

export default UserItems;
