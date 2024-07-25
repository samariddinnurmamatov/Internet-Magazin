import { Fragment } from "react";
import Container from "../../../shared/Container";
import Pay1 from '../../../../assets/common/img/pay/pay1-1.png';
import Pay2 from '../../../../assets/common/img/pay/pay2-1.png';
import Pay3 from '../../../../assets/common/img/pay/pay3-1.png';
import Pay4 from '../../../../assets/common/img/pay/pay4-1.png';
import Pay5 from '../../../../assets/common/img/pay/pay5-1.png';
import Payme from '../../../../assets/common/img/pay/payme-logo.png';

import Eng from '../../../../assets/common/img/eng-1.png';
import { FaShippingFast } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosSync } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";


// assets/img/eng-1.png


const MainFooter = () => {
  return (
    <Fragment>
      <footer className="tc-footer-style1">

        <Container>
            <div className="foot-icons py-5 border-bottom">
                <div className="row">
                    <div className="col-lg-3 border-end">
                        <p className="fsz-14 text-uppercase"> <span className="icon color-blue1 me-3"><FaShippingFast /></span> Free Shipping over $99  </p>
                    </div>
                    <div className="col-lg-3 border-end">
                        <p className="fsz-14 text-uppercase ps-lg-3"> <span className="icon color-blue1 me-3"><FaRedoAlt /></span> 30 Days money back  </p>
                    </div>
                    <div className="col-lg-3 border-end">
                        <p className="fsz-14 text-uppercase ps-lg-3"> <span className="icon color-blue1 me-3"><IoShieldCheckmark /></span> 100% Secure Payment  </p>
                    </div>
                    <div className="col-lg-3">
                        <p className="fsz-14 text-uppercase ps-lg-3"> <span className="icon color-blue1 me-3"><FaComments /></span> 24/7 Dedicated Support  </p>
                    </div>
                </div>
            </div>
            <div className="foot-content">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="foot-info">
                            <h6 className="fw-bold mb-30 text-capitalize"> Dora - Online Electronic Market </h6>
                            <small className="fsz-12 text-uppercase"> hotline 24/7 </small>
                            <h5 className="fw-bold color-blue1 mb-20"> (025) 3686 25 16 </h5>
                            <a href="#"> 257 Thatcher Road St, Brooklyn, Manhattan, <br /> NY 10092 </a>
                            <a href="#"> contact@swateletro.com </a>
                            <div className="foot-social mt-40">
                                <a href="#"><BsTwitterX /> </a>
                                <a href="#"><FaFacebookF /> </a>
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaYoutube /></a>
                                <a href="#"><FaBehance /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="links-item mt-5 mt-lg-0">
                            <h6 className="fsz-18 mb-30"> Top Categories </h6>
                            <ul className="links">
                                <li> <a href="#"> TV/Televisions </a> </li>
                                <li> <a href="#"> Computers </a> </li>
                                <li> <a href="#"> Laptops </a> </li>
                                <li> <a href="#"> Mobiles & Tablets </a> </li>
                                <li> <a href="#"> Audios </a> </li>
                                <li> <a href="#"> Cameras </a> </li>
                                <li> <a href="#"> Gadget </a> </li>
                                <li> <a href="#"> Sport Equipments </a> </li>
                                <li> <a href="#"> Office </a> </li>
                                <li> <a href="#"> Smart Home </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="links-item mt-5 mt-lg-0">
                            <h6 className="fsz-18 mb-30"> Company </h6>
                            <ul className="links">
                                <li> <a href="#"> About Dora </a> </li>
                                <li> <a href="#"> Contact </a> </li>
                                <li> <a href="#"> Career </a> </li>
                                <li> <a href="#"> Blog </a> </li>
                                <li> <a href="#"> Sitemap </a> </li>
                                <li> <a href="#"> Store Locations </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="links-item mt-5 mt-lg-0">
                            <h6 className="fsz-18 mb-30"> Help Center </h6>
                            <ul className="links">
                                <li> <a href="#"> Customer Service </a> </li>
                                <li> <a href="#"> Policy </a> </li>
                                <li> <a href="#"> Terms & Conditions </a> </li>
                                <li> <a href="#"> Trach Order </a> </li>
                                <li> <a href="#"> FAQs </a> </li>
                                <li> <a href="#"> My Account </a> </li>
                                <li> <a href="#"> Product Support </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="links-item mt-5 mt-lg-0">
                            <h6 className="fsz-18 mb-30"> Partner </h6>
                            <ul className="links">
                                <li> <a href="#"> Become Seller </a> </li>
                                <li> <a href="#"> Affiliate </a> </li>
                                <li> <a href="#"> Advertise </a> </li>
                                <li> <a href="#"> Partnership </a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        <div className="foot">
            <div className="container">
                <div className="d-flex items-center justify-between">
                    <div className="col-lg-4 text-center text-lg-start">
                        <p className="color-666"> © 2024 <a href="#" className="fw-bold color-000"> Dora </a>. All Rights Reserved </p>
                    </div>
                    <div className="d-flex col-lg-3 w-32 text-center my-4 my-lg-0">
                            <img src={Payme} alt="" className="mx-2" />
                    </div>
                    {/* <div className="col-lg-4">
                        <div className="links lang-links ">
                            <ul className="links-ul justify-content-lg-end justify-content-center">
                                <li className="dropdown">
                                    <a className="dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        $ USD
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                                      <li><a className="dropdown-item" href="#">USD</a></li>
                                      <li><a className="dropdown-item" href="#">USD</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" href="#" id="navbarDropdown6" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={Eng} alt="" className="me-2 icon-15" /> Eng
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown6">
                                      <li><a className="dropdown-item" href="#">Arabic</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

        <div className="mob-navigation d-flex d-lg-none">
            <ul>
                <li className="list">
                    <a href="#0">
                        <span className="icon"><IoIosSync /></span>
                        <span className="text">Compare</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#0">
                        <span className="icon"><FaRegHeart /></span>
                        <span className="text">Favorite</span>
                    </a>
                </li>
                <li className="list active">
                    <a href="#0">
                        <span className="icon"><FaHome /></span>
                        <span className="text">Home</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#0">
                        <span className="icon"><MdOutlineShoppingBag /></span>
                        <span className="text">Cart</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#0">
                        <span className="icon"><FaRegUser /></span>
                        <span className="text">Profile</span>
                    </a>
                </li>
                <li className="indicator"></li>
            </ul>
        </div>

        </footer>
    </Fragment>
  );
};

export default MainFooter;
