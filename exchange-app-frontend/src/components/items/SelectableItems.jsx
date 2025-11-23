import SelectableItem from "./SelectableItem";

const SelectableItems = ({ items, selectedItemIds, handleSelection }) => {
  return (
    <div className="row gy-4">
      {items.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-box-seam text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <p className="text-muted mt-3 mb-0">
            No exchangeable items available
          </p>
          <small className="text-muted">
            Add items to your inventory first
          </small>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="col-lg-6">
            <SelectableItem
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
              handleSelection={handleSelection}
              isSelected={selectedItemIds.includes(item.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SelectableItems;
