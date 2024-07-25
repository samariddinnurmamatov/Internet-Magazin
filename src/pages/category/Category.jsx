import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiDeleteFavourites, apiGetBasket, apiGetCategory, apiGetCategoryId, apiGetFavourites, apiPostBasket, apiPostFavourites, apiUpdateBasket } from '../../services/HomeService';
import "./category.css";
import Container from '../../components/shared/Container';
import { FaAngleRight, FaEye, FaHeart, FaRegHeart, FaRegStar } from 'react-icons/fa';
import { IoSync } from 'react-icons/io5';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';

const Category = () => {
    const { id } = useParams();
    const [categoryId, setCategoriesId] = useState([]);
    const [category, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
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
            }
        };

        fetchFavoritesBasket();
    }, []);


    const handleLike = async (productId) => {
        try {
            await apiPostFavourites({ product_id: productId });
            setFavorites(prevFavorites => [...prevFavorites, productId]);
            toast.success('Product liked!');
        } catch (error) {
            console.error('Error liking product:', error);
            toast.error('Error liking product.');
        }
    };

    const handleUnlike = async (productId) => {
        try {
            await apiDeleteFavourites(productId);
            setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));
            toast.success('Product unliked!');
        } catch (error) {
            console.error('Error unliking product:', error);
            toast.error('Error unliking product.');
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
                    toast.success('Product added to basket!');
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
            <main className='home-style3 sin-prod-pg-1' style={{padding: "20px 0"}}>
            <Container>
                <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp"}}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb fw-bold mb-0">
                          <li className="breadcrumb-item color-999"><a href="#">Home</a></li>
                          <li className="breadcrumb-item color-999"><a href="#">Shop</a></li>
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
                                        <img src="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/assets/img/banner1.png" alt="" className="img-cover"/>
                                    </div>
                                    <div className="info">
                                        <div className="row">
                                            <div className="col-7">
                                                <h6 className="fsz-24"> redmi note 12 Pro+ 5g </h6>
                                                <small className="fsz-12 color-666 mt-10"> Rise to the challenge </small>
                                            </div>
                                            <div className="col-5 text-end">
                                                <a href="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/single_product.html" className="butn px-3 py-2 bg-000 text-white radius-4 fw-500 fsz-12 text-uppercase hover-bg-green2"> <span> Shop Now </span> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mt-3 mt-lg-0">
                                <div className="sub-banner">
                                    <div className="img">
                                        <img src="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/assets/img/banner1.png" alt="" className="img-cover"/>
                                    </div>
                                    <div className="info">
                                        <div className="row">
                                            <div className="col-7">
                                                <h6 className="fsz-24"> redmi note 12 Pro+ 5g </h6>
                                                <small className="fsz-12 color-666 mt-10"> Rise to the challenge </small>
                                            </div>
                                            <div className="col-5 text-end">
                                                <a href="https://ui-themez.smartinnovates.net/items/swoo_html/inner_pages/single_product.html" className="butn px-3 py-2 bg-000 text-white radius-4 fw-500 fsz-12 text-uppercase hover-bg-green2"> <span> Shop Now </span> </a>
                                            </div>
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
                                category.map((category)=>(
                                
                                    <Link key={category.id} to={`/category/${category.id}`} className="number-item">
                                        <div className="inf">
                                            <h6 className="fsz-14 fw-bold mb-0 sm-title"> {category.name_uz} </h6>
                                            <small className="fsz-12 color-666"> {category.stock} Items </small>
                                        </div>
                                        <div className="img">
                                            <img src={category.image} alt="" className="img-contain"/>
                                        </div>
                                    </Link>
                                ))
                            }

                            
                            
                            
                        </div>
                </section>


                <section className="tc-weekly-deals-style1 wow fadeInUp slow mt-3" data-wow-delay="0.2s">
                        <div className="content">
                            <div className="title mb-40">
                                <h3 className="fsz-30 me-lg-5"> Best Weekly Deals </h3>
                            </div>
                            <div className="deals-cards">
                                { categoryId.map((product) => (
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
                                                <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> {product.name_uz} </a>
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
                                            <a href="#0" className="cart-btn addCart" onClick={() => handleAddToBasket(product.id)}>
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
                </section>

               
            </Container>

            </main>
        </Fragment>
    );
};

export default Category;