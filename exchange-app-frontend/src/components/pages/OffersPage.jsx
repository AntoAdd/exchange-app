import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../offers/Offers";
import UserOffers from "../offers/UserOffers";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [showAll, setShowAll] = useState(true);

  

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/offers/all-offers",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setOffers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddNewOffer = (newOffer) => {
    setOffers((prevOffers) => [...prevOffers, newOffer]);
  };

  const handleOfferRemove = (offerID) => {
    setOffers((prevOffers) =>
      prevOffers.filter((offer) => offer.id !== offerID)
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center m-4">
        <h1 className="display-2">Active Offers</h1>
        <div
          className="btn-group m-4"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="all-offers"
            autoComplete="off"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
          <label className="btn btn-outline-primary" htmlFor="all-offers">
            All Offers
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="my-offers"
            autoComplete="off"
            checked={!showAll}
            onChange={() => setShowAll(!showAll)}
          />
          <label className="btn btn-outline-primary" htmlFor="my-offers">
            My Offers
          </label>
        </div>
        {showAll ? (
          <Offers offers={offers} />
        ) : (
          <UserOffers
            offers={offers.filter(
              (offer) => offer.publisher === localStorage.getItem("user")
            )}
            onOfferPublication={handleAddNewOffer}
            onOfferDeletion={handleOfferRemove}
          />
        )}
      </div>
    </>
  );
};

export default OffersPage;
