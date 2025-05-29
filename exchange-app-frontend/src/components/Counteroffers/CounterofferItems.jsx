import React from "react";
import Item from "../items/Item";

const CounterofferItems = ({ items }) => {
  return (
    <div className="accordion d-flex flex-column flex-fill" id="counteroffer-items">
      {items.map((item, index) => {
        return (
          <div key={item.id} className="accordion-item rounded-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#item" + item.id}
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Item #{index + 1}
              </button>
            </h2>
            <div
              id={"item" + item.id}
              className="accordion-collapse collapse"
              data-bs-parent="#counteroffer-items"
            >
              <div className="accordion-body">
                <Item
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  category={item.category}
                  images={item.images}
                  isExchangeable={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CounterofferItems;
