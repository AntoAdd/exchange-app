import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Offers from "../offers/Offers";
import UserOffers from "../offers/UserOffers";
import { OffersContext } from "../contexts/OffersContext";

const OffersPage = () => {
  const { offers } = useContext(OffersContext);
  const [exchangeableItems, setExchangeableItems] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("offers update:", offers.length);
    axios({
      method: "get",
      url: "http://localhost:8080/items/user-exchangeable",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setExchangeableItems(response.data);
      })
      .catch((err) => console.log(err));
  }, [offers]);

  const otherUsersOffers = offers.filter(
    (offer) =>
      offer.publisher !== localStorage.getItem("user") &&
      offer.state === "Published"
  );

  const userOffers = offers.filter(
    (offer) =>
      offer.publisher === localStorage.getItem("user") &&
      offer.state === "Published"
  );

  return (
    <>
      <div className="d-flex flex-column align-items-center m-4" style={{paddingTop: "80px"}}>
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
          <Offers
            offers={otherUsersOffers}
            exchangeableItems={exchangeableItems}
          />
        ) : (
          <UserOffers
            offers={userOffers}
            exchangeableItems={exchangeableItems}
          />
        )}
      </div>
    </>
  );
};

export default OffersPage;
