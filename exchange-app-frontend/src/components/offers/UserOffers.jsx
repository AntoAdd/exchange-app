import { useState } from "react";
import axios from "axios";
import Offer from "../offers/Offer.jsx";
import Modal from "../Modal.jsx";
import UserExchangeableItems from "../items/UserExchangeableItems.jsx";

const API_URL = process.env.REACT_APP_API_URL;

const UserOffers = ({ offers, exchangeableItems }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemSelection = (id) => {
    setSelectedItemId(id);
  };

  const handleOfferPublication = (itemId) => {
    axios({
      method: "post",
      url: `${API_URL}/offers/publish`,
      params: {
        id: itemId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setSelectedItemId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOfferDelete = (offerID) => {
    axios({
      method: "delete",
      url: `${API_URL}/offers/delete`,
      params: {
        id: offerID,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error removing this offer.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="position-sticky bg-white" style={{ zIndex: 999 }}>
        <div className="d-flex flex-row justify-content-between align-items-end mt-4 me-4 ms-4 mb-2 ">
          <h1 className="mb-0">My Offers</h1>
          <div>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#simpleModal"
              className="btn btn-primary btn-sm"
            >
              Publish offer
            </button>
          </div>
        </div>
        <hr className="mx-4 mb-4" />
      </div>
      <div className="row m-4 gy-4">
        {offers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">You have no offers published yet!</p>
          </div>
        ) : (
          offers.map((offer) => {
            return (
              <div
                key={offer.id}
                className="col-md-8 offset-md-2 offset-lg-0 col-lg-6 col-xl-4 col-xxl-3"
              >
                <Offer
                  id={offer.id}
                  item={offer.offerItem}
                  publisher={offer.publisher}
                  publicationDate={offer.publicationDate}
                  exchangeableItems={exchangeableItems}
                  counteroffers={offer.counteroffers}
                  handleDelete={handleOfferDelete}
                />
              </div>
            );
          })
        )}
      </div>

      <Modal
        title="Publish offer"
        hasAction={true}
        isDisabledAction={selectedItemId === null}
        actionName="Publish"
        action={() => handleOfferPublication(selectedItemId)}
      >
        <UserExchangeableItems
          items={exchangeableItems}
          selectedItemId={selectedItemId}
          onItemSelection={handleItemSelection}
        />
      </Modal>
    </div>
  );
};

export default UserOffers;
