import { Fragment, useEffect, useState } from "react";
import HeaderLogo from "../../../../assets/common/img/logo-1.png";
import HeaderEn from "../../../../assets/common/img/eng-1.png";
import { CiSearch } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { LuPhoneCall, LuRefreshCcw } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { apiGetBasket, apiGetCategory, apiGetFavourites } from "../../../../services/HomeService";
import { session } from "../../../../services/session";



const Mainheader = () => {
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [basketNumberRes, setBasketNumberRes] = useState([]);
    const [isToken, setIsToken] = useState();
    const [basket, setBasket] = useState(0);
    const [like, setLike] = useState(0);

    useEffect(() => {
        const token = session.get("token");
        setIsToken(!!token);

        const fetchData = async () => {
            try {
                if (isToken) {
                    const basketresponse = await apiGetBasket();

                    setBasket(basketresponse.data.length)
                } else {
                    const basketresponse = session.get("products");
                    setBasket(basketresponse.length);

                }
                if (isToken) {
                    const likeresponse = await apiGetFavourites();
                    setLike(likeresponse.data.length);

                } else {
                    const likeresponse = session.get("like");
                    setBasket(basketresponse.length);

                }
                

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchLiked = async () => {
            try {
                const response = await apiGetFavourites();
                const basketResponse = await apiGetBasket();
                const categoryData = await apiGetCategory();

                if (categoryData.success) setCategories(categoryData.data);
                else { console.error('Invalid category data structure:', categoryData) }

                if (response) { setFavorites(response.data); }
                else { console.error('Invalid favorites data structure:', response) }

                if (basketResponse) { setBasketNumberRes(basketResponse.data); }
                else { console.error('Invalid favorites data structure:', basketResponse) }

            } catch (error) {
                console.error('Error fetching quantity favorites and baskets:', error);
            }
        };

        fetchLiked();
    }, []);

    return (
        <Fragment>
            <header className="bg-white sticky d-none d-lg-block top-0 z-50 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                <nav className="navbar container tc-navbar-style1 navbar-expand-lg navbar-light">
                    <div className="d-flex items-center justify-between w-full ">
                        <a className="navbar-brand" href="/" >
                            <img src={HeaderLogo} alt="" className="logo" />
                        </a>
                        <div className="d-flex gap-2">

                            <div className="d-flex">
                                <Link to="/" className="dropdown-item" style={{ width: "100%" }}>Home</Link>
                                <Link to="/about" className="dropdown-item" style={{ width: "100%" }}>About</Link>
                                <Link to="/contact" className="dropdown-item" style={{ width: "100%" }}>Contact</Link>
                                {categories.length > 0 && categories.map(category => (
                                <Link to={`/category/${category.id}`} className="dropdown-item" style={{ width: "100%" }}>{category.name_uz}</Link>

                                ))}
                            </div>
                        </div>

                        <div className="d-flex gap-4 lg:none ">
                            <a href=""> <LuRefreshCcw className="icon-r" /></a>
                            <a href="tel:(025)36862516"> <LuPhoneCall className="icon-r" /></a>

                            <div className="relative">
                                <Link to="/profile"> <LuUser2 className="icon-r" />  </Link>

                            </div>
                            <div className="relative">
                                <Link to="/favorites"> <FaRegHeart className="icon-r" />  </Link>
                                {/* <span className="absolute left-3 bottom-3  w-5 h-5 d-grid place-items-center  rounded-circle" style={{ background: '#4B3EC4', color: 'white', fontSize: "13px" }}> {like} </span> */}

                            </div>
                            <div className="relative">
                                <Link to="/basket"> <MdOutlineShoppingBag className="icon-r" />  </Link>
                                {/* <span className="absolute left-3 bottom-3  w-5 h-5 d-grid place-items-center  rounded-circle" style={{ background: '#4B3EC4', color: 'white', fontSize: "13px" }}> {basket} </span> */}

                            </div>

                        </div>

                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mt-3">
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Demos
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                    <li><a className="dropdown-item" href="../home_baby/index.html">Home Baby</a></li>
                                    <li><a className="dropdown-item" href="index-1.html">Home Electronic</a></li>
                                    <li><a className="dropdown-item" href="../home_lighting/index.html">Home Lighting</a></li>
                                    <li><a className="dropdown-item" href="../home_pets/index.html">Home Pets</a></li>
                                    <li><a className="dropdown-item" href="../home_tech/index.html">Home Tech</a></li>
                                </ul>
                            </li>
                            {/* <li className="nav-item dropdown">
                              <a className="dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Pages
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                  <li><Link to="about" className="dropdown-item" style={{width: "100%"}}>About</Link></li>
                                  <li><Link to="contact" className="dropdown-item" style={{width: "100%"}}>Contact</Link></li>
                                  <li><Link to="login" className="dropdown-item" style={{width: "100%"}}>Login</Link></li>
                                  <li><Link to="profile" className="dropdown-item" style={{width: "100%"}}>Profile</Link></li>
                                  <li><Link to="register" className="dropdown-item" style={{width: "100%"}}>Register</Link></li>
                              </ul>
                          </li> */}
                            <li className="dropdown">
                                <a className="dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                    <li><a className="dropdown-item" href="../inner_pages/products.html">products</a></li>
                                    <li><a className="dropdown-item" href="../inner_pages/products_layout_2.html">products layout 2</a></li>
                                    <li><a className="dropdown-item" href="../inner_pages/cart.html">Cart</a></li>
                                    <li><a className="dropdown-item" href="../inner_pages/checkout.html">Checkout</a></li>
                                    <li><a className="dropdown-item" href="../inner_pages/single_product.html">Single Product</a></li>
                                    <li><a className="dropdown-item" href="../inner_pages/single_product_pay.html">Single Product Pay</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="../inner_pages/contact.html">Contact</a>
                            </li>
                            {/* <li className="nav-item">
                          <a className="nav-link" href="#">Sell on Swoo</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Order Tracking</a>
                        </li> 
                        <li className="nav-item">
                          <a className="nav-link" href="#">Recently Viewed</a>
                        </li> */}
                        </ul>
                    </div>
                </nav>

                {/* <div className="tc-links-nav-style1 d-none d-lg-block ">
                  <div className="d-flex items-center justify-around">
                      <div className="">
                          <div className="links">
                              <ul className="links-ul">
                                  <li>
                                      <a href="#"> <FaGripLines /> </a>
                                  </li>
                                <li className="nav-item dropdown">
                                      <a className="dropdown-toggle" href="#" id="navbarDropdown22" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          Pages <IoIosArrowDown /> 
                                      </a> 
                                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown22">
                                          <li><Link to="about" className="dropdown-item" style={{width: "100%"}}>About</Link></li>
                                          <li><Link to="contact" className="dropdown-item" style={{width: "100%"}}>Contact</Link></li>
                                          <li><Link to="login" className="dropdow n-item" style={{width: "100%"}}>Login</Link></li>
                                          <li><Link to="profile" className="dropdown-item" style={{width: "100%"}}>Profile</Link></li>
                                          <li><Link to="register" className="dropdown-item" style={{width: "100%"}}>Register</Link></li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a className="dropdown-toggle" href="#" id="navbarDropdown33" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          Products <IoIosArrowDown />
                                      </a>
                                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown33">
                                          <li><a className="dropdown-item" href="../inner_pages/products.html">products</a></li>
                                          <li><a className="dropdown-item" href="../inner_pages/products_layout_2.html">products layout 2</a></li>
                                          <li><a className="dropdown-item" href="../inner_pages/cart.html">Cart</a></li>
                                          <li><a className="dropdown-item" href="../inner_pages/checkout.html">Checkout</a></li>
                                          <li><a className="dropdown-item" href="../inner_pages/single_product.html">Single Product</a></li>
                                          <li><a className="dropdown-item" href="../inner_pages/single_product_pay.html">Single Product Pay</a></li>
                                      </ul>
                                  </li>
                                <li className="nav-item">
                                  <a className="dropdown-toggle" href="/contact">Contact <IoIosArrowDown /></a>
                                </li>
                              </ul>
                          </div>
                      </div>
                      <div className=""></div>
                      <div className=""></div>
                      <div className=""></div>
                      <div className=""></div>
                      <div className="">
                          <div className="nav-side d-flex align-items-center">
                              
                              <div className="links lang-links">
                                  <ul className="links-ul">
                                     
                                      <li className="dropdown">
                                          <a className="dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                              <img src={HeaderEn} alt="" className="me-2 icon-15" /> Eng
                                          </a>
                                          <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                                            <li><a className="dropdown-item" href="#">Arabic</a></li>
                                          </ul>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
          </div> */}
            </header>
        </Fragment>
    );
};

export default Mainheader;
