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
    <div className="row justify-content-start m-2" onClick={() => handleDeselection()}>
      {items.length > 0 ? (items.map((item) => {
        return (
          <div key={item.id} className="col-6 mb-3 d-flex align-items-stretch">
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
      })) : <p className="lead">You have no items to exchange.</p>}
    </div>
  );
};

export default UserExchangeableItems;
