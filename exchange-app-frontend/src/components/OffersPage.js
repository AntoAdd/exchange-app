import UserItems from "./UserItems";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";


function Offer({ offerData }) {
  return (
    <div className="card pe-0 ps-0 m-4 w-auto">
      <div className="card-header d-flex justify-content-center">{offerData.offerItem.name}</div>
      <div className="card-body">
		<img 
			src={`data:image/jpeg;base64,${offerData.offerItem.images[0].imageFile}`}
			className="d-block w-100"
            alt={`${offerData.offerItem.name}`}
		/>
	  </div>
      <div className="card-footer text-body-secondary d-flex justify-content-between">
        {"Published on " + offerData.publicationDate}
		<i className="bi bi-dot" style={{color: "green", fontSize: "18px"}}></i>
      </div>
    </div>
  );
}

const OffersPage = () => {
  const [idToPublish, setIdToPublish] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/offers/user-offers",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setOffers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const setOfferItem = (id) => {
    setIdToPublish(id);
  };

  const unsetOfferItem = () => {
    setIdToPublish(null);
  };

  const publishOffer = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/offers/publish",
      params: { id: idToPublish },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => console.log(response.status));
  };

  return (
    <div className="container-fluid">
		<div className="row">
			{offers.map((offer) => {
				return <Offer key={offer.id} offerData={offer} />
			})}
		</div>
      <div className="m-4">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#simpleModal"
          className="btn btn-primary"
          style={{
            width: "80px",
            height: "80px",
          }}
        >
          Make Offer
        </button>
      </div>
      <Modal
        title="Choose an item for your offer"
        hasAction={true}
        actionName="Publish Offer"
        action={publishOffer}
      >
        <UserItems
          setOfferItem={setOfferItem}
          unsetOfferItem={unsetOfferItem}
        />
      </Modal>
    </div>
  );
};

export default OffersPage;
