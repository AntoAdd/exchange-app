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
}) => {
  let className = "card";

  if (isSelectable) {
    className =
      selectedId === id ? "card border border-4 rounded" : "card";
  }

  return (
    <div
      className={className}
      onClick={(e) => handleSelection(e, id)}
    >
      <ItemImages itemId={id} images={images} name={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="overflow-auto mb-4 mt-4">
          <p className="card-text" style={{ height: "60px" }}>
            {description}
          </p>
        </div>
        <h6 className="card-subtitle mb-2 text-body-secondary">{category}</h6>
      </div>
    </div>
  );
};

export default Item;
