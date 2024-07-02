import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import React from "react";
import Modal from "./Modal";
import AddItemForm from "./AddItemForm";

const Items = () => {
  const [items, setItems] = useState([]);
  const [statusChange, setStatusChange] = useState(false)

  const statusChangeFun = () => {
    setStatusChange(!statusChange);
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
    <div className="container-fluid">
      <div className="row m-4 align-items-center">
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
            />
          );
        })}
        <div
          className="d-flex align-items-center justify-content-center m-4"
          style={{ width: "6rem", height: "6rem" }}
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#simpleModal"
            className="btn btn-primary"
            style={{
              width: "80px",
              height: "80px",
            }}
          >
            Add Item
          </button>
        </div>
      </div>
      <Modal title="Add Item"><AddItemForm statusChangeFun={statusChangeFun}/></Modal>
    </div>
  );
};

export default Items;