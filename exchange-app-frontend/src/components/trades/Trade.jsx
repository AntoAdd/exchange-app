const Trade = ({ number, id, offer, counteroffer, closedDate }) => {
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
        <div className="card rounded-0 shadow">
          <div className="card-header d-flex justify-content-between">
            <span>
              Trade with{" "}
              {localStorage.getItem("user") === offer.publisher
                ? counteroffer.publisher
                : offer.publisher}
            </span>
            <span>Closed date: {closedDate}</span>
          </div>

          <div className="card-content d-flex flex-column">
            <div className="border border-bottom p-4">
              <h3 className="mb-3">
                Offer{" "}
                {localStorage.getItem("user") !== offer.publisher
                  ? `by ${offer.publisher}`
                  : ""}
              </h3>
              <div className="row">
                <div className="col-4">
                  <div className="d-flex bg-body-tertiary border rounded-3 shadow-sm">
                    <img
                      className="w-50 h-50 border border-end"
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
              <h3 className="mb-3">
                Counteroffer{" "}
                {localStorage.getItem("user") !== counteroffer.publisher
                  ? `by ${counteroffer.publisher}`
                  : ""}
              </h3>
              <div className="row">
                {counteroffer.items.map((i) => (
                  <div key={i.id} className="col-3">
                    <div className="d-flex flex-column border rounded shadow-sm">
                      <img
                        className="border border-bottom"
                        src={`data:image/jpeg;base64,${i.images[0].imageFile}`}
                        alt="counteroffer-image"
                      />
                      <h3 className="text-center bg-body-tertiary pt-2">
                        {i.name}
                      </h3>
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
