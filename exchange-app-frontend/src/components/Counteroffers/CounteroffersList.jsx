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
    }).then((response) => {
      if (response.status === 200) {
        alert("Counteroffer correctly declined.");
      }
    }).catch((err) => {
        console.log(err);
        alert("Error declining counteroffer.");
      });
  };

  return (
    <div className="row justify-content-start">
      {counteroffers.map((counteroffer) => {
        return (
          <Counteroffer
            key={counteroffer.id}
            id={counteroffer.id}
            offerPublisher={offerPublisher}
            items={counteroffer.items}
            publisher={counteroffer.publisher}
            publicationDate={counteroffer.publicationDate}
            onDecline={handleCounterofferDecline}
          />
        );
      })}
    </div>
  );
};

export default CounteroffersList;
