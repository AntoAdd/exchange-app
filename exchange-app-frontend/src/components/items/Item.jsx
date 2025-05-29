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
  }
}) => {
  let className = "card position-relative border border-dark border-opacity-25 border-2 rounded";
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
        ? "card position-relative border border-primary border-opacity-75 border-2 rounded"
        : "card position-relative border border-dark border-opacity-25 border-2 rounded";
    showBadge = selectedId === id ? true : false;
  }

  return (
    <div className={className} onClick={(e) => handleSelection(e, id)}>
      {showBadge && selectedBedge}
      <ItemImages itemId={id} images={images} name={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <div className="overflow-auto mb-4 mt-4">
          <p className="card-text">{description}</p>
        </div>
        <h6 className="card-subtitle mt-auto text-body-secondary">
          {category}
        </h6>
      </div>
      <div className="d-grid gap-2 m-2">
        {isExchangeable && (
          <button
            onClick={() => handleDeletion(id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
            <i className="bi bi-trash3 ms-2"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
