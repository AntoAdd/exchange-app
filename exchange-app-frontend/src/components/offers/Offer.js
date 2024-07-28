import React from "react";
import Item from "../items/Item";
import Counteroffers from "./Counteroffers";

const Offer = ({
  id,
  item,
  publisher,
  publicationDate,
  counteroffers = null,
}) => {
  return (
    <div className="card text-center">
      <div className="card-header">
        <h3>
          Offer #{id} 
        </h3>
        <small className="text-body-secondary">
            Published by {publisher}
        </small>
      </div>
      <div className="card-body d-flex flex-column justify-content-center p-0">
        <Item
          id={item.id}
          name={item.name}
          description={item.description}
          category={item.category}
          images={item.images}
        />
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Counteroffers
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {(counteroffers === null || counteroffers.length === 0) ? (
                  <p>No counteroffer for this offer yet.</p>
                ) : (
                  <Counteroffers offerId={id} counteroffers={counteroffers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-body-secondary">
        Publication date: {publicationDate}
      </div>
    </div>
  );
};

export default Offer;
