import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Offer from "../offers/Offer";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [offersUpdate, setOffersUpdate] = useState(false);

  useEffect(() => {
    if (offersUpdate || offers.length === 0) {
      axios({
        method: "get",
        url: "http://localhost:8080/offers/all-offers",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          setOffers(response.data);
          setOffersUpdate(false);
        })
        .catch((err) => console.log(err));
    }
  }, [offersUpdate, offers.length]);

  const handleOfferUpdate = () => {
    setOffersUpdate(true);
  };

  return (
    <div className="container-fluid">
      <div className="row m-4">
        {offers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">No offers published yet!</p>
          </div>
        ) : (
          offers.map((offer) => {
            return (
              <div className="col-3 m-4" key={offer.id}>
                <Offer
                  id={offer.id}
                  item={offer.offerItem}
                  publisher={offer.publisherUsername}
                  publicationDate={offer.publicationDate}
                  counteroffers={offer.counteroffers}
                  onUpdate={handleOfferUpdate}
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
