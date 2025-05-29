import { useState } from "react";
import Modal from "../Modal";
import AddItemForm from "../items/AddItemForm";
import UserItems from "../items/UserItems";

const ItemsPage = () => {
  const [updateToggle, setUpdateToggle] = useState(false);

  const updateToggleFun = () => {
    setUpdateToggle(!updateToggle);
  };

  return (
    <div className="container-fluid">
      <UserItems updateToggle={updateToggle} />
      <div className="row m-4 d-flex justify-content-center">
        <div
          className="d-flex justify-content-center"
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#simpleModal"
            className="btn btn-primary btn-lg"
          >
            Add Item
          </button>
        </div>
      </div>
      <Modal title="Add Item" hasAction={false}>
        <AddItemForm statusChangeFun={updateToggleFun} />
      </Modal>
    </div>
  );
};

export default ItemsPage;
