import React from "react";
import { useState, useEffect } from "react";
import SelectableItem from "./SelectableItem";
import axios from "axios";

const SelectableItems = ({ handleSelection }) => {
  const [items, setItems] = useState([]);

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
  }, []);

  return (
    <div className="row">
      {items.length === 0 ? <p className="lead">You have no more items to exchange</p> : (items.map((item) => (
        <div key={item.id} className="col-4">
          <SelectableItem
            id={item.id}
            name={item.name}
            description={item.description}
            category={item.category}
            images={item.images}
            handleSelection={handleSelection}
          />
        </div>
      )))}
    </div>
  );
};

export default SelectableItems;
