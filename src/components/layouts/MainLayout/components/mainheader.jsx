import { Fragment, useEffect, useState } from "react";
import HeaderLogo from "../../../../assets/common/img/logo-1.png";
import HeaderEn from "../../../../assets/common/img/eng-1.png";
import { CiSearch } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { apiGetCategory, apiGetFavourites } from "../../../../services/HomeService";



const Mainheader = () => {
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await apiGetCategory()
                if (categoryData.success) setCategories(categoryData.data);
                else console.error('Invalid category data structure:', categoryData);
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
                if (response) {
                    // Ensure that the data structure is handled correctly
                    setFavorites(response.data); // Adjust based on actual response structure
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
    <Fragment>
        <header className="bg-white sticky top-0 z-50 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <nav className="navbar tc-navbar-style1 navbar-expand-lg navbar-light">
                  <div className="d-flex items-center justify-around w-full ">
                      <a className="navbar-brand" href="/" >
                          <img src={HeaderLogo} alt="" className="logo" />
                      </a>
                      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button> */}
                      {/* <div className="search-cat d-none d-lg-block">
                          <div className="input-group">
                              <select name="name" className="form-select">
                                  <option value=""> All Categories </option>
                                {categories.map(category => (
                                    <option key={category.id}>{category.name_uz} </option>
                                ))}
                              </select>
                              <input type="text" className="form-control" placeholder="Search anything..." />
                              <a href="#" className="search-btn"> <CiSearch className="icon-search"/> </a>
                          </div>
                      </div> */}
                      

                      
                      <div className="d-flex">
                          <span className="icon"><IoIosCall className="icon-call"/></span>
                          <div className="">
                              <h6 className="fsz-20 inf color-blue1 fw-bold"> <a href="tel:(025)36862516"> (025) 3686 25 16 </a> </h6>
                          </div>
                      </div>

                      <div className="d-flex">
                            <Link to="about" className="dropdown-item" style={{width: "100%"}}>About</Link>
                            <Link to="contact" className="dropdown-item" style={{width: "100%"}}>Contact</Link>
                            <Link to="login" className="dropdown-item" style={{width: "100%"}}>Login</Link>
                            <Link to="profile" className="dropdown-item" style={{width: "100%"}}>Profile</Link>
                            <Link to="register" className="dropdown-item" style={{width: "100%"}}>Register</Link>
                            <Link to="contact" className="dropdown-item" style={{width: "100%"}}>Contact</Link>
                      </div>

                      <div className="d-flex gap-4 lg:none ">
                          <a href=""> <LuRefreshCcw className="icon-r"/></a>
                          <div className="relative">
                                <Link to="/profile"> <LuUser2 className="icon-r" />  </Link>

                          </div>
                          <div className="relative">
                                <Link to="/favorites"> <FaRegHeart  className="icon-r"/>  </Link>
                                <span className="absolute left-3 bottom-3  w-5 h-5 d-grid place-items-center  rounded-circle" style={{background: '#4B3EC4', color:'white', fontSize:  "13px"}}> {favorites.length} </span>

                          </div>
                          <div className="relative">
                                <Link to="/basket"> <MdOutlineShoppingBag className="icon-r" />  </Link>
                                <span className="absolute left-3 bottom-3  w-5 h-5 d-grid place-items-center  rounded-circle" style={{background: '#4B3EC4', color:'white', fontSize:  "13px"}}> 2 </span>

                          </div>

                      </div>
                      {/* <div className="icons">
                          <a href=""> <LuRefreshCcw className="icon-r"/></a>
                          <Link to="/favorites" style={{marginRight: "10px"}}> <FaRegHeart  className="icon-r"/> <span className="num" style={{fontSize:  "13px", marginLeft: "2px"}}> 2 </span> </Link>
                          <Link to="/profile"> <LuUser2 className="icon-r" /></Link>
                          <Link to="/basket"> <MdOutlineShoppingBag className="icon-r" /> <span className="num"> 2 </span> </Link>
                      </div> */}
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

          <div className="tc-links-nav-style1 d-none d-lg-block ">
                  <div className="d-flex items-center justify-around">
                      <div className="">
                          <div className="links">
                              <ul className="links-ul">
                                  {/* <li>
                                      <a href="#"> <FaGripLines /> </a>
                                  </li> */}
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
          </div>
      </header>
    </Fragment>
  );
};

export default Mainheader;
