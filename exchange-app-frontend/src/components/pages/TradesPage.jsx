import { useContext } from "react";
import { TradesContext } from "../contexts/TradesContext";
import Trade from "../trades/Trade";

const TradesPage = () => {
  const { trades, handleTradesClear } = useContext(TradesContext);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-between align-items-end mt-4 me-4 ms-4 mb-2" style={{paddingTop: "80px"}}>
        <h1>My Trades</h1>
        <div>
          <button
            type="button"
            onClick={() => handleTradesClear()}
            disabled={trades.length === 0}
            className="btn btn-primary btn-sm"
          >
            Clear History
          </button>
        </div>
      </div>
      <hr className="mx-4 mb-4" />
      {trades.length === 0 ? (
        <div className="d-flex justify-content-center">
          <p className="lead">No trades to display</p>
        </div>
      ) : (
        <div className="accordion mx-4 mb-5" id="user-trades">
          {trades.map((t, index) => (
            <Trade
              key={t.id}
              id={t.id}
              number={index + 1}
              offer={t.offer}
              counteroffer={t.counteroffer}
              closedDate={t.closedDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TradesPage;
