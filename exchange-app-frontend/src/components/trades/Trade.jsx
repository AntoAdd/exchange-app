const Trade = ({ number, id, offer, counteroffer, closedDate }) => {
  const isUserOfferPublisher = localStorage.getItem("user") === offer.publisher;

  const tradePartner = isUserOfferPublisher
    ? counteroffer.publisher
    : offer.publisher;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={
            number === 1 ? "accordion-button" : "accordion-button collapsed"
          }
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#item-${id}`}
          aria-expanded="true"
          aria-controls={`item-${id}`}
        >
          Trade {number}
        </button>
      </h2>
      <div
        id={`item-${id}`}
        className={
          number === 1
            ? "accordion-collapse collapse show"
            : "accordion-collapse collapse"
        }
        data-bs-parent="#user-trades"
      >
        <div className="card rounded-0 shadow border-0">
          <div className="card-header d-flex justify-content-between bg-light text-secondary small">
            <span>
              <i className="bi bi-person-fill me-1"></i>
              Trade Partner: {tradePartner}
            </span>
            <span>
              <i className="bi bi-calendar-date me-1"></i>
              Closed Date: {closedDate}
            </span>
          </div>

          <div className="card-content d-flex flex-column">
            <div className="border border-bottom p-4">
              <h3 className="mb-3 fs-5">
                Offer Item{" "}
                {!isUserOfferPublisher && (
                  <span className="text-secondary small ms-2 fw-normal">
                    (from {offer.publisher})
                  </span>
                )}
              </h3>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex bg-body-tertiary border rounded-3 shadow">
                    <img
                      className="w-50 h-50 border border-end rounded-start"
                      src={`data:image/jpeg;base64,${offer.offerItem.images[0].imageFile}`}
                      alt="offer-image"
                    />
                    <div className="d-flex flex-column p-3">
                      <h3>{offer.offerItem.name}</h3>
                      <p className="text-secondary">
                        {offer.offerItem.category}
                      </p>
                      <p>{offer.offerItem.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-3 fs-5">
                Counteroffer Items{" "}
                {localStorage.getItem("user") !== counteroffer.publisher && (
                  <span className="text-secondary small ms-2 fw-normal">
                    (from {counteroffer.publisher})
                  </span>
                )}
              </h3>
              <div className="row gy-4">
                {counteroffer.items.map((i) => (
                  <div key={i.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="d-flex flex-column border rounded shadow h-100">
                      <div
                        className="overflow-hidden rounded-top"
                        style={{ aspectRatio: "1/1" }}
                      >
                        <img
                          className="w-100 h-100 border-bottom"
                          style={{ objectFit: "cover" }}
                          src={`data:image/jpeg;base64,${i.images[0].imageFile}`}
                          alt="counteroffer-image"
                        />
                      </div>
                      <div className="bg-body-tertiary p-2 mt-auto rounded-bottom">
                        <h4 className="text-center mb-0 fs-6 fw-semibold">
                          {i.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
