import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Offers from "../offers/Offers";
import UserOffers from "../offers/UserOffers";
import { RealTimeContext } from "../contexts/RealTimeContext";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const { sendNotification } = useContext(RealTimeContext);

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

  const handleOfferPublication = (itemID) => {
    axios({
      method: "post",
      url: "http://localhost:8080/offers/publish",
      params: {
        id: itemID,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const newOffer = response.data;
          setOffers((prevOffers) => [...prevOffers, newOffer]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOfferDeletetion = (offerID) => {
    axios({
      method: "delete",
      url: "http://localhost:8080/offers/delete",
      params: {
        id: offerID,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const message = "Offer #" + offerID + " has been removed";
          offers
            .find((offer) => offer.id === offerID)
            .counteroffers.forEach((counteroffer) => {
              sendNotification(counteroffer.publisher, message);
            });

          setOffers((prevOffers) =>
            prevOffers.filter((offer) => offer.id !== offerID)
          );

          alert("Offer successfully removed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error removing this offer.");
      });
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
            offers={offers}
            handleOfferPublication={handleOfferPublication}
            handleOfferDeletion={handleOfferDeletetion}
          />
        )}
      </div>
    </>
  );
};

export default OffersPage;
