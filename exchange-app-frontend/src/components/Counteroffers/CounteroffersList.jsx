import Counteroffer from "./Counteroffer";
import axios from "axios";

const CounteroffersList = ({ counteroffers, offerId, offerPublisher }) => {
  const handleCounterofferDecline = (counterofferId) => {
    axios({
      method: "delete",
      url: "http://localhost:8080/offers/decline-counteroffer",
      params: {
        offerId: offerId,
        counterofferId: counterofferId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Counteroffer correctly declined.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error declining counteroffer.");
      });
  };

  const handleCounterofferAccept = (counterofferId) => {
    axios({
      method: "post",
      url: "http://localhost:8080/offers/accept-counteroffer",
      params: {
        offerId: offerId,
        counterofferId: counterofferId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log("Then executing.");
      })
      .catch((err) => {
        console.log(err);
        alert("Error acceptiong counteroffer.");
      });
  };

  const handleCounterofferDelete = (counterofferId) => {
    axios({
      method: "delete",
      url: "http://localhost:8080/offers/delete-counteroffer",
      params: {
        offerId: offerId,
        counterofferId: counterofferId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Counteroffer correctly deleted.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting counteroffer.");
      });
  };

  return (
    <div className="row justify-content-start">
      {counteroffers.map((counteroffer) => {
        return (
          <div key={counteroffer.id} className="col-lg-6 col-xl-4">
            <Counteroffer
              id={counteroffer.id}
              offerPublisher={offerPublisher}
              items={counteroffer.items}
              publisher={counteroffer.publisher}
              publicationDate={counteroffer.publicationDate}
              onDecline={handleCounterofferDecline}
              onDelete={handleCounterofferDelete}
              onAccept={handleCounterofferAccept}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CounteroffersList;
