import { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";

const UserExchangeableItems = ({ handleIdToPublish }) => {
  const [items, setItems] = useState([]);
  const [selectedItemID, setSelectedItemID] = useState(null);

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

  const handleItemSelection = (e, id) => {
    e.stopPropagation();
    setSelectedItemID(id);
    handleIdToPublish(id);
  };

  const handleItemDeselection = () => {
    setSelectedItemID(null);
  };

  return (
    <div
      className="row justify-content-start m-2"
      onClick={() => handleItemDeselection()}
    >
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <div
              key={item.id}
              className="col-6 mb-3 d-flex align-items-stretch"
            >
              <Item
                id={item.id}
                name={item.name}
                description={item.description}
                category={item.category}
                images={item.images}
                isSelectable={true}
                selectedId={selectedItemID}
                handleSelection={handleItemSelection}
              />
            </div>
          );
        })
      ) : (
        <p className="lead">You have no items to exchange.</p>
      )}
    </div>
  );
};

export default UserExchangeableItems;
