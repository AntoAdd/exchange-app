import CounterofferItems from "./CounterofferItems";

const Counteroffer = ({
  id,
  offerPublisher,
  items,
  publisher,
  publicationDate,
  onDecline,
  onDelete,
  onAccept,
}) => {
  const isOfferPublisher = offerPublisher === localStorage.getItem("user");
  const isCounterofferPublisher = publisher === localStorage.getItem("user");

  return (
    <div className="card h-100 shadow border-0 rounded">
      <div className="card-body d-flex p-0">
        <CounterofferItems counterofferId={id} items={items} />
      </div>
      <div className="card-footer bg-light p-3 border-top d-flex flex-column gap-2 rounded-bottom">
        
        <div className="d-flex justify-content-between align-items-start text-secondary">
          <small className="fw-bold mb-1">Counteroffer #{id}</small>
          <div className="d-flex flex-column gap-2">
            <small>
              <i className="bi bi-person-fill me-1"></i>
              {publisher}
            </small>
            <small>
              <i className="bi bi-calendar-date me-1"></i>
              {publicationDate}
            </small>
          </div>
        </div>

        <hr className="my-1" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start align-items-center gap-2 pt-2">
          
          <div className="d-flex align-items-center flex-shrink-0">
            <i className="bi bi-box me-2 fs-5 text-primary"></i>
            <span className="me-2 text-primary fw-bold">
              {items.length}
            </span>
            <span className="text-muted text-nowrap">
              Item{items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="btn-group" role="group">
            {isOfferPublisher ? (
              <>
                <button
                  className="btn btn-outline-success btn-sm"
                  data-bs-dismiss="modal"
                  onClick={() => onAccept(id)}
                >
                  Accept<i className="bi bi-check2 ms-1"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDecline(id)}
                >
                  Decline<i className="bi bi-x-lg ms-1"></i>
                </button>
              </>
            ) : null}
          </div>
        </div>

        {isCounterofferPublisher && (
          <div className="d-grid mt-2">
            <button
              onClick={() => onDelete(id)}
              className="btn btn-sm btn-outline-danger"
            >
              <i className="bi bi-trash3 me-2"></i> Delete Counteroffer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counteroffer;
