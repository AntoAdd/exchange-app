import { useEffect, useState } from "react";
import React from "react";
import Item from "./Item";

const UserExchangeableItems = () => {
    const [exchangeableItems, setExchangeableItems] = useState([]);

    useEffect(() => {
        axios({
          method: "get",
          url: "http://localhost:8080/items/user-exchangeable",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            setExchangeableItems(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }, []);

      return (
        <div className="row m-4 align-items-center">
          {exchangeableItems.map((item) => {
            return (
              <div key={item.id} className="col">
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

}

export default UserExchangeableItems;