import {
  FaRegStar,
  FaPlus,
  FaMinus,
  FaRegHeart,
  FaTrashAlt,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";
import Container from "../../components/shared/Container";
import { useEffect, useMemo, useState } from "react";
import { apiDeleteBasket, apiDeleteFavourites, apiGetBasket, apiGetFavourites, apiGetSingleProduct, apiPostFavourites, apiUpdateBasket } from "../../services/HomeService";
import { session } from "../../services/session";
import store from "store2";
import { Link } from "react-router-dom";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isToken, setIsToken] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchLiked = async () => {
      const token = session.get("token");
      setIsToken(!!token);
      try {
        const [favoritesData] = await Promise.all([apiGetFavourites()]);

        if (favoritesData) setFavorites(favoritesData.data.map(fav => fav.id));

        const response = await apiGetBasket();

        if (response && response.data) {
          setBasket(response.data);
        } else {
          console.error('Invalid basket data structure:', response);
        }
      } catch (error) {
        console.error('Error fetching basket:', error);

        const likes = session.get("like");
        if (likes) setFavorites(likes.map(fav => fav));

        const basketProd = session.get("products") || [];
        const products = [];

        for (const product of basketProd) {
          try {
            const singleProduct = await apiGetSingleProduct(product);
            console.log("singleProduct", singleProduct)
            products.push(singleProduct);
          } catch (singleProductError) {
            console.error('Error fetching single product:', singleProductError);
          }
        }

        setBasket(products);
      }
    };

    fetchLiked();
  }, []);

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

  const handleRemove = async (id) => {
    try {
      await apiDeleteBasket(id);
      setBasket((prevBasket) => prevBasket.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from basket:', error);

      const bas = session.get("products", id);
      const updatedData = bas.filter((bass) => bass !== id);
      console.log("bas", bas, id, updatedData)
      store.set("products", updatedData)
      const products = [];

      for (const product of updatedData) {
        try {
          const singleProduct = await apiGetSingleProduct(product);
          products.push(singleProduct);
        } catch (singleProductError) {
          console.error('Error fetching single product:', singleProductError);
        }
      }

      setBasket(products);


    }
  };

  const handleLike = async (productId) => {
    try {
      if (isToken) {
        await apiPostFavourites({ product_id: productId });
        setFavorites(prevFavorites => [...prevFavorites, productId]);
      }
      else {
        session.add("like", productId);
        setFavorites(prevFavorites => [...prevFavorites, productId]);
      }

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

  const isFavorite = useMemo(
    () => (productId) => favorites.includes(productId),
    [favorites]
  );

  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => {
      const price = isToken ? item.price : item.data.price;
      const quantity = isToken ? item.quantity : item.data.quantity;
      return total + (price * quantity);
    }, 0);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) { // negative count ni oldini olish
      setCount(count - 1);
    }
  };


  return (
    <div className="home-style3 cart-pg-1 py-3">
      <Container>
        <section className="tc-cart p-5 radius-4 bg-white mt-3 mb-3">
          <div className="row">
            {
              basket.length > 0 ?
                <div className="row  justify-between lg:flex">
                  <div className="products w-[100%] lg:w-[65%]">
                    {
                      basket.map(item => (
                        <div className="product-card " key={item.id}>
                          <div className="top-inf">
                            <a
                              href="#0"
                              className={`fav-btn`}
                              onClick={() => isFavorite(isToken ? item.id : item.data.id) ? handleUnlike(isToken ? item.id : item.data.id) : handleLike(isToken ? item.id : item.data.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '9px',
                                borderRadius: '50%',
                                border: '1px solid',
                                transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
                              }}
                            >
                              {isFavorite(isToken ? item.id : item.data.id) ? <FaHeart /> : <FaRegHeart />}
                            </a>
                            <a href="#0" className="remove-btn d-grid place-items-center"
                              onClick={() => handleRemove(isToken ? item.id : item.data.id)}

                            > <FaTrashAlt /></a>
                          </div>
                          <a href="#0" className="img">
                            <img src={isToken ? item.image : item.data.image} alt="" className="img-contain main-image" />
                          </a>
                          <div className="info">
                            
                            <h6> <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2">{isToken ? item.name_uz : item.data.name_uz}</a> </h6>
                            <div className="price mt-15">
                              <h5 className="fsz-18 color-red1 fw-600"> ${isToken ? item.price : item.data.price} </h5>
                            </div>
                            <div className="add-more mt-3">
                              {/* <span className="qt-minus" onClick={() => handleQuantityChange(item.id, -1)}><FaMinus /></span>
                                <input type="text" className="qt border-0" value={isToken ? (item.quantity ? item.quantity : "1") : "1"}
                                  readOnly />
                                <span className="qt-plus" onClick={() => handleQuantityChange(item.id, 1)}><FaPlus /></span> */}
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
                            <div className="meta">
                              {isToken ? item.freeShipping : item.data.freeShipping && <a href="#" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>}
                              {isToken ? item.freeGift : item.data.freeGift && <a href="#" className="meta-item color-red1"> free gift <span className="bg bg-red1"></span> </a>}
                            </div>
                            <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1" />{isToken ? item.stock : item.data.stock} </p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="col-lg-4">
                    <div className="cart-card">
                      <strong className="fsz-16 d-block mb-20">
                        Order Summary
                      </strong>
                      <div className="card-item border-0">
                        <strong className="color-000 text-uppercase">
                          Order total:
                        </strong>
                        <strong className="color-000">
                          ${calculateTotalPrice().toFixed(2)}
                        </strong>
                      </div>
                      <div className="btns pt-3">
                        <div className="row justify-content-center">
                          <div className="col-lg-6">
                            <Link
                              to={isToken ? "/checkout" : ".login"}
                              className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase d-flex justify-center mt-3 mt-lg-0 py-3 px-3 w-100"
                            >
                              <span> checkout </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="flex flex-col items-center">
                  <img className="w-48" src="https://static.vecteezy.com/system/resources/thumbnails/017/745/092/small_2x/empty-parcel-box-was-opened-png.png" alt="" />
                  <div className="font-bold text-lg">You do not have any items in your shopping cart yet
                  </div>
                </div>
            }
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Basket;


