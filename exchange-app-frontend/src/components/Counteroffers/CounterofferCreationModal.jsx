import SelectableItems from "../items/SelectableItems";
import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const CounterofferCreationModal = ({offerId, onPublish}) => {
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const successAlert = <div className="alert alert-success" role="alert">Counteroffer successfully created!</div>
  const errorAlert = <div className="alert alert-danger" role="alert">Error creating conteroffer</div>

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  const handleSelection = (e, id) => {
    e.stopPropagation();

    const newSelectedIDs = e.target.checked
      ? [...selectedIDs, id]
      : selectedIDs.filter((selectedId) => selectedId !== id);

    setSelectedIDs(newSelectedIDs);
  };

  const handleCounterofferPublish = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/counteroffers/publish",
      params: {
        id: offerId,
        item_IDs: selectedIDs,
      },
      paramsSerializer: (item_IDs) => {
        return qs.stringify(item_IDs, {arrayFormat: 'repeat'});
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
            const counterofferPublished = response.data;
            if (counterofferPublished !== null) {
                setShowAlert(true);
                setAlertType("success");
                onPublish(counterofferPublished);
            } else {
                setShowAlert(true);
                setAlertType("error");
            }
        } else {
          setShowAlert(true);
          setAlertType("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Select items for your counteroffer
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SelectableItems handleSelection={handleSelection} />
            {showAlert && (alertType === "success" ? successAlert : errorAlert)}
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCounterofferPublish}
              disabled={selectedIDs.length === 0}
            >
              Make Counteroffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterofferCreationModal;