{basketItems.map(item => (
    <div className="product-card" key={item.id}>
      <div className="top-inf">
        <div className="dis-card">
          <small className="fsz-10 d-block text-uppercase"> save </small>
          <h6 className="fsz-14">${item.discountPrice}</h6>
        </div>
        <a
          href="#0"
          className={`fav-btn ${likedProductIds[item.id] ? 'active' : ''}`}
          onClick={() => handleLikeToggle(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '9px',
            backgroundColor: likedProductIds[item.id] ? 'var(--color-blue1)' : 'transparent',
            borderColor: likedProductIds[item.id] ? 'black' : 'grey',
            color: likedProductIds[item.id] ? '#fff' : 'inherit',
            borderRadius: '50%',
            border: '1px solid',
            transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
          }}
        >
          {likedProductIds[item.id] ? <FaHeart /> : <FaRegHeart />}
        </a>
        <a href="#0" className="remove-btn" onClick={() => handleRemove(item.id)}><FaTrashAlt /></a>
      </div>
      <a href="#0" className="img">
        <img src={item.image} alt="" className="img-contain main-image" />
      </a>
      <div className="info">
        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <FaRegStar key={index} className={index < item.rating ? "" : "color-999"} />
            ))}
          </div>
          <span className="num"> ({item.ratingCount}) </span>
        </div>
        <h6> <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2">{item.name_uz}</a> </h6>
        <div className="price mt-15">
          <h5 className="fsz-18 color-red1 fw-600"> ${item.price} </h5>
        </div>
        <div className="add-more mt-3">
          <span className="qt-minus" onClick={() => handleQuantityChange(item.id, -1)}><FaMinus /></span>
          <input type="text" className="qt border-0" value={item.quantity} readOnly />
          <span className="qt-plus" onClick={() => handleQuantityChange(item.id, 1)}><FaPlus /></span>
        </div>
        <div className="meta">
          {item.freeShipping && <a href="#" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>}
          {item.freeGift && <a href="#" className="meta-item color-red1"> free gift <span className="bg bg-red1"></span> </a>}
        </div>
        <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1" />In stock </p>
      </div>
    </div>
  ))}