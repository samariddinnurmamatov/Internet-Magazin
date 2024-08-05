import { Fragment, useEffect, useState } from "react";
import Container from "../../../shared/Container";
import Pay1 from '../../../../assets/common/img/pay/pay1-1.png';
import Pay2 from '../../../../assets/common/img/pay/pay2-1.png';
import Pay3 from '../../../../assets/common/img/pay/pay3-1.png';
import Pay4 from '../../../../assets/common/img/pay/pay4-1.png';
import Pay5 from '../../../../assets/common/img/pay/pay5-1.png';
import Payme from '../../../../assets/common/img/pay/imagePayme.png';

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
import { apiGetCategory } from "../../../../services/HomeService";
import { Link } from "react-router-dom";


// assets/img/eng-1.png


const MainFooter = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [categoryData] = await Promise.all([
                    apiGetCategory(),
                ]);

                if (categoryData.success) setCategories(categoryData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Fragment>
            <footer className="tc-footer-style1">

                <Container>
                    <div className="foot-icons py-5 border-bottom">
                        <div className="row">
                            <div className="col-lg-3 border-end">
                                <p className="fsz-14 text-uppercase flex"> <span className="icon color-blue1 me-3"><FaShippingFast /></span> Free Shipping over $99  </p>
                            </div>
                            <div className="col-lg-3 border-end">
                                <p className="fsz-14 text-uppercase flex ps-lg-3"> <span className="icon color-blue1 me-3"><FaRedoAlt /></span> 30 Days money back  </p>
                            </div>
                            <div className="col-lg-3 border-end">
                                <p className="fsz-14 text-uppercase flex ps-lg-3"> <span className="icon color-blue1 me-3"><IoShieldCheckmark /></span> 100% Secure Payment  </p>
                            </div>
                            <div className="col-lg-3">
                                <p className="fsz-14 text-uppercase flex ps-lg-3"> <span className="icon color-blue1 me-3"><FaComments /></span> 24/7 Dedicated Support  </p>
                            </div>
                        </div>
                    </div>
                    <div className="foot-content">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="foot-info">
                                    <h6 className="fw-bold mb-30 text-capitalize"> Dora - Online Electronic Market </h6>
                                    <small className="fsz-12 text-uppercase"> hotline 24/7 </small>
                                    <h5 className="fw-bold color-blue1 mb-20" style={{fontSize: "23px"}}>+998 (90) 009 99 16 </h5>
                                    <a href="#"> ул. Чиланзар 2/2, г. Ташкент, Узбекистан <br /> NY  </a>
                                    <a href="#"> samariddinnurmamatov@gmail.com </a>
                                    <div className="foot-social mt-40">
                                        <a href="#"><FaFacebookF /> </a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaYoutube /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="links-item mt-5 mt-lg-0">
                                    <h6 className="fsz-18 mb-30"> Top Categories </h6>
                                    <ul className="links d-flex flex-col gap-2 color-gray-500">
                                        {categories.map(category => (

                                        <li key={category.id}> <a href={`/category/${category.id}`}> {category.name_uz} </a> </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="links-item mt-5 mt-lg-0">
                                    <h6 className="fsz-18 mb-30"> Company </h6>
                                    <ul className="links">
                                        <li> <a href="/about"> About Dora </a> </li>
                                        <li> <a href="/contact"> Contact </a> </li>
                                        <li> <a href="#"> Career </a> </li>
                                        <li> <a href="#"> Blog </a> </li>
                                        {/* <li> <a href="#"> Sitemap </a> </li> */}
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
                                        {/* <li> <a href="#"> My Account </a> </li> */}
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
                        <div className="flex items-center justify-between">
                            <div className="col-lg-4 text-center text-lg-start">
                                <p className="color-666"> © 2024  <a href="#" className="fw-bold color-000"><span> </span>  Dora </a>. All Rights Reserved </p>
                            </div>
                            <div className="d-flex col-lg-3 text-center  my-lg-0">

                                <img src={Payme} alt="" className="mx-2 w-32 " />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mob-navigation d-flex d-lg-none">
                    <ul>
                        <li className="list">
                            <Link to="/">
                                <span className="icon"><IoIosSync /></span>
                                <span  className="text">Compare</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/favorites">
                                <span className="icon"><FaRegHeart /></span>
                                <span className="text">Favorite</span>
                            </Link>
                        </li>
                        <li className="list active">
                            <Link to="">
                                <span className="icon"><FaHome /></span>
                                <span className="text">Home</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/basket">
                                <span className="icon"><MdOutlineShoppingBag /></span>
                                <span className="text">Cart</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/profile">
                                <span className="icon"><FaRegUser /></span>
                                <span className="text">Profile</span>
                            </Link>
                        </li>
                        <li className="indicator"></li>
                    </ul>
                </div>

            </footer>
        </Fragment>
    );
};

export default MainFooter;
