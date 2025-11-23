import ItemImages from "./ItemImages";

const SelectableItem = ({
  id,
  name,
  description,
  category,
  images,
  handleSelection,
  isSelected = false
}) => {
  const className = isSelected
    ? "card w-100 h-100 position-relative border border-primary-subtle rounded shadow"
    : "card w-100 h-100 position-relative border border-light-subtle rounded shadow";

  const selectedBadge = (
    <span
      className="z-1 position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle d-flex justify-content-center align-items-center"
      style={{ width: "1.5em", height: "1.5em", fontSize: "1em" }}
    >
      <i className="bi bi-check-lg text-white"></i>
    </span>
  );

  return (
    <div className={className} onClick={(e) => handleSelection(e, id)}>
      {isSelected && selectedBadge}
      <ItemImages itemId={id} images={images} name={name} />
      <div className="d-flex flex-column h-100">
        <div className="card-body d-flex flex-column border-top">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-4 text-body-secondary">{category}</h6>
          <div className="overflow-auto">
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectableItem;
