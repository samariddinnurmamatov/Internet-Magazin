import { Fragment } from "react";
import { useEffect, useState, useMemo } from "react";
import { apiDeleteFavourites, apiGetFavourites } from "../services/HomeService";
import { toast } from "react-toastify";


const ProductCard = ({product}) => {

    const [favorites, setFavorites] = useState([]);



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

    const isFavorite = useMemo(
        () => (productId) => favorites.includes(productId),
        [favorites]
    );

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


    return (
        <a href={`/single_product/${product.id}`} className="column-sm" key={product.id}>
            <div className="deal-card">
                <div className="top">
                    <div className="icons">
                        <div

                            className={`icon fav ${isFavorite(product.id) ? 'liked' : ''}`}
                            onClick={() => isFavorite(product.id) ? handleUnlike(product.id) : handleLike(product.id)}
                        >
                            {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                        </div> 
                        <a href="/" className="icon"><IoSync /></a>
                        <a href={product.image} className="icon" data-fancybox="deal"><FaEye /></a>
                    </div>
                </div>
                <div className="img th-140 mb-20 d-block">
                    <img src={product.image} alt="" className="img-contain" />
                </div>
                <div className="info">
                    <span className="label fsz-11 py-1 px-3 rounded-pill bg-red1 text-white text-uppercase"> 15% OFF </span>
                    <a href={`/single_product/${product.id}`} className="title fsz-14 mt-15 fw-600 hover-blue1"> {product.name_uz} </a>

                    <p className="price color-red1 mt-2 fsz-20"> ${product.price}  </p>
                    <span className="old-price color-999 text-decoration-line-through ms-2 fsz-16"> $619.00 </span>
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
        </a>
    )
};

export default ProductCard;




