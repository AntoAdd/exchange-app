import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../offers/Offer.js";
import Modal from "../Modal.js";
import UserExchangeableItems from "../UserExchangeableItems.js";

const UserOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [idToPublish, setIdToPublish] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/offers/user-offers",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setOffers(response.data);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const handleIdToPublish = (id) => {
    setIdToPublish(id);
  }

  const handlePublish = (id) => {
    axios(
      {
        method: "post",
        url: "http://localhost:8080/offers/publish",
        params: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      if(response.status === 200)
        setUpdate(!update);
    }).catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center m-4">
        <div className="col-4 d-flex justify-content-center">
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
      <div className="row justify-content-start m-4">
        {offers.map((offer) => {
          return (
            <div key={offer.id} className="col-3">
              <Offer
                id={offer.id}
                item={offer.offerItem}
                publisher={offer.publisherUsername}
                publicationDate={offer.publicationDate}
                counteroffers={offer.counteroffers}
              />
            </div>
          );
        })}
      </div>
      <Modal title="Publish offer" hasAction={true} actionName="Publish" action={() => handlePublish(idToPublish)}>
        <UserExchangeableItems updateToggle={update} handlePublication={handleIdToPublish}/>
      </Modal>
    </div>
  );
};

export default UserOffersPage;
