import React from "react";
import ItemImages from "./ItemImages";

const SelectableItem = ({
  id,
  name,
  description,
  category,
  images,
  handleSelection,
}) => {
  return (
    <div className="card">
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
      <div className="card-footer">
        <input
          className="form-check-input"
          onChange={(e) => handleSelection(e, id)}
          type="checkbox"
          defaultValue="false"
          id="selectItem"
        />
      </div>
    </div>
  );
};

export default SelectableItem;
