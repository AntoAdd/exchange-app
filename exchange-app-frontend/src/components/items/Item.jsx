import ItemImages from "./ItemImages";
import React from "react";

const Item = ({
  id,
  name,
  description,
  category,
  images,
  isSelectable = false,
  isExchangeable = true,
  selectedId = null,
  handleSelection = () => {
    return undefined;
  },
  handleDeletion = () => {
    return undefined;
  },
}) => {
  let className =
    "card position-relative border border-light-subtle rounded shadow";
  const selectedBedge = (
    <span
      className="z-1 position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle d-flex justify-content-center align-items-center"
      style={{ width: "1.5em", height: "1.5em", fontSize: "1em" }}
    >
      <i className="bi bi-check-lg text-white"></i>
    </span>
  );
  let showBadge = false;

  if (isSelectable) {
    className =
      selectedId === id
        ? "card position-relative border border-primary-subtle rounded shadow"
        : "card position-relative border border-light-subtle rounded shadow";
    showBadge = selectedId === id ? true : false;
  }

  return (
    <div className={className} onClick={(e) => handleSelection(e, id)}>
      {showBadge && selectedBedge}
      <ItemImages itemId={id} images={images} name={name} />
      <div className="card-body d-flex flex-column border-top">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-4 text-body-secondary">{category}</h6>
        <div className="overflow-auto">
          <p className="card-text">{description}</p>
        </div>
      </div>
      <div className="d-flex flex-row p-3">
        {isExchangeable && (
          <button
            onClick={() => handleDeletion(id)}
            type="button"
            className="btn btn-danger rounded-pill"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
