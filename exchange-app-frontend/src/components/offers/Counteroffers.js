import React from "react";
import Counteroffer from "../counteroffer/Counteroffer";

const Counteroffers = ({ offerId, counteroffers }) => {
  return (
    <div id={"carouselExample" + offerId} className="carousel slide">
      <div className="carousel-inner">
        {counteroffers.map((counteroffer, index) => {
          if (index === 0) {
            return (
              <div key={counteroffer.id} className="carousel-item active">
                <Counteroffer
                  id={counteroffer.id}
                  items={counteroffer.items}
                  publisher={counteroffer.publisher}
                  publicationDate={counteroffer.publicationDate}
                />
              </div>
            );
          } else {
            return (
              <div key={counteroffer.id} className="carousel-item">
                <Counteroffer
                  id={counteroffer.id}
                  items={counteroffer.items}
                  publisher={counteroffer.publisher}
                  publicationDate={counteroffer.publicationDate}
                />
              </div>
            );
          }
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={"#carouselExample" + offerId}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={"#carouselExample" + offerId}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Counteroffers;
