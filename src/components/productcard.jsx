import { Fragment } from "react";
import { useEffect, useState } from "react";
import { apiDeleteFavourites, apiGetFavourites } from "../services/HomeService";


const ProductCard = (product) => {

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [ productData] = await Promise.all([
    //                 apiGetProducts()
    //             ]);

    //             if (productData.success) setProducts(productData.data);
    //             else console.error('Invalid product data structure:', productData);

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return( 
        <Fragment>
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
                                        <a href="../inner_pages/single_product.html" className="title fsz-14 mt-15 fw-600 hover-blue1"> Air Purifier with <br /> True HEPA H14 Filter </a>
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
                                    <a href="#0" className="cart-btn addCart" onClick={() => handleAddToBasket(product)}><MdOutlineAddShoppingCart className="me-1" />Add To Cart</a>
                                </div>
                            </div>
        </Fragment>
    )
};

export default ProductCard;




