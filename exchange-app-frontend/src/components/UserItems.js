import { useEffect, useState } from "react";
import Item from "./Item";
import React from "react";
import { getUserItems } from "./itemsUtils";

const UserItems = ({updateToggle}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserItems().then(result => setItems(result));
  }, [updateToggle]);

  return (
    <div className="row justify-content-start m-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="col-3 justify-content-center">
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserItems;
