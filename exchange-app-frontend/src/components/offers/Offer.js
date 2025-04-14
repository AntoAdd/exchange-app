import React from "react";
import Item from "../items/Item";
import Counteroffers from "./Counteroffers";
import SelectableItems from "../items/SelectableItems";
import axios from "axios";
import { useState, useEffect } from "react";
import qs from "qs";

const CounteroffersListModal = ({ offerId, counteroffers }) => {
  return (
    <div
      className="modal fade"
      id="counteroffersModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Counteroffers
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {counteroffers.length === 0 ? (
              <p className="lead">No counteroffers made yet.</p>
            ) : (
              <Counteroffers offerId={offerId} counteroffers={counteroffers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterofferCreationModal = ({offerId, onCreation}) => {
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const successAlert = <div className="alert alert-success" role="alert">Counteroffer successfully created!</div>
  const errorAlert = <div className="alert alert-danger" role="alert">Error creating conteroffer</div>

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  const handleSelection = (e, id) => {
    e.stopPropagation();

    const newSelectedIDs = e.target.checked
      ? [...selectedIDs, id]
      : selectedIDs.filter((selectedId) => selectedId !== id);

    setSelectedIDs(newSelectedIDs);
  };

  const handleCounterPublish = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/counteroffers/publish",
      params: {
        id: offerId,
        item_IDs: selectedIDs,
      },
      paramsSerializer: (item_IDs) => {
        return qs.stringify(item_IDs, {arrayFormat: 'repeat'});
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setShowAlert(true);
          setAlertType("success");
          onCreation();
        } else {
          setShowAlert(true);
          setAlertType("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Select items for your counteroffer
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SelectableItems handleSelection={handleSelection} />
            {showAlert && (alertType === "success" ? successAlert : errorAlert)}
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCounterPublish}
              disabled={selectedIDs.length === 0}
            >
              Make Counteroffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Offer = ({
  id,
  item,
  publisher,
  publicationDate,
  counteroffers = null,
  canMakeCounteroffers = true,
  deletable = false,
  onUpdate = () => {
    return undefined;
  },
  handleDelete = () => {
    return undefined;
  },
}) => {
  return (
    <div className="card text-center">
      <div className="card-header">
        <h3>Offer #{id}</h3>
        <small className="text-body-secondary">Published by {publisher}</small>
      </div>
      <Item
        id={item.id}
        name={item.name}
        description={item.description}
        category={item.category}
        images={item.images}
        isExchangeable={false}
      />
      <div className="card-body">
        <h5>Counteroffers</h5>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target="#counteroffersModal"
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createModal"
            disabled={!canMakeCounteroffers}
          >
            Make
          </button>
        </div>
        <CounteroffersListModal offerId={id} counteroffers={counteroffers} />
        <CounterofferCreationModal offerId={id} onCreation={onUpdate} />
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center text-body-secondary">
        <span>Publication date: {publicationDate}</span>
        {deletable && (
          <button
            onClick={() => handleDelete(id)}
            className="btn btn-sm btn-danger"
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Offer;
