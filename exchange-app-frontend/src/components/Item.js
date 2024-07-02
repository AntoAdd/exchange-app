import ItemImages from "./ItemImages";
import React from "react";

const Item = ({ id, name, description, category, images }) => {
  return (
    <div className="card m-2" style={{width: "18rem"}}>
      <ItemImages itemId={id} images={images} name={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="overflow-auto mb-4 mt-4">
          <p className="card-text" style={{height: '60px'}}>{description}</p>
        </div>
        <h6 className="card-subtitle mb-2 text-body-secondary">{category}</h6>
      </div>
    </div>
  );
};

export default Item;
