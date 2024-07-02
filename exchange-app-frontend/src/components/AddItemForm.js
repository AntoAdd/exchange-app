import { useState } from "react";
import axios from "axios";
import React from "react";

const AddItemForm = ({ statusChangeFun }) => {
  const [success, setSuccess] = useState(false);
  const [failiure, setFailure] = useState(false);

  const categories = [
    "Arts & Crafts",
    "Clothing",
    "Electronics",
    "Household",
    "Media and Entertainment",
    "Sporting Goods and Equipment",
    "Personal Care Products",
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++)
      formData.append("images", images.item(i));

    axios({
      method: "post",
      url: "http://localhost:8080/items/add",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          statusChangeFun();
        };
      })
      .catch((err) => setFailure(true));
  };

  return (
    <div className="container text-center mt-4 p-4">
      <form className="mt-4 mb-4" onSubmit={handleSubmit}>
        <fieldset>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label me-2">Name</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item name"
              ></input>
            </div>
          </div>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label me-2">Description</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Item description"
              ></input>
            </div>
          </div>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label me-2">Category</label>
            <div className="col-sm-6">
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select a category..."
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label me-2">Images</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="file"
                value={images.name}
                onChange={(e) => setImages(e.target.files)}
                placeholder="Item images"
                multiple
              ></input>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            Add
          </button>
          {success ? (
            <div class="alert alert-success mt-4" role="alert">
              Item added!
            </div>
          ) : failiure ? (
            <div class="alert alert-danger mt-4" role="alert">
              Error in adding item!
            </div>
          ) : null}
        </fieldset>
      </form>
    </div>
  );
};

export default AddItemForm;
