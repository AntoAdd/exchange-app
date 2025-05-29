import Offer from "./Offer";

const Offers = ({ offers }) => {
  const otherUsersOffers = offers.filter(offer => offer.publisher !== localStorage.getItem("user"));

  return (
    <div className="container-fluid">
      <div className="row m-4">
        {otherUsersOffers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">No offers published yet!</p>
          </div>
        ) : (
          otherUsersOffers
            .map((offer) => {
              return (
                <div key={offer.id} className="col-3 m-4">
                  <Offer
                    id={offer.id}
                    item={offer.offerItem}
                    publisher={offer.publisherUsername}
                    publicationDate={offer.publicationDate}
                    counteroffers={offer.counteroffers}
                  />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Offers;
