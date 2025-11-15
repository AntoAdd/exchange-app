import { useState, useContext } from "react";
import Offers from "../offers/Offers";
import UserOffers from "../offers/UserOffers";
import { OffersContext } from "../contexts/OffersContext";

const OffersPage = () => {
  const { offers } = useContext(OffersContext);
  const [showAll, setShowAll] = useState(true);

  console.log("Offers:", offers);
  const otherUsersOffers = offers.filter(
    (offer) => offer.publisher !== localStorage.getItem("user")
  );

  const userOffers = offers.filter(
    (offer) => offer.publisher === localStorage.getItem("user")
  );

  return (
    <>
      <div className="d-flex flex-column align-items-center m-4">
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
          <Offers offers={otherUsersOffers} />
        ) : (
          <UserOffers offers={userOffers} />
        )}
      </div>
    </>
  );
};

export default OffersPage;
