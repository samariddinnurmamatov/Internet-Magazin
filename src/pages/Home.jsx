import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ContentLoader from "react-content-loader"

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
import { apiDeleteFavourites, apiGetBasket, apiGetBrands, apiGetBanner, apiGetCategory, apiGetCategoryOfProduct, apiGetFavourites, apiGetProducts, apiPostBasket, apiPostFavourites, apiUpdateBasket } from "../services/HomeService";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { session } from "../services/session";
import ProductCard from "../components/productcard";



const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState([]);
    const [categoryOfProduct, setCategoryOfProduct] = useState([]);
    const [banner, setBanner] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [isToken, setIsToken] = useState(false);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef(null);



    useEffect(() => {
        const token = session.get("token");
        setIsToken(!!token)

        const fetchData = async () => {
            try {
                const [categoryData, productData, brandData, categoryProduct, banner] = await Promise.all([
                    apiGetCategory(),
                    apiGetProducts(),
                    apiGetBrands(),
                    apiGetCategoryOfProduct(1),
                    apiGetBanner()
                ]);

                if (categoryData.success) setCategories(categoryData.data);
                if (productData.success) setProducts(productData.data);
                if (brandData.success) setBrands(brandData.data);
                if (categoryProduct.success) setCategoryOfProduct(categoryProduct.data);
                if (banner.success) setBanner(banner.data);

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

                const likes = session.get("like");
                if (likes) setFavorites(likes.map(fav => fav));

            }
        };

        fetchFavoritesBasket();
    }, []);
    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                setIsOverflowing(containerRef.current.scrollWidth > containerRef.current.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
    }, []);



    const fetchProductData = async (categoryid) => {

        try {
            const productData = await apiGetCategoryOfProduct(categoryid);
            if (productData.success) setCategoryOfProduct(productData.data);
            return productData.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const handleLike = async (productId) => {
        try {
            if (isToken) {
                await apiPostFavourites({ product_id: productId });
                // Check if productId is already in favorites to avoid duplicates
                setFavorites(prevFavorites => {
                    if (prevFavorites.includes(productId)) return prevFavorites;
                    return [...prevFavorites, productId];
                });
            } else {
                session.add("like", productId);
                // Check if productId is already in favorites to avoid duplicates
                setFavorites(prevFavorites => {
                    if (prevFavorites.includes(productId)) return prevFavorites;
                    return [...prevFavorites, productId];
                });
            }
        } catch (error) {
            console.error('Error liking product:', error);
            // Optional: provide user feedback
        }
    };


    const handleUnlike = async (productId) => {
        try {
            if (isToken) {

            }
            session.remove("like", productId);

            setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));
            toast.success('Product unliked');

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


    return (
        <Fragment>
            <main style={{ height: "auto", marginBottom: "50px" }}>
                <section className="tc-header-style1 mt-4">
                    <div className="container">
                        <div className="content">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main-slider rounded-3xl">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide w-full">
                                                <div className="slide-card">
                                                    <div className="img th-450">
                                                        <img src={Head11} alt="" className="w-full" />
                                                    </div>
                                                    <div className="info text-white">
                                                        <div className="cont">
                                                            <h2 className="fsz-35 fw-200"> EKO 40 <br /> Android TV </h2>
                                                            <p className="fsz-12 mt-15 text-uppercase"> Smart Full HD Android TV  with Google Assistant  </p>
                                                            <div className="butn px-5 py-3 bg-blue1 text-white rounded-pill mt-60 fw-600"> <span> Shop Now </span> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide w-full ">
                                                <div className="slide-card">
                                                    <div className="img th-450">
                                                        <img src={Head11} alt="" className="w-full" />
                                                    </div>
                                                    <div className="info text-white">
                                                        <div className="cont">
                                                            <h2 className="fsz-35 fw-200"> EKO 40 <br /> Android TV </h2>
                                                            <p className="fsz-12 mt-15 text-uppercase"> Smart Full HD Android TV  with Google Assistant  </p>
                                                            <div className="butn px-5 py-3 bg-blue1 text-white rounded-pill mt-60 fw-600"> <span> Shop Now </span> </div>
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

                                {
                                    banner.length > 0 ?
                                        banner.length((prod) => (

                                            <div className="col-lg-6">
                                                <div className="card-overlay wow fadeInUp slow" data-wow-delay="0.2s">
                                                    <div className="img th-230">
                                                        <img src={prod.image} alt="" className="img-cover" />
                                                    </div>
                                                    <div className="info color-000 p-30">
                                                        <div className="cont">
                                                            <h3 className="fsz-30"> {prod.category.name_uz} </h3>
                                                        </div>
                                                        <Link to={`/category/${prod.category.id}`} className="butn px-4 py-2 bg-dark text-white rounded-pill fw-600 fsz-12 mt-30"> <span> Show category </span> </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                        <div className="row  d-flex justify-around mb-2">
                                            <div className="col-lg-6 mb-3">
                                                <ContentLoader
                                                    speed={2}
                                                    width="100%"
                                                    height={220}
                                                    // viewBox="0 0 100 220"
                                                    backgroundColor="#c2c2c2"
                                                    foregroundColor="#d9d9d9"
                                                    className="w-full"
                                                >

                                                    <rect x="48" y="8" rx="3" ry="3" width="100%" height="220" />
                                                </ContentLoader>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <ContentLoader
                                                    speed={2}
                                                    width="100%"
                                                    height={220}
                                                    // viewBox="0 0 100 220"
                                                    backgroundColor="#c2c2c2"
                                                    foregroundColor="#d9d9d9"
                                                    className="w-full"
                                                >

                                                    <rect x="48" y="8" rx="3" ry="3" width="100%" height="220" />
                                                </ContentLoader>
                                            </div>

                                        </div>

                                }



                                {/* <div className="col-lg-6">
                                    <div className="card-overlay wow fadeInUp slow" data-wow-delay="0.2s">
                                        <div className="img th-230">
                                            <img src={Head3} alt="" className="img-cover" />
                                        </div>
                                        <div className="info color-000 p-30">
                                            <div className="cont">
                                                <h3 className="fsz-30"> iPad mini <br /> 2022 </h3>
                                                <p className="fsz-13 mt-1 color-666"> Mega Power in mini size  </p>
                                            </div>
                                            <div className="butn px-4 py-2 bg-dark text-white rounded-pill fw-600 fsz-12 mt-30"> <span> Shop Now </span> </div>
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
                            </div>
                        </div>
                        <div className="cat-content">
                            {categories.length > 0 ?

                                categories.map(category => (
                                    <Link key={category.id} to={`/category/${category.id}`} className="cat-card">
                                        <div className="img">
                                            <img src={category.image} alt={category.name_uz} />
                                        </div>
                                        <p className="fsz-13 fw-bold mt-15">{category.name_uz}</p>
                                    </Link>
                                ))
                                :
                                <div
                                    ref={containerRef}
                                    className="flex overflow-hidden gap-2 ps-5"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <Link
                                            key={index}
                                            to={`/`}
                                            className={`cat-card d-flex flex-col items-center w-24 ${isOverflowing ? 'hidden' : ''}`}
                                            style={{ display: isOverflowing ? 'none' : 'flex' }}
                                        >
                                            <ContentLoader
                                                speed={2}
                                                width={110}
                                                height={130}
                                                // viewBox="0 0 40 160"
                                                backgroundColor="#c2c2c2"
                                                foregroundColor="#d9d9d9"
                                            >
                                                <circle cx="50" cy="50" r="50" />
                                                <rect x="0" y="110" rx="3" ry="3" width="100" height="10" />

                                            </ContentLoader>
                                        </Link>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </section>

                <section className="tc-weekly-deals-style1 wow fadeInUp slow" data-wow-delay="0.2s">
                    <div className="container">
                        <div className="content">
                            <div className="title mb-40">
                                <h3 className="fsz-30 me-lg-5"> Best Weekly Deals </h3>

                            </div>
                            <div className="deals-cards ">
                                {products.length > 0 ?

                                    products.map((product) => (

                                        <ProductCard product={product} />
                                        // <a href={`/single_product/${product.id}`} className="column-sm" key={product.id}>
                                        //     <div className="deal-card">
                                        //         <div className="top">
                                        //             <div className="icons">
                                        //                 <div
                                        //                     className={`icon fav ${isFavorite(product.id) ? 'liked' : ''}`}
                                        //                     onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)}
                                        //                 >
                                        //                     {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                                        //                 </div>
                                        //                 <Link href="/" className="icon"><IoSync /></Link>
                                        //                 <a href={product.image} className="icon" data-fancybox="deal"><FaEye /></a>
                                        //             </div>
                                        //         </div>
                                        //         <div className="img th-140 mb-20 d-block">
                                        //             <img src={product.image} alt="" className="img-contain" />
                                        //         </div>
                                        //         <div className="info">
                                        //             <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                        //             <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> {product.name_uz} </a>

                                        //             <p className="price color-red1 mt-2 fsz-20"> ${product.price}  </p>
                                        //             <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $619.00 </span>
                                        //             <div className="progress mt-20">
                                        //                 <div className="progress-bar bg-blue1" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        //             </div>
                                        //             <p className="fsz-12 mt-3"> Sold: 24 / 80 </p>
                                        //         </div>
                                        //         <a href="#0" className="cart-btn addCart" onClick={() => {

                                        //             isToken ?
                                        //                 handleAddToBasket(product.id)
                                        //                 :
                                        //                 session.add("products", product.id);
                                        //             toast.success('Product added to basket!');


                                        //         }}
                                        //         >
                                        //             <MdOutlineAddShoppingCart className="me-1" />Add To Cart
                                        //         </a>
                                        //     </div>
                                        // </a>
                                    )) :
                                    <div
                                        ref={containerRef}
                                        className="flex overflow-hidden gap-2 ps-5"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index}
                                                style={{ display: isOverflowing ? 'none' : 'flex' }}
                                                className={` ${isOverflowing ? 'hidden' : ''}`} >
                                                <ContentLoader
                                                    speed={2}
                                                    width={230}
                                                    height={320}
                                                    // viewBox="0 0 280 160"
                                                    backgroundColor="#c2c2c2"
                                                    foregroundColor="#d9d9d9"
                                                >
                                                    <rect x="0" y="0" rx="0" ry="0" width="230" height="320" />

                                                </ContentLoader>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>

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
                            </div>
                        </div>

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

                                        {categoryOfProduct.length > 0 ?
                                            categoryOfProduct.length > 0 && categoryOfProduct.map((product) => (
                                                <div className="swiper-slide" key={product.id}>
                                                    <div className="column-sm" >
                                                        <div className="product-card">
                                                            <div className="top">
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
                                                            <div className="img th-140 mb-20 d-block">
                                                                <img src={product.image} alt="" className="img-contain" />
                                                            </div>
                                                            <div className="info ">
                                                                {
                                                                    product.discount && <div className="">
                                                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase">
                                                                            {product.percentege.sum ? `-${product.percentege.sum}` : `${product.discount.percentage}% OFF`}
                                                                        </span>
                                                                    </div>
                                                                }
                                                                <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> {product.name_uz} </a>
                                                                {
                                                                    product.discount &&
                                                                    <div className="title fsz-14 mt-15 fw-600"> {product.discount.name} </div>
                                                                }
                                                                <p className="price color-red1 mt-2 fsz-20"> ${product.discounted_price && product.price} <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> {!product.discounted_price} </span> </p>
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
                                            ))
                                            :
                                            <div
                                                ref={containerRef}
                                                className="flex overflow-hidden gap-2 ps-5"
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <div key={index}
                                                        style={{ display: isOverflowing ? 'none' : 'flex' }}
                                                        className={` ${isOverflowing ? 'hidden' : ''}`} >
                                                        <ContentLoader
                                                            speed={2}
                                                            width={230}
                                                            height={320}
                                                            // viewBox="0 0 280 160"
                                                            backgroundColor="#c2c2c2"
                                                            foregroundColor="#d9d9d9"
                                                        >
                                                            <rect x="0" y="0" rx="0" ry="0" width="230" height="320" />

                                                        </ContentLoader>
                                                    </div>
                                                ))}
                                            </div>}
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
                                </div>
                            </div>
                            <div className="pupolar-slider">
                                <div className="swiper-wrapper">
                                    {brands.length > 0 ?
                                        brands.map(brand => (
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                        <div
                                            ref={containerRef}
                                            className="flex overflow-hidden gap-5 ps-5"
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <div key={index}
                                                    style={{ display: isOverflowing ? 'none' : 'flex' }}
                                                    className={` ${isOverflowing ? 'hidden' : ''}`} >
                                                        <ContentLoader
                                                    speed={2}
                                                    width={224}
                                                    height={192}
                                                    // viewBox="0 0 280 160"
                                                    backgroundColor="#c2c2c2"
                                                    foregroundColor="#d9d9d9"
                                                >
                                                    <rect x="0" y="0" rx="0" ry="0" width="224" height="192" />

                                                </ContentLoader>
                                                    </div>
                                            ))}
                                        </div>}
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
                            {categories.length > 0 ? categories.map(category => (

                                <Link to={`/category/${category.id}`} className="link"> {category.name_uz} </Link>
                            )) :
                                <div
                                    ref={containerRef}
                                    className="flex overflow-hidden gap-2 ps-5"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div key={index}
                                            style={{ display: isOverflowing ? 'none' : 'flex' }}
                                            className={` ${isOverflowing ? 'hidden' : ''}`} >
                                                <ContentLoader
                                                    speed={2}
                                                    width={100}
                                                    height={30}
                                                    // viewBox="0 0 280 160"
                                                    backgroundColor="#c2c2c2"
                                                    foregroundColor="#d9d9d9"
                                                >
                                                    <rect x="0" y="0" rx="0" ry="0" width="100" height="30" />

                                                </ContentLoader>
                                            </div>
                                    ))}
                                </div>
                            }

                        </div>
                    </div>
                </section>



            </main>
        </Fragment>
    );
};

export default Home;
