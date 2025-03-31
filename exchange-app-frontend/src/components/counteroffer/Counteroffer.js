import React from "react";
import CounterofferItems from "./CounterofferItems";

const Counteroffer = ({id, items, publisher, publicationDate}) => {
    return (
        <div className="card col-4">
          <div className="card-header">
            <h3>
              Counteroffer #{id}
              <small className="text-body-secondary">
                Published by {publisher}
              </small>
            </h3>
          </div>
          <div className="card-body d-flex p-0">
            <CounterofferItems counterofferId={id} items={items} />
          </div>
          <div className="card-footer text-body-secondary">
            Publication date: {publicationDate}
          </div>
        </div>
      );
}

export default Counteroffer;