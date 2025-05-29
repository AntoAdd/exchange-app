const ItemImages = ({ itemId, images, name }) => {
  return (
    <div id={"carouselExample" + itemId} className="carousel carousel-dark slide">
      <div className="carousel-inner">
        {images.map((image, index) => {
          if (index === 0) {
            return (
              <div key={image.id} className="carousel-item active">
                <img
                  src={`data:image/jpeg;base64,${image.imageFile}`}
                  className="d-block w-100 rounded-top"
                  alt={`${name}`}
                />
              </div>
            );
          } else {
            return (
              <div key={image.id} className="carousel-item">
                <img
                  src={`data:image/jpeg;base64,${image.imageFile}`}
                  className="d-block w-100 rounded-top"
                  alt={`${name}`}
                />
              </div>
            );
          }
        })}
      </div>
      <button
        className="carousel-control-prev rounded"
        type="button"
        data-bs-target={"#carouselExample" + itemId}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next rounded"
        type="button"
        data-bs-target={"#carouselExample" + itemId}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ItemImages;
