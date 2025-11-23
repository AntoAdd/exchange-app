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
      className="row gy-4"
      onClick={() => handleItemDeselection()}
    >
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <div
              key={item.id}
              className="col-lg-6"
            >
              <Item
                id={item.id}
                name={item.name}
                description={item.description}
                category={item.category}
                images={item.images}
                isSelectable={true}
                isDeletable={false}
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
