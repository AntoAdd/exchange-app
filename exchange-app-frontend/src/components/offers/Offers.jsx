import Offer from "./Offer";

const Offers = ({ offers }) => {
  return (
    <div className="container-fluid">
      <div className="mt-4 me-4 ms-4 mb-2">
        <h1>All Offers</h1>
      </div>
      <hr className="mx-4 mb-4" />
      <div className="row m-4">
        {offers.length === 0 ? (
          <div className="col d-flex justify-content-center">
            <p className="lead">No offers published yet!</p>
          </div>
        ) : (
          offers
            .map((offer) => {
              return (
                <div key={offer.id} className="col-3 m-4">
                  <Offer
                    id={offer.id}
                    item={offer.offerItem}
                    publisher={offer.publisher}
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
