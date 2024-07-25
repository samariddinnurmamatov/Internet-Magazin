import {
  FaRegStar,
  FaPlus,
  FaMinus,
  FaRegHeart,
  FaTrashAlt,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";
import Container from "../../components/shared/Container";
import { useEffect, useState } from "react";
import { apiGetBasket } from "../../services/HomeService";

const Basket = () => {
  const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchLiked = async () => {
            try {
                const response = await apiGetBasket();
                if (response) {
                    // Ensure that the data structure is handled correctly
                    setBasket(response.data); // Adjust based on actual response structure
                  } else {
                    console.error('Invalid favorites data structure:', response);
                  }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchLiked();
    }, []);



  return (
    <div className="home-style3 cart-pg-1 py-3">
      <Container>
        <section className="tc-cart p-5 radius-4 bg-white mt-3 mb-3">
          <div className="row">
            <div className="col-lg-8">
              <div className="products">
                {/* foreach data */}
                {basket.map(item => (
                  <div className="product-card" key={item.id}>
                    <div className="top-inf">
                      <div className="dis-card">
                        <small className="fsz-10 d-block text-uppercase"> save </small>
                        <h6 className="fsz-14">${item.discountPrice}</h6>
                      </div>
                      <a
                        href="#0"
                        className={`fav-btn`}
                        // onClick={() => handleLikeToggle(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '9px',
                          borderRadius: '50%',
                          border: '1px solid',
                          transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
                        }}
                      >
                        <FaRegHeart />
                      </a>
                      <a href="#0" className="remove-btn" 
                        // onClick={() => handleRemove(item.id)}
                      > <FaTrashAlt /></a>
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
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-card">
                <strong className="fsz-16 d-block mb-20">
                   
                  Order Summary 
                </strong>
                {/* <div className="card-item"> <span> Sub Total: </span> <strong className="color-000"> $1,000.00 </strong> </div>
                <div className="card-item"> <span> Shipping estimate: </span> <strong className="color-000"> $600.00 </strong> </div>
                <div className="card-item"> <span> Tax estimate: </span> <strong className="color-000"> $137.00 </strong> </div> */}
                <div className="card-item border-0">
                   
                  <strong className="color-000 text-uppercase">
                     
                    Order total: 
                  </strong> 
                  <strong className="color-000">
                     
                    $122
                  </strong> 
                </div>
                <div className="btns pt-3">
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <a
                        href="/checkout"
                        className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-3 mt-lg-0 py-3 px-3 w-100"
                      >
                         
                        <span> checkout </span> 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Basket;
