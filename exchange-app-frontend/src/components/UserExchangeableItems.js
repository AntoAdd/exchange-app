import { useEffect, useState } from "react";
import React from "react";
import Item from "./items/Item";
import axios from "axios";


const UserExchangeableItems = ({ updateToggle, handlePublication }) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/items/user-exchangeable",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));
  }, [updateToggle]);

  const handleSelection = (e, id) => {
    e.stopPropagation();
    setSelected(id);
    handlePublication(id);
  };

  const handleDeselection = () => {
    setSelected(null);
  }

  return (
    <div className="row justify-content-start m-4" onClick={() => handleDeselection()}>
      {items.map((item) => {
        return (
          <div key={item.id} className="col-4 m-4">
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
              isSelectable={true}
              selectedId={selected}
              handleSelection={handleSelection}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserExchangeableItems;
