import CounteroffersList from "./CounteroffersList";

const CounteroffersListModal = ({ offerId, counteroffers, onDecline }) => {
  return (
    <div
      className="modal fade"
      id="counteroffersModal"
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
              <p className="lead">No counteroffers made yet.</p>
            ) : (
              <CounteroffersList
                offerId={offerId}
                counteroffers={counteroffers}
                onDecline={onDecline}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounteroffersListModal;
