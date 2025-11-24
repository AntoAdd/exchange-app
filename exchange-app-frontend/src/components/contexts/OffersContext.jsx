import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/offers/all-offers`,
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

  const handleModifyOffer = (modifiedOffer) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === modifiedOffer.id ? modifiedOffer : offer
      )
    );
  };

  return (
    <OffersContext.Provider
      value={{
        offers,
        handleAddNewOffer,
        handleOfferRemove,
        handleModifyOffer,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
