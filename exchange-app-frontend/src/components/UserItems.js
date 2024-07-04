import { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";
import React from "react";

const UserItems = ({ statusChange, setOfferItem, unsetOfferItem }) => {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelection = (id) => {
    setSelectedId(id);
    setOfferItem(id);
  };

  const handleDeselection = (e) => {
    if(e.target.name === undefined) {
        setSelectedId(null);
        unsetOfferItem();
    }
        
  }

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
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [statusChange]);

  return (
    <div className="row m-4 align-items-center" onClick={(e) => handleDeselection(e)}>
      {items.map((item) => {
        return (
          <div key={item.id} className="col">
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
              handleSelect={handleSelection}
              selectedId={selectedId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserItems;
