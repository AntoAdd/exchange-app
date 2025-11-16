import Item from "../items/Item";
import CounteroffersListModal from "../Counteroffers/CounteroffersListModal";
import CounterofferCreationModal from "../Counteroffers/CounterofferCreationModal";
//import { useState } from "react";

const Offer = ({
  id,
  item,
  publisher,
  publicationDate,
  counteroffers = [],
  exchangeableItems,
  handleDelete = () => {
    return undefined;
  },
}) => {
  return (
    <div className="card text-center">
      <div className="card-header">
        <h1 className="display-6">Offer #{id}</h1>
        <small className="text-body-secondary">Published by {publisher}</small>
      </div>

      <div className="card-body">
        <Item
          id={item.id}
          name={item.name}
          description={item.description}
          category={item.category}
          images={item.images}
          isExchangeable={false}
        />
        <h5 className="m-3">Counteroffers</h5>
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
            disabled={publisher === localStorage.getItem("user")}
          >
            Make
          </button>
        </div>
        <CounteroffersListModal
          offerId={id}
          offerPublisher={publisher}
          counteroffers={counteroffers}
        />
        <CounterofferCreationModal
          offerId={id}
          exchangeableItems={exchangeableItems}
        />
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center text-body-secondary">
        <span>
          <i className="bi bi-calendar-date me-1"></i> {publicationDate}
        </span>
        {publisher === localStorage.getItem("user") && (
          <button onClick={() => handleDelete(id)} className="btn btn-danger">
            Delete
            <i className="bi bi-trash3 ms-2"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Offer;
