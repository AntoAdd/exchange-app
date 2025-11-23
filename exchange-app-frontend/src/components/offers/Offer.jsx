import Item from "../items/Item";
import CounteroffersListModal from "../Counteroffers/CounteroffersListModal";
import CounterofferCreationModal from "../Counteroffers/CounterofferCreationModal";

const Offer = ({
  id,
  item,
  publisher,
  publicationDate,
  counteroffers = [],
  exchangeableItems,
  handleDelete = () => {
    return undefined;
  },
}) => {
  const isOwner = publisher === localStorage.getItem("user");

  return (
    <div className="card h-100 shadow border-0">
      <div className="card-body p-0">
        <Item
          id={item.id}
          name={item.name}
          description={item.description}
          category={item.category}
          images={item.images}
          isDeletable={false}
          isCardTop={true}
        />
      </div>

      <div className="card-footer bg-light p-3 border-top d-flex flex-column gap-2 rounded-bottom">
        <div className="d-flex justify-content-between align-items-start text-secondary">
          <small className="fw-bold mb-1">Offer #{id}</small>
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
            <i className="bi bi-arrow-left-right me-2 fs-5 text-primary"></i>
            <span className="me-2 text-primary fw-bold">
              {counteroffers.length}
            </span>
            <span className="text-muted text-nowrap">
              Counteroffer{counteroffers.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target={`#counteroffersModal-${id}`}
            >
              <i className="bi bi-eye me-1"></i> View
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#createModal-${id}`}
              disabled={isOwner}
            >
              <i className="bi bi-plus-circle me-1"></i> Make
            </button>
          </div>
        </div>

        {isOwner && (
          <div className="d-grid mt-2">
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-sm btn-outline-danger"
            >
              <i className="bi bi-trash3 me-2"></i> Delete Offer
            </button>
          </div>
        )}
      </div>

      <CounteroffersListModal
        offerId={id}
        offerPublisher={publisher}
        counteroffers={counteroffers}
        modalId={`counteroffersModal-${id}`}
      />
      <CounterofferCreationModal
        offerId={id}
        exchangeableItems={exchangeableItems}
        modalId={`createModal-${id}`}
      />
    </div>
  );
};

export default Offer;
