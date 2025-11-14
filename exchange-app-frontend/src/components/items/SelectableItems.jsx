import SelectableItem from "./SelectableItem";

const SelectableItems = ({ items, handleSelection }) => {
  return (
    <div className="row">
      {items.length === 0 ? (
        <p className="lead">You have no more items to exchange</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="col-4">
            <SelectableItem
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              images={item.images}
              handleSelection={handleSelection}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SelectableItems;
