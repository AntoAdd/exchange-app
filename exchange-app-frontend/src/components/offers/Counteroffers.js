import React from "react";
import Counteroffer from "../counteroffer/Counteroffer";

const Counteroffers = ({ counteroffers }) => {
  return (
    <div className="row justify-content-start">
      {counteroffers.map((counteroffer) => {
        return (
          <Counteroffer
            key={counteroffer.id}
            id={counteroffer.id}
            items={counteroffer.items}
            publisher={counteroffer.publisherUsername}
            publicationDate={counteroffer.publicationDate}
          />
        );
      })}
    </div>
  );
};

export default Counteroffers;
