import CounterofferItems from "./CounterofferItems";

const Counteroffer = ({
  id,
  offerPublisher,
  items,
  publisher,
  publicationDate,
  onDecline,
  onDelete
}) => {
  const isOfferPublisher = offerPublisher === localStorage.getItem("user");
  const isCounterofferPublisher = publisher === localStorage.getItem("user");

  return (
    <div className="card col-4 p-0 ms-4 mt-2">
      <div className="card-header text-center">
        <h1 className="display-6">Counteroffer #{id}</h1>
        <small className="text-body-secondary">Published by {publisher}</small>
      </div>
      <div className="card-body d-flex p-0">
        <CounterofferItems counterofferId={id} items={items} />
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center text-body-secondary">
        <span>
          <i className="bi bi-calendar-date me-1"></i> {publicationDate}
        </span>
        {isOfferPublisher ? (
          <div>
            <button
              className="btn btn-success btn-sm me-2"
            >
              Accept<i className="bi bi-check2 ms-1"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDecline(id)}
            >
              Decline<i className="bi bi-x-lg ms-1"></i>
            </button>
          </div>
        ) : isCounterofferPublisher ? (
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>Delete</button>
        ) : null}
      </div>
    </div>
  );
};

export default Counteroffer;
