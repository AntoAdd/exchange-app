import React from "react";
import CounterofferItems from "./CounterofferItems";

const Counteroffer = ({id, items, publisher, publicationDate}) => {
    return (
        <div className="card text-center">
          <div className="card-header">
            <h3>
              Counteroffer #{id}
              <small className="text-body-secondary">
                Published by {publisher}
              </small>
            </h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">Counteroffer items</h5>
            <CounterofferItems counterofferId={id} items={items} />
          </div>
          <div className="card-footer text-body-secondary">
            Publication date: {publicationDate}
          </div>
        </div>
      );
}

export default Counteroffer;