const ItemImages = ({ itemId, images, name }) => {
  return (
    <div
      id={"carouselExample" + itemId}
      className="carousel carousel-dark slide"
      style={{ height: "250px", backgroundColor: '#f8f9fa' }}
    >
      <div className="carousel-inner h-100">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={`data:image/jpeg;base64,${image.imageFile}`}
              className="d-block w-100 h-100 rounded-top"
              style={{ objectFit: 'contain' }}
              alt={`${name}`}
            />
          </div>
        ))}
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
