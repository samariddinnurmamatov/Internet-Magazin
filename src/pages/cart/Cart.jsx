import { Fragment } from 'react';
import Container from '../../components/shared/Container';
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

export const Cart = () => {
  return (
    <Fragment>
      <div className='home-style3 cart-pg-1 py-10'>
        <Container>
          <section className="tc-cart p-5 radius-4 bg-white mt-3 mb-3">
            <div className="row">
              <div className="col-lg-8">
                <div className="products">
                  <div className="product-card">
                    <div className="top-inf">
                      <div className="dis-card">
                        <small className="fsz-10 d-block text-uppercase"> save </small>
                        <h6 className="fsz-14"> $199.00 </h6>
                      </div>
                      <a href="#0" className="fav-btn"> <FaRegHeart /> </a>
                      <a href="#0" className="remove-btn"><FaTrashAlt /> </a>
                    </div>
                    <a href="#0" className="img">
                      <img src="assets/img/products/prod26.png" alt="" className="img-contain main-image" />
                    </a>
                    <div className="info">
                      <div className="rating">
                        <div className="stars">
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                        <span className="num"> (152) </span>
                      </div>
                      <h6> <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2"> SROK Smart Phone 128GB, Oled Retina </a> </h6>
                      <div className="price mt-15">
                        <h5 className="fsz-18 color-red1 fw-600"> $579.00 </h5>
                      </div>
                      <div className="add-more mt-3">
                        <span className="qt-minus"><FaMinus /></span>
                        <input type="text" className="qt border-0" value="1" />
                        <span className="qt-plus"><FaPlus /></span>
                      </div>
                      <div className="meta">
                        <a href="#" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>
                      </div>
                      <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1"/> In stock </p>
                    </div>
                  </div>
                  <div className="product-card">
                    <div className="top-inf">
                      <small className="fsz-10 py-1 px-2 radius-2 bg-222 text-white text-uppercase"> new </small>
                      <a href="#0" className="fav-btn"> <FaRegHeart /></a>
                      <a href="#0" className="remove-btn"><FaTrashAlt /></a>
                    </div>
                    <a href="#0" className="img">
                      <img src="assets/img/products/prod27.png" alt="" className="img-contain main-image" />
                    </a>
                    <div className="info">
                      <h6> <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2"> aPod Pro Tablet 2023  LTE + Wifi, GPS Cellular 12.9 Inch, 512GB </a> </h6>
                      <div className="price mt-15">
                        <h5 className="fsz-18 fw-600"> $979.00 </h5>
                      </div>
                      <div className="add-more mt-3">
                        <span className="qt-minus"><FaMinus /></span>
                        <input type="text" className="qt border-0" value="1" />
                        <span className="qt-plus"><FaPlus /></span>
                      </div>
                      <div className="meta">
                        <a href="#" className="meta-item color-222"> $2.98 Shipping <span className="bg bg-222"></span> </a>
                      </div>
                      <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1"/>In stock </p>
                    </div>
                  </div>
                  <div className="product-card">
                    <div className="top-inf">
                      <small className="fsz-10 py-1 px-2 radius-2 bg-222 text-white text-uppercase"> new </small>
                      <a href="#0" className="fav-btn"> <FaRegHeart /> </a>
                      <a href="#0" className="remove-btn"><FaTrashAlt /></a>
                    </div>
                    <a href="#0" className="img">
                      <img src="assets/img/products/prod65.png" alt="" className="img-contain main-image" />
                    </a>
                    <div className="info">
                      <div className="rating">
                        <div className="stars">
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar className="=color-999"/>
                        </div>
                        <span className="num"> (5) </span>
                      </div>
                      <h6> <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2"> Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black  Smartphone  </a> </h6>
                      <div className="price mt-15">
                        <h5 className="fsz-18 fw-600"> $659.00 </h5>
                      </div>
                      <div className="add-more mt-3">
                        <span className="qt-minus"><FaMinus /></span>
                        <input type="text" className="qt border-0" value="1" />
                        <span className="qt-plus"><FaPlus /></span>
                      </div>
                      <div className="meta">
                        <a href="#" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>
                        <a href="#" className="meta-item color-red1"> free gift <span className="bg bg-red1"></span> </a>
                      </div>
                      <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1"/> In stock </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-card">
                  <strong className="fsz-16 d-block mb-20"> Order Summary </strong>
                  <div className="card-item"> <span> Sub Total: </span> <strong className="color-000"> $1,000.00 </strong> </div>
                  <div className="card-item"> <span> Shipping estimate: </span> <strong className="color-000"> $600.00 </strong> </div>
                  <div className="card-item"> <span> Tax estimate: </span> <strong className="color-000"> $137.00 </strong> </div>
                  <div className="card-item border-0"> <strong className="color-000 text-uppercase"> Order total: </strong> <strong className="color-000"> $1,737.00 </strong> </div>
                  <div className="btns pt-3">
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                        <a href="#" className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-3 mt-lg-0 py-3 px-3 w-100"> <span> checkout </span> </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </Fragment>
  );
}
