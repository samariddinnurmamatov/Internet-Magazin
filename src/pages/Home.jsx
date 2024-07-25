import { Fragment, useEffect, useMemo, useState } from "react";

import Head1 from "../assets/common/img/head/head_1-1.png";
import Head11 from "../assets/common/img/head/head_1-1.png";
import Head2 from "../assets/common/img/head/head_2-1.png";
import Head3 from "../assets/common/img/head/head_3-1.png";
import Head4 from "../assets/common/img/head/head_4-1.png";
import Head5 from "../assets/common/img/head/head_5-1.png";

import Banner from "../assets/common/img/products/banner-1.png";

import { RiGalleryView2 } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoSync } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { apiDeleteFavourites, apiGetBasket, apiGetBrands, apiGetCategory, apiGetCategoryOfProduct, apiGetFavourites, apiGetProducts, apiPostBasket, apiPostFavourites, apiUpdateBasket } from "../services/HomeService";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { session } from "../services/session";



const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState([]);
    const [categoryOfProduct, setCategoryOfProduct] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [isToken, setIsToken] = useState(false);



    useEffect(() => {
        const token = session.get("token");
        setIsToken(!!token)

        const fetchData = async () => {
            try {
                const [categoryData, productData, brandData, categoryProduct] = await Promise.all([
                    apiGetCategory(),
                    apiGetProducts(),
                    apiGetBrands(),
                    apiGetCategoryOfProduct(1),
                ]);

                if (categoryData.success) setCategories(categoryData.data);
                if (productData.success) setProducts(productData.data);
                if (brandData.success) setBrands(brandData.data);
                if (categoryProduct.success) setCategoryOfProduct(categoryProduct.data);

                console.log(categoryProduct.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFavoritesBasket = async () => {
            try {
                const [favoritesData, basketData] = await Promise.all([
                    apiGetFavourites(),
                    apiGetBasket(),
                ]);

                if (favoritesData) setFavorites(favoritesData.data.map(fav => fav.id));
                if (basketData) setBasket(basketData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchFavoritesBasket();
    }, []);


    const fetchProductData = async (categoryid) => {

        try {
            const productData = await apiGetCategoryOfProduct(categoryid);
            if (productData.success) setCategoryOfProduct(productData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleLike = async (productId) => {
        try {
            session.add("like", productId);

            setFavorites(prevFavorites => [...prevFavorites, productId]);

            await apiPostFavourites({ product_id: productId });
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const handleUnlike = async (productId) => {
        try {
            session.remove("like", productId);

            setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));

            await apiDeleteFavourites(productId);
        } catch (error) {
            console.error('Error unliking product:', error);
        }
    };

    const handleAddToBasket = async (productIdBasket) => {
        const existingProduct = basket.find(item => item.product_id === productIdBasket);
        try {
            if (existingProduct) {
                const updatedBasketItem = await apiUpdateBasket({ product_id: productIdBasket, quantity: existingProduct.quantity + 1 });
                if (updatedBasketItem.success) {
                    setBasket(prevBasket => prevBasket.map(item => item.product_id === productIdBasket ? { ...item, quantity: item.quantity + 1 } : item));
                    toast.success('Product quantity updated in basket!');
                } else {
                    console.error('Error updating basket:', updatedBasketItem);
                    toast.error('Error updating basket.');
                }
            } else {
                const newBasketItem = await apiPostBasket({ product_id: productIdBasket, quantity: 1 });
                if (newBasketItem.success) {
                    setBasket(prevBasket => [...prevBasket, { product_id: productIdBasket, quantity: 1 }]);
                    // toast.success('Product added to basket!');
                } else {
                    console.error('Error adding to basket:', newBasketItem);
                    toast.error('Error adding to basket.');
                }
            }
        } catch (error) {
            console.error('Error adding to basket:', error);
            toast.error('Error adding to basket.');
        }
    };

    const isFavorite = useMemo(
        () => (productId) => favorites.includes(productId),
        [favorites]
    );

    // const isFavorite = (productId) => favorites.includes(productId);


    return (
        <Fragment>
            <main style={{ height: "auto", marginBottom: "50px" }}>

                <section className="tc-header-style1 mt-4">
                    <div className="container">
                        <div className="content">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="main-slider">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="slide-card">
                                                    <div className="img th-450">
                                                        <img src={Head1} alt="" className="img-cover" />
                                                    </div>
                                                    <div className="info text-white">
                                                        <div className="cont">
                                                            <h2 className="fsz-35 fw-200"> EKO 40 <br /> Android TV </h2>
                                                            <p className="fsz-12 mt-15 text-uppercase"> Smart Full HD Android TV  with Google Assistant  </p>
                                                            <a href="../inner_pages/single_product.html" className="butn px-5 py-3 bg-blue1 text-white rounded-pill mt-60 fw-600"> <span> Shop Now </span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="slide-card">
                                                    <div className="img th-450">
                                                        <img src={Head11} alt="" className="img-cover" />
                                                    </div>
                                                    <div className="info text-white">
                                                        <div className="cont">
                                                            <h2 className="fsz-35 fw-200"> EKO 40 <br /> Android TV </h2>
                                                            <p className="fsz-12 mt-15 text-uppercase"> Smart Full HD Android TV  with Google Assistant  </p>
                                                            <a href="../inner_pages/single_product.html" className="butn px-5 py-3 bg-blue1 text-white rounded-pill mt-60 fw-600"> <span> Shop Now </span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="slider-controls">
                                            <div className="swiper-button-prev"></div>
                                            <div className="swiper-pagination"></div>
                                            <div className="swiper-button-next"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card-overlay card-center">
                                        <div className="img th-450">
                                            <img src={Head2} alt="" className="img-cover" />
                                        </div>
                                        <div className="info text-white p-50">
                                            <div className="cont">
                                                <h3 className="fsz-30"> Humidifying Fan </h3>
                                                <p className="fsz-13 mt-1"> From $299  </p>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="butn px-5 py-3 bg-white color-000 rounded-pill fw-600"> <span> Discover Now </span> </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card-overlay wow fadeInUp slow" data-wow-delay="0.2s">
                                        <div className="img th-230">
                                            <img src={Head3} alt="" className="img-cover" />
                                        </div>
                                        <div className="info color-000 p-30">
                                            <div className="cont">
                                                <h3 className="fsz-30"> iPad mini <br /> 2022 </h3>
                                                <p className="fsz-13 mt-1 color-666"> Mega Power in mini size  </p>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="butn px-4 py-2 bg-dark text-white rounded-pill fw-600 fsz-12 mt-30"> <span> Shop Now </span> </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card-overlay wow fadeInUp slow" data-wow-delay="0.4s">
                                        <div className="img th-230">
                                            <img src={Head4} alt="" className="img-cover" />
                                        </div>
                                        <div className="info text-white p-30">
                                            <div className="cont">
                                                <h6 className="fsz-20"> Air <br /> Purifier </h6>
                                                <small className="fsz-10 color-999 d-block text-uppercase mt-2"> from </small>
                                                <p className="fsz-20 color-lightGreen"> $169  </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-lg-6">
                                <div className="card-overlay wow fadeInUp slow" data-wow-delay="0.6s">
                                    <div className="img th-230">
                                        <img src={Head5} alt="" className="img-cover" />
                                    </div>
                                    <div className="info text-white p-30">
                                        <div className="cont">
                                            <small className="fsz-10 d-block text-uppercase mb-2"> washing machine </small>
                                            <h6 className="fsz-20"> Anatico <br /> Max 2 </h6>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="butn px-4 py-2 bg-white color-000 rounded-pill fw-600 fsz-12 mt-50"> <span> Shop Now </span> </a>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tc-popular-cat-style1 pt-30 pb-50">
                    <div className="container">
                        <div className="sec-title">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <h3 className="fsz-24 text-capitalize"> Popular Categories </h3>
                                </div>
                                <div className="col-lg-6 text-lg-end mt-4 mt-lg-0">
                                    <a href="#0" className="more-link text-capitalize fw-500 view_all"> View All<RiGalleryView2 /> </a>
                                </div>
                            </div>
                        </div>
                        <div className="cat-content">
                            {categories.map(category => (
                                <Link key={category.id} to={`/category/${category.id}`} className="cat-card">
                                    <div className="img">
                                        <img src={category.image} alt={category.name_uz} />
                                    </div>
                                    <p className="fsz-13 fw-bold mt-15">{category.name_uz}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="tc-weekly-deals-style1 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="container">
                        <div className="content">
                            <div className="title mb-40">
                                <h3 className="fsz-30 me-lg-5"> Best Weekly Deals </h3>

                                {/* <div className="countdown bg-red1 text-white">
                            <span className="icon me-2"> <FaRegHourglassHalf /> </span> 
                            <p className="me-2"> Expires in: </p>

                            <div className="item">
                                <span id="days"></span>
                                <span> d </span>
                            </div>
                            <span> : </span>
                            <div className="item">
                                <span id="hours"></span>
                                <span> h </span>
                            </div>
                            <span> : </span>
                            <div className="item">
                                <span id="minutes"></span>
                                <span> m </span>
                            </div>
                            <span> : </span>
                            <div className="item">
                                <span id="seconds"></span>
                                <span> s </span>
                            </div>
                        </div> */}

                                {/* <Timer time="april 30, 2024 00:00:00" /> */}



                                {/* <div className="arrows ms-auto"> 
                            <a href="#0" className="swiper-prev icon"> <FaChevronLeft /></a>    
                            <a href="#0" className="swiper-next ms-lg-1 icon"><FaChevronRight /></a>    
                        </div> */}
                            </div>
                            <div className="deals-cards">
                                {products.length && products.map((product) => (
                                    <div className="column-sm" key={product.id}>
                                        <div className="deal-card">
                                            <div className="top">
                                                <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                                <div className="icons">
                                                    <a
                                                        href="#0"
                                                        className={`icon fav ${isFavorite(product.id) ? 'liked' : ''}`}
                                                        onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)}
                                                    >
                                                        {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                                                    </a>
                                                    <a href="#0" className="icon"><IoSync /></a>
                                                    <a href={product.image} className="icon" data-fancybox="deal"><FaEye /></a>
                                                </div>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="img th-140 mb-20 d-block">
                                                <img src={product.image} alt="" className="img-contain" />
                                            </a>
                                            <div className="info">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                                <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> Air Purifier with <br /> True HEPA H14 Filter </a>
                                                <div className="stars fsz-13 mt-2">
                                                    <FaRegStar className="active" />
                                                    <FaRegStar className="active" />
                                                    <FaRegStar className="active" />
                                                    <FaRegStar className="active" />
                                                    <FaRegStar />
                                                    <span> (5) </span>
                                                </div>
                                                <p className="price color-red1 mt-2 fsz-20"> ${product.price} <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $619.00 </span> </p>
                                                <div className="progress mt-20">
                                                    <div className="progress-bar bg-blue1" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="fsz-12 mt-3"> Sold: 24 / 80 </p>
                                            </div>
                                            <a href="#0" className="cart-btn addCart" onClick={() => {

                                                isToken ?
                                                    handleAddToBasket(product.id)
                                                    :
                                                    session.add("products", product.id);
                                                toast.success('Product added to basket!');


                                            }}
                                            >
                                                <MdOutlineAddShoppingCart className="me-1" />Add To Cart
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="text-center mt-30">
                        <a href="../inner_pages/products.html" className="butn py-3 bg-white color-000 rounded-pill fw-600"> <span> See All Products (63) </span> </a>
                    </div> */}
                        </div>
                    </div>
                </section>

                <section className="tc-best-seller-style1 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="container">
                        <div className="title mb-40">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <h3 className="fsz-30"> Best Seller </h3>
                                </div>
                                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                    <a href="../inner_pages/products.html" className="more-btn fsz-14 text-uppercase fw-500 view_all"> View All <RiGalleryView2 /> </a>
                                </div>
                            </div>
                        </div>
                        {/* <ul className="nav nav-pills mb-40" id="pills-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#pills-tab1" type="button" role="tab" aria-selected="true">Top 30</button>
                        </li> 
                        <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab2-tab" data-bs-toggle="pill" data-bs-target="#pills-tab2" type="button" role="tab" aria-selected="false">Televisions</button>
                        </li> 
                    </ul> */}
                        <ul className="nav nav-pills mb-40" id="pills-tabs" role="tablist">
                            {categories.map(category => (

                                <li className="nav-item" role="presentation" key={category.id}>
                                    <button onClick={() => { fetchProductData(category.id) }} className={`nav-link ${activeCategory === category.id ? 'active' : ''}`} id="pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#pills-tab1" type="button" role="tab" aria-selected="true">{category.name_uz}</button>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content" id="pills-tabContent1">
                            <div className="tab-pane fade show active" id="pills-tab1" role="tabpanel" aria-labelledby="pills-tab1-tab">
                                <div className="products-slider">
                                    <div className="swiper-wrapper d-flex gap-3">

                                        {categoryOfProduct.length > 0 && categoryOfProduct.map((product) => (
                                            <div className="swiper-slide" key={product.id}>
                                                <div className="column-sm" >
                                                    <div className="product-card">
                                                        <div className="top">
                                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                                            <div className="icons">
                                                                <a
                                                                    href="#0"
                                                                    className={`icon fav ${isFavorite(product.id) ? 'liked' : ''}`}
                                                                    onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)}
                                                                >
                                                                    {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                                                                </a>
                                                                <a href="#0" className="icon"><IoSync /></a>
                                                                <a href={product.image} className="icon" data-fancybox="deal"><FaEye /></a>
                                                            </div>
                                                        </div>
                                                        <a href="#" className="img th-140 mb-20 d-block">
                                                            <img src={product.image} alt="" className="img-contain" />
                                                        </a>
                                                        <div className="info">
                                                            <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                                            <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> Air Purifier with <br /> True HEPA H14 Filter </a>
                                                            <div className="stars fsz-13 mt-2">
                                                                <FaRegStar className="active" />
                                                                <FaRegStar className="active" />
                                                                <FaRegStar className="active" />
                                                                <FaRegStar className="active" />
                                                                <FaRegStar />
                                                                <span> (5) </span>
                                                            </div>
                                                            <p className="price color-red1 mt-2 fsz-20"> ${product.price} <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $619.00 </span> </p>
                                                            <div className="progress mt-20">
                                                                <div className="progress-bar bg-blue1" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <p className="fsz-12 mt-3"> Sold: 24 / 80 </p>
                                                        </div>
                                                        <a href="#0" className="cart-btn addCart" onClick={() => {
                                                            isToken ?
                                                                handleAddToBasket(product.id)
                                                                :
                                                                session.add("products", product.id);
                                                            toast.success('Product added to basket!');
                                                        }

                                                        }><MdOutlineAddShoppingCart className="me-1" />Add To Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="slider-controls">
                                        <div className="swiper-button-prev"></div>
                                        <div className="swiper-pagination"></div>
                                        <div className="swiper-button-next"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tc-pupolar-brands-style1 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="container overflow-hidden custom-container">
                        <div className="content">
                            <div className="title mb-40">
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <h3 className="fsz-30"> Popular Brands </h3>
                                    </div>
                                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                        <a href="../inner_pages/products.html" className="more-btn fsz-14 text-uppercase fw-500 view_all"> View All <RiGalleryView2 /> </a>
                                    </div>
                                </div>
                            </div>
                            <div className="pupolar-slider">
                                <div className="swiper-wrapper">
                                    {brands.map(brand => (
                                        <div className="swiper-slide" key={brand.id}>
                                            <div className="card-overlay" >
                                                <div className="img th-250">
                                                    <img src={brand.image} alt="a" className="img-cover" />
                                                </div>
                                                <div className="info text-white p-30">
                                                    <div className="cont d-flex align-content-between flex-wrap h-100">
                                                        <div className="top">
                                                            <h6 className="fsz-18 fw-500 w-100 text-uppercase"> {brand.title_uz} </h6>
                                                            <small className="fsz-12 mt-10"> {brand.description_uz} </small>
                                                        </div>
                                                        <a href="../inner_pages/single_product.html" className="butn px-4 py-2 bg-white color-000 rounded-pill fw-600 fsz-12 mt-30"> <span> Shop Now </span> </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tc-trend-search-style1 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="container">
                        <h3 className="fsz-30 mb-30"> Trending Search </h3>
                        <div className="links">
                            {categories.map(category => (

                                <Link to={`/category/${category.id}`} className="link"> {category.name_uz} </Link>
                            ))}

                        </div>
                    </div>
                </section>

                <section className="tc-main-banner-style1 wow fadeInUp slow mb-5" data-wow-delay="0.2s">
                    <div className="container">
                        <div className="banner">
                            <div className="row align-items-center">
                                <div className="col-lg-2">
                                    <h6 className="fsz-24 text-uppercase color-cyan1 lh-1"> Pre Order </h6>
                                    <small className="fsz-10 color-999 text-uppercase"> be the first to own </small>
                                    <p className="fsz-14 mt-2 text-white"> From $399 </p>
                                </div>
                                <div className="col-lg-4 order-last order-lg-0">
                                    <div className="img">
                                        <img src={Banner} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3 mt-lg-0">
                                    <small className="fsz-12 color-cyan1"> Opplo Watch Sport <br /> Series 8 </small>
                                    <h3 className="fsz-30 mt-10 fw-300 text-white"> A healthy leap ahead </h3>
                                </div>
                                <div className="col-lg-2 mt-4 mt-lg-0">
                                    <div className="text-lg-end">
                                        <a href="../inner_pages/single_product.html" className="butn px-4 pt-10 pb-10 bg-white color-000 rounded-pill fw-600"> <span> Discover Now </span> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="tc-suggest-today-style1">
            <div className="container">
                <div className="title mb-40 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h3 className="fsz-30"> Suggest Today </h3>
                        </div>
                        <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                            <a href="../inner_pages/products.html" className="more-btn fsz-14 text-uppercase fw-500 view_all"> View All <RiGalleryView2 /> </a>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-pills mb-40" id="pills-tabs1" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-tab10-tab" data-bs-toggle="pill" data-bs-target="#pills-tab3" type="button" role="tab" aria-selected="true"><FaFireAlt  className="me-2"/> Recommend For You</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab11-tab" data-bs-toggle="pill" data-bs-target="#pills-tab4" type="button" role="tab" aria-selected="false"> <FaBolt className="me-2"/>Top Best Seller</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab12-tab" data-bs-toggle="pill" data-bs-target="#pills-tab3" type="button" role="tab" aria-selected="false"> <FaRegStar className="me-2"/> Top Rated</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab13-tab" data-bs-toggle="pill" data-bs-target="#pills-tab4" type="button" role="tab" aria-selected="false">70% OFF</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab14-tab" data-bs-toggle="pill" data-bs-target="#pills-tab3" type="button" role="tab" aria-selected="false">50% OFF</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab15-tab" data-bs-toggle="pill" data-bs-target="#pills-tab4" type="button" role="tab" aria-selected="false">30% OFF</button>
                    </li>
                </ul>
                <div className="tab-content wow fadeInUp slow" data-wow-delay="0.2s " id="pills-tabContent2">
                    <div className="tab-pane fade show active" id="pills-tab3" role="tabpanel" aria-labelledby="pills-tab3-tab">
                        <div className="product-row">
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod11} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> SORE Simply Brew Compact Filter Drip Coffee Maker </a>
                                    <div className="stars fsz-13 mt-2">
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (1) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $159.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod12} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Toshubi 2-Door Inveter 1200L Refrigerator </a>
                                    <div className="stars fsz-13 mt-2">
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price color-red1 mt-2 fsz-20"> $1,259.00 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $1,469.00 </span> </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod13} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Epson Mini Portable Projector Wireless </a>
                                    <p className="price mt-2 fsz-20"> $205.00 - $410.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod14} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Brone 2021 iMac All-in-one Desktop Computer with M1 </a>
                                    <div className="stars fsz-13 mt-2">
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $2,725.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod15} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-green1 text-white text-uppercase"> top  rated </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Durotan Manual Espresso Machine, Coffe Maker </a>
                                    <div className="stars fsz-13 mt-2">
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (12) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $449.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod16} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 10% OFF </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Name of Product with Lore </a>
                                    <p className="price color-red1 mt-2 fsz-20"> $79.50 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $69.00 </span> </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod17} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> aPod LTE+GPS Sliver Grey </a>
                                    <div className="stars fsz-13 mt-2">
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar />
                                    <FaRegStar />
                                        <span> (1) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $524.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod18} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Oloxtralic Smart Inveter Washing Machine </a>
                                    <div className="stars fsz-13 mt-2">
                                        <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $725.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod19} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-dark text-white text-uppercase"> out of stock </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> TCL OLed 4K Ultra HD, 47” Smart TV  </a>
                                    <p className="price mt-2 fsz-20"> $1,205.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src={Prod20} alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> BE Home Security Camera </a>
                                    <p className="price mt-2 fsz-20"> $69.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-tab4" role="tabpanel" aria-labelledby="pills-tab4-tab">
                        <div className="product-row">
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod11-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> SORE Simply Brew Compact Filter Drip Coffee Maker </a>
                                    <div className="stars fsz-13 mt-2">
                                       <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (1) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $159.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod12-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Toshubi 2-Door Inveter 1200L Refrigerator </a>
                                    <div className="stars fsz-13 mt-2">
                                        <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price color-red1 mt-2 fsz-20"> $1,259.00 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $1,469.00 </span> </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                    <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                    <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod13-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Epson Mini Portable Projector Wireless </a>
                                    <p className="price mt-2 fsz-20"> $205.00 - $410.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod14-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Brone 2021 iMac All-in-one Desktop Computer with M1 </a>
                                    <div className="stars fsz-13 mt-2">
                                       <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $2,725.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod15-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-green1 text-white text-uppercase"> top  rated </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Durotan Manual Espresso Machine, Coffe Maker </a>
                                    <div className="stars fsz-13 mt-2">
                                        <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (12) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $449.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod16-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <div className="tags">
                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 10% OFF </span>
                                    </div>
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Name of Product with Lore </a>
                                    <p className="price color-red1 mt-2 fsz-20"> $79.50 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $69.00 </span> </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod17-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> aPod LTE+GPS Sliver Grey </a>
                                    <div className="stars fsz-13 mt-2">
                                        <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (1) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $524.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                            </div>
                            <div className="product-card">
                                <div className="top">
                                <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                </div>
                                <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                    <img src="assets/img/products/prod18-1.png" alt="" className="img-contain" />
                                </a>
                                <div className="info">
                                    <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Oloxtralic Smart Inveter Washing Machine </a>
                                    <div className="stars fsz-13 mt-2">
                                       <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                        <span> (2) </span>
                                    </div>
                                    <p className="price mt-2 fsz-20"> $725.00 </p>
                                </div>
                                <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

                {/* <section className="tc-best-single-style1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="info wow fadeInUp slow" data-wow-delay="0.2s">
                            <small className="fsz-12 text-uppercase color-666 mb-10"> amazon award-winning speaker </small>
                            <h3 className="fsz-35 fw-bold"> Devialet Phantom <br /> II <span className="fw-300"> Speaker </span> </h3>
                            <div className="price mt-40">
                                <small className="fsz-10 color-666 text-uppercase me-4"> Starting at <br /> Price </small>
                                <span className="fsz-26 color-green1 lh-1"> $1,590 </span>
                            </div>
                            <div className="main-img th-280">
                                <img src={Prod21} alt="" className="img-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 wow fadeInUp slow" data-wow-delay="0.4s">
                        <div className="title mb-40">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <h3 className="fsz-30"> Best Selling Speakers </h3>
                                </div>
                                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                    <div className="arrows">
                                    <a href="#0" className="swiper-prev icon"> <FaChevronLeft /></a>    
                            <a href="#0" className="swiper-next icon"><FaChevronRight /></a> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="best-single-slider">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod22} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> B&O Beolit 20 Powerful Portable Wireless Bluetooth </a>
                                            <p className="price mt-2 fsz-20"> $159.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod23} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Marshall Stanmore II Wireless  Bluetooth Speaker </a>
                                            <div className="stars fsz-13 mt-2">
                                               <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (2) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $325.00 - $410.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod24} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-green1 text-white text-uppercase"> top  rated </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Bose SoundLink III Speaker </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (12) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $149.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

                {/* <section className="tc-best-seller-style1 wow fadeInUp slow" data-wow-delay="0.2s">
            <div className="container">
                <div className="title mb-40">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h3 className="fsz-30"> Just Landing </h3>
                        </div>
                        <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                            <a href="#" className="more-btn fsz-14 text-uppercase fw-500 view_all"> View All <RiGalleryView2 /></a>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-pills mb-40" id="pills-tabs2" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-tab20-tab" data-bs-toggle="pill" data-bs-target="#pills-tab5" type="button" role="tab" aria-selected="true">TV/Televisions</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab21-tab" data-bs-toggle="pill" data-bs-target="#pills-tab6" type="button" role="tab" aria-selected="false">PC Gaming</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab22-tab" data-bs-toggle="pill" data-bs-target="#pills-tab5" type="button" role="tab" aria-selected="false">Computers</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab23-tab" data-bs-toggle="pill" data-bs-target="#pills-tab6" type="button" role="tab" aria-selected="false">Cameras</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab25-tab" data-bs-toggle="pill" data-bs-target="#pills-tab6" type="button" role="tab" aria-selected="false">Gadgets</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab26-tab" data-bs-toggle="pill" data-bs-target="#pills-tab5" type="button" role="tab" aria-selected="false">Smart Home</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-tab27-tab" data-bs-toggle="pill" data-bs-target="#pills-tab6" type="button" role="tab" aria-selected="false">Sport Equipments</button>
                      </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-tab5" role="tabpanel" aria-labelledby="pills-tab5-tab">
                        <div className="products-slider">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod25} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> uClever Boost Cube Mini 12V Charge </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                                <span> (9) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $209.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod26} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Devialet PHantom II Wireless Speaker 108db </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (4) </span>
                                            </div>
                                            <p className="price color-red1 mt-2 fsz-20"> $1,589.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod27} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> TOSHIRO Smart Inveter 12L Washing Machine </a>
                                            <p className="price mt-2 fsz-20"> $1,029.50 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod28} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> TORO Smart Self Balancing Transporter Scooter </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (2) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $1,512.90 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod29} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-green1 text-white text-uppercase"> top  rated </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Onyx HK Studio 2 Speaker </a>
                                            <div className="stars fsz-13 mt-2">
                                               <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (12) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $205.00 - $410.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod8} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Shorp 49” ClassName FHD (1080p) Android Led TV </a>
                                            <p className="price mt-2 fsz-20"> $3,029.50 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-controls">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-tab6" role="tabpanel" aria-labelledby="pills-tab6-tab">
                        <div className="products-slider">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod3} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Durotan Manual Espresso Machine, Coffe Maker </a>
                                            <div className="stars fsz-13 mt-2">
                                               <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (34) </span>
                                            </div>
                                            <p className="price color-red1 mt-2 fsz-20"> $489.00 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $619.00 </span> </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/>Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod7} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Conar DSLR Camera EOS II, Only Body </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar />
                                                <span> (5) </span>
                                            </div>
                                            <p className="price color-red1 mt-2 fsz-20"> $579.00 <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $819.00 </span> </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod8} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Shorp 49” ClassName FHD (1080p) Android Led TV </a>
                                            <p className="price mt-2 fsz-20"> $3,029.50 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod9} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Gigabyte PC Gaming Case, Core i7, 32GB Ram </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (2) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $1,279.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"> <MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                            <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                            <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod10} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-green1 text-white text-uppercase"> top  rated </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Sceptre 32” Internet TV </a>
                                            <div className="stars fsz-13 mt-2">
                                                <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                                <span> (12) </span>
                                            </div>
                                            <p className="price mt-2 fsz-20"> $610.00 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="product-card">
                                        <div className="top">
                                        <div className="icons">
                                        <a href="#0" className="icon fav active"><FaRegHeart /></a>
                                        <a href="#0" className="icon"><IoSync /></a>
                                        <a href="assets/img/products/prod1-1.png" className="icon" data-fancybox="deal"><FaEye /></a>
                                    </div>
                                        </div>
                                        <a href="../inner_pages/single_product.html" className="img th-160 mb-20 d-block">
                                            <img src={Prod8} alt="" className="img-contain" />
                                        </a>
                                        <div className="info">
                                            <div className="tags">
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-cyan1 text-white text-uppercase"> new </span>
                                                <span className="label fsz-11 py-1 px-3 rounded-pill bg-blue1 text-white text-uppercase"> best seller </span>
                                            </div>
                                            <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Shorp 49” Class FHD (1080p) Android Led TV </a>
                                            <p className="price mt-2 fsz-20"> $3,029.50 </p>
                                        </div>
                                        <a href="#0" className="cart-btn addCart"><MdOutlineAddShoppingCart className="me-1"/> Add To Cart </a>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-controls">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </div>
                    </div>
                  </div>
            </div>
        </section> */}

                {/* <section className="tc-testimonials-style1 pb-60">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6">
                          <div className="advc-card card-gray overflow-hidden wow fadeInUp slow" data-wow-delay="0.2s">
                              <div className="title mb-40">
                                  <div className="row align-items-center">
                                      <div className="col-lg-8">
                                          <h3 className="fsz-30"> Just Landing </h3>
                                      </div>
                                      <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                          <a href="#" className="more-btn fsz-14 text-uppercase fw-500 view_all"> View All <RiGalleryView2 /></a>
                                      </div>
                                  </div>
                              </div>
                              <div className="blog-slider">
                                  <div className="swiper-wrapper">
                                      <div className="swiper-slide">
                                          <div className="advc-item">
                                              <div className="img">
                                                  <img src={Blog1} alt="" className="img-cover" />
                                              </div>
                                              <div className="info">
                                                  <h6> <a href="#" className="fsz-18 fw-bold hover-blue1"> How to choose size of Television fit to your living room </a> </h6>
                                                  <small className="fsz-12 color-666 float-text"> 45 Minutes ago in <a href="#" className="color-000 text-uppercase"> Experience </a> </small>
                                              </div>
                                          </div>
                                          <div className="advc-item">
                                              <div className="img">
                                                  <img src={Blog2} alt="" className="img-cover" />
                                              </div>
                                              <div className="info">
                                                  <h6> <a href="#" className="fsz-18 fw-bold hover-blue1"> Introduce New Generation of Eluxtro Washing Machine 2023 </a> </h6>
                                                  <small className="fsz-12 color-666 float-text"> 2 Days ago in <a href="#" className="color-000 text-uppercase"> Technology </a> </small>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="swiper-button-next"></div>
                                  <div className="swiper-button-prev"></div>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="testimonials-box card-gray overflow-hidden wow fadeInUp slow" data-wow-delay="0.4s">
                              <div className="title mb-40">
                                  <div className="row align-items-center">
                                      <div className="col-lg-8">
                                          <h3 className="fsz-30"> Best Selling Speakers </h3>
                                      </div>
                                      <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                          <div className="arrows">
                                          <a href="#0" className="swiper-prev icon"> <FaChevronLeft /></a>    
                            <a href="#0" className="swiper-next icon"><FaChevronRight /></a> 
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="testi-card">
                                  <div className="rate mb-20">
                                      <div className="stars">
                                          <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                    <FaRegStar className="active" />
                                      </div>
                                      <h6 className="fsz-18 fw-bold"> Fast shipping and flexiable price! </h6>
                                  </div>
                                  <div className="text fsz-14 mb-50">
                                      I used to have experience shopping on much platform as Amozon, Eboy, Esto, etc. And see that Swoo Market really great. It’ll be my 1st choice for any shopping experience. Competitive price, fast shipping and support 24/7. Extremely recommended!
                                  </div>
                                  <div className="btm-items">
                                      <div className="user-info">
                                          <div className="img">
                                              <img src={User} alt="" />
                                              <span className="icon"> <i className="fas fa-check"></i> </span>
                                          </div>
                                          <div className="inf">
                                              <h6 className="fsz-18 fw-bold"> Drake N. <small className="fsz-10 color-green1 ms-1 text-uppercase"> Verified Buyer </small> </h6>
                                              <p className="fsz-12 color-666"> Brooklyn, Los Angeles </p>
                                          </div>
                                      </div>
                                      <a href="#" className="text-capitalize color-blue1 text-decoration-underline fsz-11 fw-600"> Marshall Standmore Speaker / Black </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        </section> */}

                {/* <section className="tc-subscribe-style1">
              <div className="container">
                  <div className="row align-items-center justify-content-between">
                      <div className="col-lg-6">
                          <h3 className="fsz-30 fw-400"> <strong className="fw-700"> Subscribe </strong> & Get <span className="color-cyan1"> 10% OFF </span> for first order </h3>
                      </div>
                      <div className="col-lg-4 mt-4 mt-lg-0">
                          <div className="form-group">
                              <span className="icon"><FaRegEnvelope /></span>
                              <input type="text" placeholder="Enter your email address" />
                              <button> Subscibe </button>
                          </div>
                      </div>
                  </div>
              </div>
              <img src="assets/img/plane-1.png" alt="" className="plane" />
          </section> */}
            </main>
        </Fragment>
    );
};

export default Home;
