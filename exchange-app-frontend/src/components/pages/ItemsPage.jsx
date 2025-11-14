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
      <div className="d-flex flex-row justify-content-between align-items-end mt-4 me-4 ms-4 mb-2">
        <h1>My Items</h1>
        <div>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#simpleModal"
            className="btn btn-primary btn-sm"
          >
            <i className="bi bi-plus-lg me-1"></i>
            Add new item
          </button>
        </div>
      </div>
      
      <hr className="mx-4 mb-4" />

      <UserItems updateToggle={updateToggle} />

      <Modal title="Add Item" hasAction={false}>
        <AddItemForm statusChangeFun={updateToggleFun} />
      </Modal>
    </div>
  );
};

export default ItemsPage;
