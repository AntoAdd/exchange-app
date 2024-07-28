import React from "react";
import Item from "../items/Item";

const CounterofferItems = ({ counterofferId, items }) => {
  return (
    <div id={"carouselExample" + counterofferId} className="carousel slide">
      <div className="carousel-inner">
        {items.map((item, index) => {
          if (index === 0) {
            return (
              <div key={item.id} className="carousel-item active">
                <Item
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  category={item.category}
                  images={item.images}
                />
              </div>
            );
          } else {
            return (
              <div key={item.id} className="carousel-item">
                <Item
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  category={item.category}
                  images={item.images}
                />
              </div>
            );
          }
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={"#carouselExample" + counterofferId}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={"#carouselExample" + counterofferId}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CounterofferItems;
