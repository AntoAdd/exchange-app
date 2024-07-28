import { useEffect, useState } from "react";
import Item from "./items/Item";
import React from "react";
import axios from "axios";

const UserItems = ({ updateToggle }) => {
  const [items, setItems] = useState([]);

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
      })
      .catch((err) => console.log(err));
  }, [updateToggle]);

  return (
    <div className="row justify-content-start m-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="col-3 m-4">
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
