import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Offer from "../offers/Offer";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/offers/all-offers",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => setOffers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row m-4">
        {offers.length === 0 ? (
            <div className="col d-flex justify-content-center">
                <h3>No offers published yet!</h3>
            </div>
        ) : (
          offers.map((offer) => {
            return (
              <div className="col-3 m-4">
                <Offer
                  id={offer.id}
                  item={offer.offerItem}
                  publisher={offer.publisherUsername}
                  publicationDate={offer.publicationDate}
                  counteroffers={offer.counteroffers}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OffersPage;
