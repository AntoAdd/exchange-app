import Counteroffer from "./Counteroffer";
import axios from "axios";

const CounteroffersList = ({ counteroffers, offerId, onDecline }) => {

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
        onDecline(counterofferId);
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
            items={counteroffer.items}
            publisher={counteroffer.publisherUsername}
            publicationDate={counteroffer.publicationDate}
            handleDecline={handleCounterofferDecline}
          />
        );
      })}
    </div>
  );
};

export default CounteroffersList;
