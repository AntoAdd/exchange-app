import ItemImages from "./ItemImages";
import React from "react";

const Item = ({
  id,
  name,
  description,
  category,
  images,
  isSelectable = false,
  selectedId = null,
  handleSelection = () => {
    return undefined;
  },
  handleDeletion
}) => {
  let className = "card";

  if (isSelectable) {
    className = selectedId === id ? "card border border-4 rounded" : "card";
  }

  return (
    <div className={className} onClick={(e) => handleSelection(e, id)}>
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
        <button onClick={() => handleDeletion(id)} type="button" className="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
