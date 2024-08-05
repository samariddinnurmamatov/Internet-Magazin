import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { apiDeleteFavourites, apiGetBasket, apiGetCategory, apiGetCategoryId, apiGetFavourites, apiPostBasket, apiPostFavourites, apiUpdateBasket } from '../../services/HomeService';
import Container from '../../components/shared/Container';

import { IoSync } from 'react-icons/io5';
import { FaAngleRight, FaEye, FaHeart, FaRegHeart, FaRegStar } from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

import { toast } from 'react-toastify';
import "./category.css";
import { session } from '../../services/session';

const Category = () => {
    const { id } = useParams();
    const [categoryId, setCategoriesId] = useState([]);
    const [category, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState([]);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef(null);
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        const token = session.get("token");
        setIsToken(!!token)

        const fetchData = async () => {
            try {
                const [categoryData, categoryDataId] = await Promise.all([
                    apiGetCategory(),
                    apiGetCategoryId(id),
                ]);

                if (categoryData.success) setCategories(categoryData.data);
                if (categoryDataId.success) setCategoriesId(categoryDataId.data);
                
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



    const handleLike = async (productId) => {
        try {
            if (isToken) {
                await apiPostFavourites({ product_id: productId });
                // Check if productId is already in favorites to avoid duplicates
                setFavorites(prevFavorites => {
                    if (prevFavorites.includes(productId)) return prevFavorites;
                    toast.success('Product liked', {
                        position: "bottom-right"
                      });

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
            toast.success('Product unliked', {
                position: "bottom-right"
              });

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
                    toast.success('Product quantity updated in basket!', {
                        position: "bottom-right"
                      });
                } else {
                    console.error('Error updating basket:', updatedBasketItem);
                    toast.error('Error updating basket.', {
                        position: "bottom-right"
                      });
                }
            } else {
                const newBasketItem = await apiPostBasket({ product_id: productIdBasket, quantity: 1 });
                if (newBasketItem.success) {
                    setBasket(prevBasket => [...prevBasket, { product_id: productIdBasket, quantity: 1 }]);
                    // toast.success('Product added to basket!');
                } else {
                    console.error('Error adding to basket:', newBasketItem);
                    toast.error('Error adding to basket.', {
                        position: "bottom-right"
                      });
                }
            }
        } catch (error) {
            console.error('Error adding to basket:', error);
            toast.error('Error adding to basket.', {
                position: "bottom-right"
              });
        }
    };

    const isFavorite = useMemo(
        () => (productId) => favorites.includes(productId),
        [favorites]
    );

    function truncateDescription(description, limit) {
        const words = description.split(' ');
        if (words.length > limit) {
          return words.slice(0, limit).join(' ') + '...';
        }
        return description;
      }


    return (
        <Fragment>
            <main className='home-style3 sin-prod-pg-1' style={{ padding: "20px 0" }}>
                <Container>
                    <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb fw-bold mb-0">
                                <li className="breadcrumb-item color-999"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active color-000" aria-current="page">Top Cell Phones &amp; Tablets</li>
                            </ol>
                        </nav>
                    </section>


                    <section className="tc-header-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp">
                        <h6 className="fsz-18 fw-bold text-uppercase mb-30"> top cell phones &amp; tablets </h6>
                        <div className="row gx-2">
                            <div className="col-lg-7 mt-3 mt-lg-0">
                                <div className="sub-banner">
                                    <div className="img">
                                        <img src="https://media.istockphoto.com/id/1150125924/fr/photo/radar-de-vitesse-de-la-police-de-la-circulation-sur-un-poteau-dans-la-ville-sur-la-route.jpg?s=170667a&w=0&k=20&c=QXWwJiH3nPN-7rRXycnhHpb0qRfZ2pfY9SCOxwQlaX0=" alt="" className="img-cover" />
                                    </div>
                                    <div className="info">
                                        <div className="row">
                                            {/* <div className="col-7">
                                                <h6 className="fsz-24"> redmi note 12 Pro+ 5g </h6>
                                                <small className="fsz-12 color-666 mt-10"> Rise to the challenge </small>
                                            </div> */}
                                            {/* <div className="col-5 text-end">
                                                <a href="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/single_product.html" className="butn px-3 py-2 bg-000 text-white radius-4 fw-500 fsz-12 text-uppercase d-flex justify-center hover-bg-green2"> <span> Shop Now </span> </a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mt-3 mt-lg-0">
                                <div className="sub-banner">
                                    <div className="img">
                                        <img src="https://www.spot.uz/media/img/2018/12/dqPh3e15445075045887_l.jpg" alt="" className="img-cover" />
                                    </div>
                                    <div className="info">
                                        <div className="row">
                                            {/* <div className="col-7">
                                                <h6 className="fsz-24"> redmi note 12 Pro+ 5g </h6>
                                                <small className="fsz-12 color-666 mt-10"> Rise to the challenge </small>
                                            </div> */}
                                            {/* <div className="col-5 text-end">
                                                <a href="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/single_product.html" className="butn px-3 py-2 bg-000 text-white radius-4 fw-500 fsz-12 d-flex justify-center text-uppercase hover-bg-green2"> <span> Shop Now </span> </a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                    <section className="tc-categories-style6 p-30 radius-4 bg-white mt-3 " >
                        <h6 className="fsz-18 fw-bold text-uppercase mb-30"> popular categories </h6>

                        <div className="content">
                            {
                                category.length > 0 ?
                                    category.map((category) => (

                                        <Link key={category.id} to={`/category/${category.id}`} className="number-item">
                                            <div className="inf">
                                                <h6 className="fsz-14 fw-bold mb-0 sm-title"> {category.name_uz} </h6>
                                                <small className="fsz-12 color-666"> {category.stock} Items </small>
                                            </div>
                                            <div className="img">
                                                <img src={category.image} alt="" className="img-contain" />
                                            </div>
                                        </Link>
                                    )) :
                                    <div
                                        ref={containerRef}
                                        className="flex overflow-hidden gap-5 ps-5"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index}
                                                style={{ display: isOverflowing ? 'none' : 'flex' }}
                                                className={`h-24 border border-black rounded-lg w-56 bg-gray-200 ${isOverflowing ? 'hidden' : ''}`} ></div>
                                        ))}
                                    </div>}
                        </div>
                    </section>


                    <section className="tc-weekly-deals-style1 wow fadeInUp slow mt-3" data-wow-delay="0.2s">
                        <div className="content">
                            <div className="title mb-40">
                                <h3 className="fsz-30 me-lg-5"> Best Weekly Deals </h3>
                            </div>
                            {categoryId.length > 0 ? (
                                <div className="grid grid-cols-5 items-center gap-3">
                                    {categoryId.map((product) => (
                                        <div className="column-sm" key={product.id}>
                                            <Link to={`/single_product/${product.id}`} style={{ width: "100%" }}>
                                                <div className="deal-card">
                                                    <div className="top">
                                                        <div className="icons">
                                                            <a
                                                                href="#0"
                                                                className={`icon fav ${isFavorite(product.id) ? 'liked' : ''}`}
                                                                onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)}
                                                            >
                                                                {isFavorite(product.id) ? <FaHeart color='red' /> : <FaRegHeart />}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <a href={`/single_product/${product.id}`} className="img th-140 mb-20 d-block">
                                                        <img src={product.image} alt="" className="img-contain" />
                                                    </a>
                                                    <div className="info">
                                                        <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                                                        <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> {product.name_uz} </a>
                                                        <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> {truncateDescription(product.description_uz, 1)}  </a>
                                                        <p className="price color-red1 mt-2 fsz-20"> ${product.price} </p>
                                                        {product.discounted_price && (
                                                        <span className="old-price color-999 text-decoration-line-through fsz-16">
                                                            ${product.discounted_price}
                                                        </span>
                                                    )}
                                                    </div>
                                                    <a href="#0" className="cart-btn addCart" onClick={(e) => {
                                                        e.stopPropagation();
                                                        isToken ?
                                                            handleAddToBasket(product.id)
                                                            :
                                                            session.add("products", product.id);
                                                        toast.success('Product added to basket!', {
                                                            position: "bottom-right"
                                                          });
                                                    }}>
                                                        <MdOutlineAddShoppingCart className="me-1" />Add To Cart
                                                    </a>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    ref={containerRef}
                                    className="flex overflow-hidden gap-2 ps-5"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index}
                                            style={{ display: isOverflowing ? 'none' : 'flex' }}
                                            className={`h-72 border border-black rounded-lg w-56 bg-gray-200 ${isOverflowing ? 'hidden' : ''}`}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>



                </Container>

            </main>
        </Fragment>
    );
};

export default Category;