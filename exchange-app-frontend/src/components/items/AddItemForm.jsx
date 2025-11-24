import { useRef, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AddItemForm = ({ statusChangeFun }) => {
  const [status, setStatus] = useState("compilation");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState({});

  const filesInputRef = useRef(null);

  const categories = [
    "Arts & Crafts",
    "Clothing",
    "Electronics",
    "Household",
    "Media and Entertainment",
    "Sporting Goods and Equipment",
    "Personal Care Products",
  ];

  const isFormValid = () => {
    return (
      name.length > 0 &&
      description.length > 0 &&
      category.length > 0 &&
      images.length > 0
    );
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setImages({});

    if (filesInputRef.current) {
      filesInputRef.current.value = "";
    }
  };

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
      url: `${API_URL}/items/add`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setStatus("success");
          statusChangeFun();
          clearForm();
        }
      })
      .catch((err) => {
        setStatus("error");
        clearForm();
      });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <form
        className="d-flex flex-column w-75 mt-4 mb-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="d-flex flex-column mb-3">
          <div className="mb-3">
            <label htmlFor="name-input" className="form-label">
              Name
            </label>
            <input
              id="name-input"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description-input" className="form-label">
              Description
            </label>
            <input
              id="description-input"
              className="form-control"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category-select" className="form-label">
              Category
            </label>
            <select
              id="category-select"
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
          <div className="mb-3">
            <label htmlFor="images-input" className="form-label">
              Images
            </label>
            <input
              id="images-input"
              ref={filesInputRef}
              className="form-control"
              type="file"
              onChange={(e) => {
                setImages(e.target.files);
              }}
              placeholder="Item images"
              multiple
            />
          </div>
        </fieldset>
        <button
          className="btn btn-primary btn-lg"
          type="submit"
          disabled={!isFormValid()}
        >
          Add
        </button>
      </form>
      {status === "success" ? (
        <div className="alert alert-success mt-4" role="alert">
          Item added!
        </div>
      ) : status === "error" ? (
        <div className="alert alert-danger mt-4" role="alert">
          Error in adding item!
        </div>
      ) : null}
    </div>
  );
};

export default AddItemForm;
