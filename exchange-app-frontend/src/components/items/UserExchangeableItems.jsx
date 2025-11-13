import Item from "./Item";

const UserExchangeableItems = ({ items, onItemSelection, selectedItemId }) => {
  const handleItemSelection = (e, id) => {
    e.stopPropagation();

    onItemSelection(id);
  };

  const handleItemDeselection = () => {
    onItemSelection(null);
  };

  return (
    <div
      className="row justify-content-start m-2"
      onClick={() => handleItemDeselection()}
    >
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <div
              key={item.id}
              className="col-6 mb-3 d-flex align-items-stretch"
            >
              <Item
                id={item.id}
                name={item.name}
                description={item.description}
                category={item.category}
                images={item.images}
                isSelectable={true}
                selectedId={selectedItemId}
                handleSelection={handleItemSelection}
              />
            </div>
          );
        })
      ) : (
        <p className="lead">You have no items to exchange.</p>
      )}
    </div>
  );
};

export default UserExchangeableItems;
