import { Fragment, useEffect, useState, useMemo } from "react";
import Container from "../../components/shared/Container";
import Prod1 from "../../assets/common/img/products/prod1.png"
import Prod2 from "../../assets/common/img/products/prod2.png"
import Prod3 from "../../assets/common/img/products/prod3.png"
import Prod4 from "../../assets/common/img/products/prod4.png"
import Prod5 from "../../assets/common/img/products/prod5.png"
import Prod6 from "../../assets/common/img/products/prod6.png"
import Prod7 from "../../assets/common/img/products/prod7.png"

import Ban1 from "../../assets/common/img/pup_1.png"
import Ban2 from "../../assets/common/img/pup_3.png"

import Det1 from "../../assets/common/img/det1.jpeg"
import Det2 from "../../assets/common/img/det2.png"
import Det3 from "../../assets/common/img/det3.png"
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoSync } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaRegStarHalf } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { apiGetSingleProduct, apiPostBasket, apiUpdateBasket, apiPostFavourites, apiGetFavourites, apiGetProducts } from "../../services/HomeService";
import { toast } from "react-toastify";
import { session } from "../../services/session";



const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [basket, setBasket] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [count, setCount] = useState(1);
    const [isToken, setIsToken] = useState(false);
    const [products, setProducts] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const token = session.get("token");
            setIsToken(!!token);

            try {
                const singleProduct = await apiGetSingleProduct(id);
                if (singleProduct) setProduct(singleProduct.data);
                else console.error('Invalid single data structure:', singleProduct);
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

        const fetchData = async () => {
            try {
                const productData = await apiGetProducts()


                if (productData.success) setProducts(productData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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

    const handleLike = async (productId) => {
        try {
            session.add("like", productId);
            setFavorites(prevFavorites => [...prevFavorites, productId]);

            toast.success('Product liked');

            await apiPostFavourites({ product_id: productId });
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const handleUnlike = async (productId) => {
        try {
            session.remove("like", productId);

            setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));
            toast.success('Product unliked');

            await apiDeleteFavourites(productId);
        } catch (error) {
            console.error('Error unliking product:', error);
        }
    };

    const isFavorite = useMemo(() => (productId) => favorites.includes(productId), [favorites]);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleQuantityChange = async (productId, change) => {
        setBasket((prevBasket) =>
            prevBasket.map((item) =>
                item.id === productId
                    ? { ...item, data: { ...item.data, quantity: Math.max((item.data.quantity || 1) + change, 1) } }
                    : item
            )
        );

        // try {
        //   await apiUpdateBasket({
        //     product_id: productId,
        //     quantity: change,
        //   });
        // } catch (error) {
        //   console.error('Error updating quantity:', error);
        // }
    };


    return (
        <Fragment>
            <main className=" home-style3 py-3 sin-prod-pg-1">
                <Container>

                    <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb fw-bold mb-0">
                                <Link to="/" className="breadcrumb-item color-999">Home</Link>
                                <li className="breadcrumb-item active color-000" aria-current="page">{product.name_uz}</li>
                            </ol>
                        </nav>
                    </section>

                    <section className="product-main-details p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="img-slider">
                                    <div className="top-title">
                                        <small className="">  </small>
                                        <div className="icons">
                                            <span className="icon icon-plus"><FaPlus /></span>
                                            <div className="collapse-icons">
                                                <a href="#" className="icon icon-plus"><IoSync /></a>
                                                <span onClick={() => handleAddToBasket(product.id)} className="icon icon-plus"><FaCartShopping /></span>
                                                <span onClick={(e) => {
                                                    e.stopPropagation()
                                                    isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)
                                                }}
                                                    className="icon icon-plus fav-btn">{isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-container gallery-top  swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                                        <div className="swiper-wrapper d-flex justify-between" id="swiper-wrapper-b9daa792d61038498" aria-live="polite" style={{ transform: "translate3d(0px, 0px, 0px);" }}>
                                            <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style={{ width: "524px", marginRight: "10px;" }}>
                                                <div className="img">
                                                    <img src={product.image} alt="" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide swiper-slide-next" role="group" aria-label="2 / 3" style={{ width: "524px", marginRight: "10px" }}>
                                                <div className="img">
                                                    <img src={Prod2} alt="" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide" role="group" aria-label="3 / 3" style={{ width: "524px", marginRight: "10px" }}>
                                                <div className="img">
                                                    <img src={Prod2} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                    <div className="swiper-container gallery-thumbs swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode swiper-backface-hidden swiper-thumbs">
                                        <div className="swiper-wrapper d-flex justify-between items-center" id="swiper-wrapper-3e1c254e0469723c" aria-live="polite" style={{ transform: "translate3d(0px, 0px, 0px)" }}>
                                            <div className="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active" role="group" aria-label="1 / 3" style={{ width: "88.8px", marginRight: "20px" }}>
                                                <div className="img">
                                                    <img src={product.image} alt="" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide swiper-slide-visible swiper-slide-next" role="group" aria-label="2 / 3" style={{ width: "88.8px", marginRight: "20px" }}>
                                                <div className="img">
                                                    <img src={Prod2} alt="" />
                                                </div>
                                            </div>
                                            <div className="swiper-slide swiper-slide-visible" role="group" aria-label="3 / 3" style={{ width: "88.8px", marginRight: "20px" }}>
                                                <div className="img">
                                                    <img src={Prod3} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="info">

                                    <h4 className="product_title">
                                        <a href="#"> {product.name_uz}  </a>
                                    </h4>
                                    <div className="price mt-20">
                                        <h3 className="fsz-22 fw-600"> ${product.price} </h3>
                                    </div>
                                    <ul className="fsz-12 mt-15 lh-5">
                                        <li> <span className="icon-6 bg-666 rounded-circle me-2"></span> {product.description_uz} </li>
                                    </ul>
                                    <div className="meta pb-20">
                                        <a href="#" className="meta-item color-green2"> {product.status} <span className="bg bg-green2"></span> </a>
                                    </div>

                                    <p className="color-666"> <strong className="color-000 text-uppercase me-1"> Category: </strong> <span> Cell Phones &amp; Tablets </span> </p>
                                    <p className="color-666"> <strong className="color-000 text-uppercase me-1"> Brand: </strong> <span className="color-green2"> {product.brand} </span> </p>
                                    <div className="social-icons mt-20">
                                        <a href="#"><FaFacebookF /> </a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaYoutube /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="payment-side">
                                    <div className="payment-card">
                                        <small className="fsz-12 color-666 text-uppercase mb-2"> Total Price: </small>
                                        <h5 className="fsz-30 fw-bold"> ${product.price} </h5>
                                        <div className="affirm fsz-12 lh-1 d-flex align-items-end py-3 border-bottom">
                                        </div>
                                        <p className="fsz-12 mt-3"><FaCheckCircle className="color-green2 me-1" />In stock </p>
                                        <div className="add-more">
                                            <button
                                                className="qt-minus text-xl"
                                                onClick={() => {
                                                    handleDecrement()
                                                    handleQuantityChange(item.id, -1)
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="qt border-0"
                                                value={count}
                                                readOnly
                                            />
                                            <button
                                                className="qt-plus text-xl"
                                                onClick={() => {
                                                    handleIncrement()
                                                    handleQuantityChange(item.id, 1)
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <a href="#" className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center justify-center mt-10 w-100 py-3" onClick={() => {
                                            isToken ?
                                                handleAddToBasket(product.id)
                                                :
                                                session.add("products", product.id);
                                            toast.success('Product added to basket!');

                                        }}> <span> Add To Cart </span> </a>

                                        <div className="d-flex color-666 fsz-13 py-3 border-bottom">
                                            <a href="#" onClick={(e) => {
                                                e.stopPropagation();
                                                isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)
                                            }} className="me-4 pe-4 border-end d-flex items-center gap-2">{isFavorite(product.id) ? <FaHeart className="color-green2 me-1 display" /> : <FaRegHeart />} Wishlist added </a>
                                            <a href="#" className="d-flex items-center gap-2"><FaRedoAlt className="me-1 display" />Compare </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="product-text-details p-30 radius-4 bg-white mt-3 wow fadeInUp mb-3" style={{ visibility: "hidden", animationName: "none" }}>
                        <ul className="nav nav-pills mb-50" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#pills-tab1">description</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-tab3-tab" data-bs-toggle="pill" data-bs-target="#pills-tab3">reviews (5)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-tab4-tab" data-bs-toggle="pill" data-bs-target="#pills-tab4">additional information</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-tab1">
                                <div className="tab-description">
                                    <div className="text mb-30">
                                        Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S2 goes anywhere you go. Photos, movies and documents pop on a crisp, clear Super AMOLED display. Expandable memory lets you enjoy more of your favorite content. And connecting and sharing between all your Samsung devices is easier than ever. Welcome to life with the reimagined Samsung Galaxy Tab S2. Watch thev world come to life on your tablets <strong> Super AMOLED display * </strong> . With deep contrast, rich colors and crisp details, you wont miss a thing
                                    </div>
                                    <div className="img th-400">
                                        <img src={Det1} alt="" className="img-cover radius-5" />
                                    </div>
                                    <p className="fsz-13 fst-italic text-center color-777 mt-3"> * The Galaxy Tab S2’s 4 : 3 ratio display provides you with an ideal environment for performing office tasks.  </p>
                                    <h6 className="fsz-18 fw-bold mt-30"> From the manufacturer </h6>
                                    <p className="color-555 mt-10">
                                        Dive into the blockbuster movies you cant wait to see. Switch between your favorite apps quickly and easily. The new and improved octa-core processor gives you the power and speed  you need to see more and do more. Expand your tablets memory from 32GB to up to an additional 128GB and enjoy more of your favorite music, photos, movies and games on the go with  a microSD card. With Quick Connect, start a show on your Smart TV and, with the touch of a button, take it with you by moving it to your Galaxy Tab S2.
                                    </p>
                                    <p className="color-555 mt-15">
                                        Or send videos and photos from your tablet <a href="#" className="color-blue1"> screen to your TV </a> screen to share with everyone in the room. Work effortlessly between your Samsung tablet and Samsung smartphone  with SideSync. Quickly drag and drop photos between devices. And even respond to a call from your smartphone right on your tablet screen.
                                    </p>
                                    <div className="imgs">
                                        <div className="row gx-2">
                                            <div className="col-lg-6">
                                                <div className="img th-450 mt-30">
                                                    <img src={Det2} alt="" className="img-cover radius-5" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="img th-450 mt-30">
                                                    <img src={Det3} alt="" className="img-cover radius-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="fsz-18 fw-bold mt-30"> Semsong Galaxy Tab S2, 8-Inch, White </h6>
                                    <div className="more-text">
                                        <div className="text fsz-14 mt-20">
                                            The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus and a 2.1-megapixel camera on the front. Take high-quality pictures and video or video  chat with friends, family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. The Samsung Galaxy Essentials widget provides a collection of premium  complimentary apps optimized for your tablet screen. Select and download the apps you want to instantly upgrade your tablet experience.
                                        </div>
                                        <div className="text fsz-14 mt-20">
                                            The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus and a 2.1-megapixel camera on the front. Take high-quality pictures and video or video  chat with friends, family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. The Samsung Galaxy Essentials widget provides a collection of premium  complimentary apps optimized for your tablet screen. Select and download the apps you want to instantly upgrade your tablet experience.
                                        </div>
                                        <div className="text fsz-14 mt-20">
                                            The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus and a 2.1-megapixel camera on the front. Take high-quality pictures and video or video  chat with friends, family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. The Samsung Galaxy Essentials widget provides a collection of premium  complimentary apps optimized for your tablet screen. Select and download the apps you want to instantly upgrade your tablet experience.
                                        </div>
                                        <div className="text fsz-14 mt-20">
                                            The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus and a 2.1-megapixel camera on the front. Take high-quality pictures and video or video  chat with friends, family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. The Samsung Galaxy Essentials widget provides a collection of premium  complimentary apps optimized for your tablet screen. Select and download the apps you want to instantly upgrade your tablet experience.
                                        </div>
                                        <div className="overlay"></div>
                                        <a href="#0" className="more-btn text-primary text-uppercase fsz-13 display"> show more<FaAngleDown className="ms-1" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-tab3">
                                <div className="product-reviews p-4 radius-5 bg-light">
                                    <div className="row gx-5">
                                        <div className="col-lg-7">
                                            <div className="reviews-content pt-30">
                                                <h5 className="color-000 mb-40 text-capitalize"> 02 reviews </h5>
                                                <div className="comment-replay-cont py-5 px-4 mb-20 bg-white radius-5">
                                                    <div className="d-flex comment-cont">
                                                        <div className="icon-60 rounded-circle overflow-hidden me-3 flex-shrink-0">
                                                            <img src="assets/img/team/2.jpeg" alt="" className="img-cover" />
                                                        </div>
                                                        <div className="inf">
                                                            <div className="title d-flex justify-content-between">
                                                                <h6 className="fw-bold">Robert Downey Jr</h6>
                                                                <div className="time  text-uppercase d-inline-block">
                                                                    <div className="rate">
                                                                        <div className="stars">
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text color-000  mt-10">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Atume nusaate staman utra phone limo sumeria
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-replay-cont py-5 px-4 mb-20 bg-white radius-5">
                                                    <div className="d-flex comment-cont">
                                                        <div className="icon-60 rounded-circle overflow-hidden me-3 flex-shrink-0">
                                                            <img src="assets/img/team/4.jpeg" alt="" className="img-cover" />
                                                        </div>
                                                        <div className="inf">
                                                            <div className="title d-flex justify-content-between">
                                                                <h6 className="fw-bold">Ben Chiwell</h6>
                                                                <div className="time  text-uppercase">
                                                                    <div className="rate">
                                                                        <div className="stars">
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar className="active" />
                                                                            <FaRegStar />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text color-000  mt-10">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Atume nusaate staman utra phone limo sumeria
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <form className="comment-form d-block pt-30">
                                                <h5 className="color-000 mb-40 text-capitalize"> Add a review </h5>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label className="text-uppercase mb-1">
                                                            your rating
                                                        </label>
                                                        <div className="rate-stars">
                                                            <input type="radio" name="star" value="5" />
                                                            <input type="radio" name="star" value="4" />
                                                            <input type="radio" name="star" value="3" />
                                                            <input type="radio" name="star" value="2" />
                                                            <input type="radio" name="star" value="1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-30">
                                                            <textarea className="form-control" rows="6" placeholder="Write your comment here"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group mb-4 mb-lg-0">
                                                            <input type="text" className="form-control" placeholder="Your Name *" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Your Email *" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-check mt-20">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                            <label className="form-check-label " >
                                                                Save my name &amp; email in this browser for next time I comment
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <a href="#" className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-30 w-100 py-3"> <span> Submit Comment </span> </a>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-tab4">
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <div className="additional-info">
                                            <ul>
                                                <li>
                                                    <strong>Weight</strong>
                                                    <span> 0.6 kg </span>
                                                </li>
                                                <li>
                                                    <strong>Dimensions</strong>
                                                    <span> 40 × 30 × 30 cm </span>
                                                </li>
                                                <li>
                                                    <strong>Color</strong>
                                                    <span> White, Black, Red </span>
                                                </li>
                                                <li>
                                                    <strong>Year</strong>
                                                    <span> 2021 </span>
                                                </li>
                                                <li>
                                                    <strong>Style</strong>
                                                    <span> ClassNameic, Modern </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="related-products p-30 radius-4 bg-white mt-3 wow fadeInUp mb-3" style={{ visibility: "hidden", animationName: "none" }}>
                        <h6 className="fsz-18 fw-bold text-uppercase"> related products </h6>
                        <div className="products-content">
                            <div className="products-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                                <div className="swiper-wrapper" id="swiper-wrapper-a0530a2e6781cfb0" aria-live="off" >
                                    {products.length > 0 ?
                                        products.map((product) => (

                                            <Link to={`/single_product/${product.id}`} className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 6" style={{ width: "236px" }}>
                                                <div className="product-card">
                                                    <div className="top-inf">
                                                        <div onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)} className="fav-btn d-grid place-items-center">{isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}</div>
                                                    </div>
                                                    <div className="img">
                                                        <img src={product.image} alt="" className="img-contain main-image" />
                                                    </div>
                                                    <div className="info">

                                                        <h6> <a href={`/single_product/${product.id}`} className="prod-title fsz-14 fw-bold mt-2 hover-green2"> {product.name_uz} </a> </h6>
                                                        <div className="price mt-15">
                                                            <h5 className="fsz-18 color-red1 fw-600"> {product.price} </h5>
                                                            <span className="old fsz-14 color-666 text-decoration-line-through"> $859.00 </span>
                                                        </div>
                                                        <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1" />{product.stock}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                        :
                                        <div className="">hello</div>

                                    }

                                </div>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                            <div className="swiper-button-next" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-a0530a2e6781cfb0" aria-disabled="false"></div>
                            <div className="swiper-button-prev swiper-button-disabled" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-a0530a2e6781cfb0" aria-disabled="true"></div>
                        </div>
                    </section>
                </Container>


            </main>
        </Fragment>
    );
};

export default SingleProduct;