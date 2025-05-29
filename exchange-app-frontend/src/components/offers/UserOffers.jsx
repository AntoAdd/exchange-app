import { useState } from "react";
import Offer from "../offers/Offer.jsx";
import Modal from "../Modal.jsx";
import UserExchangeableItems from "../items/UserExchangeableItems.jsx";

const UserOffers = ({ offers, handleOfferPublication, handleOfferDeletion }) => {
  const [idToPublish, setIdToPublish] = useState(null);

  const userOffers = offers.filter(offer => offer.publisher === localStorage.getItem("user"));

  const handleIdToPublish = (id) => {
    setIdToPublish(id);
  };

  return (
    <div className="container-fluid">
      <div className="row m-4">
        {userOffers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">You have no offers published yet!</p>
          </div>
        ) : (
          userOffers
            .map((offer) => {
              return (
                <div key={offer.id} className="col-3 m-4">
                  <Offer
                    id={offer.id}
                    item={offer.offerItem}
                    publisher={offer.publisher}
                    publicationDate={offer.publicationDate}
                    counteroffers={offer.counteroffers}
                    handleDelete={handleOfferDeletion}
                  />
                </div>
              );
            })
        )}
      </div>
      <div className="row m-4">
        <div className="col d-flex justify-content-center">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#simpleModal"
            className="btn btn-primary btn-lg"
          >
            Publish offer
          </button>
        </div>
      </div>
      <Modal
        title="Publish offer"
        hasAction={true}
        actionName="Publish"
        action={() => handleOfferPublication(idToPublish)}
      >
        <UserExchangeableItems handleIdToPublish={handleIdToPublish} />
      </Modal>
    </div>
  );
};

export default UserOffers;
