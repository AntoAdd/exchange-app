import CounteroffersList from "./CounteroffersList";

const CounteroffersListModal = ({
  modalId,
  offerId,
  offerPublisher,
  counteroffers,
}) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Counteroffers
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {counteroffers.length === 0 ? (
              <div className="text-center py-5">
                <i
                  className="bi bi-inbox text-muted"
                  style={{ fontSize: "3rem" }}
                ></i>
                <p className="text-muted mt-3 mb-0">No counteroffers yet</p>
              </div>
            ) : (
              <CounteroffersList
                offerId={offerId}
                offerPublisher={offerPublisher}
                counteroffers={counteroffers}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounteroffersListModal;
