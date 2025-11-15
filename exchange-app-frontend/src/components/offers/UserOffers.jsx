import { useState, useEffect, useContext } from "react";
import { RealTimeContext } from "../contexts/RealTimeContext";
import axios from "axios";
import Offer from "../offers/Offer.jsx";
import Modal from "../Modal.jsx";
import UserExchangeableItems from "../items/UserExchangeableItems.jsx";

const UserOffers = ({ offers }) => {
  const [exchangeableItems, setExchangeableItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { sendNotification } = useContext(RealTimeContext);

  useEffect(() => {
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
  }, []);

  const handleItemSelection = (id) => {
    setSelectedItemId(id);
  };

  const handleOfferPublication = (itemId) => {
    axios({
      method: "post",
      url: "http://localhost:8080/offers/publish",
      params: {
        id: itemId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setExchangeableItems((prevExchangeableItems) =>
            prevExchangeableItems.filter((item) => item.id !== selectedItemId)
          );
          setSelectedItemId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOfferDelete = (offerID) => {
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

          const offerDeleted = response.data;

          console.log("About to send notifications:", offerDeleted.counteroffers);

          offerDeleted.counteroffers.forEach((counteroffer) => {
            console.log("Sending notification to:", counteroffer.publisher)
            sendNotification(counteroffer.publisher, message);
          });

          setExchangeableItems((prevExchangeableItems) =>
            prevExchangeableItems.concat(offerDeleted.offerItem)
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error removing this offer.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-between align-items-end mt-4 me-4 ms-4 mb-2">
        <h1>My Offers</h1>
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
      <div className="row m-4">
        {offers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">You have no offers published yet!</p>
          </div>
        ) : (
          offers.map((offer) => {
            return (
              <div key={offer.id} className="col-3 m-4">
                <Offer
                  id={offer.id}
                  item={offer.offerItem}
                  publisher={offer.publisher}
                  publicationDate={offer.publicationDate}
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
