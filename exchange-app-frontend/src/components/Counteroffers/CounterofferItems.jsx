import Item from "../items/Item";

const CounterofferItems = ({ counterofferId, items }) => {
  const parentId = `counteroffer-items-${counterofferId}`;

  return (
    <div className="accordion d-flex flex-column flex-fill" id={parentId}>
      {items.map((item, index) => {
        const itemId = `item-${counterofferId}-${item.id}`;

        const itemClass =
          index === 0
            ? "accordion-item rounded-top"
            : "accordion-item rounded-0";

        return (
          <div key={item.id} className={itemClass}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed ${
                  index === 0 ? "rounded-top border-bottom-0" : ""
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${itemId}`}
                aria-expanded="false"
                aria-controls={itemId}
              >
                Item #{index + 1}: {item.name}
              </button>
            </h2>
            <div
              id={itemId}
              className="accordion-collapse collapse"
              data-bs-parent={`#${parentId}`}
            >
              <div className="accordion-body">
                <Item
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  category={item.category}
                  images={item.images}
                  isDeletable={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CounterofferItems;
