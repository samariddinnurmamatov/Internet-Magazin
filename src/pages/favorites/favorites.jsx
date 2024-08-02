import { Fragment, useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { FaRegStar, FaCheckCircle, FaHeart } from "react-icons/fa";
import { apiDeleteFavourites, apiGetFavourites, apiGetSingleProduct } from "../../services/HomeService";
import { session } from "../../services/session";
import store from 'store2';


const Favorites = () => {

    const [isToken, setIsToken] = useState(false);

    const [favorites, setFavorites] = useState([]);
    let products =[];

    const fetchLiked = async () => {
        const token = session.get("token");
        setIsToken(!!token)
  
        try {
            const response = await apiGetFavourites();
            if (response) {
                setFavorites(response.data); 
                console.log(response.data)
              } else {
                console.error('Invalid favorites data structure:', response);
              }
        } catch (error) {

            console.error('Error fetching basket:', error);
    
            const basketProd = session.get("like") || [];
            console.log(basketProd);
    
            for (const product of basketProd) {
              try {
                const singleProduct = await apiGetSingleProduct(product);
                products.push(singleProduct);
              } catch (singleProductError) {
                console.error('Error fetching single product in favorite:', singleProductError);
              }
            }
            setFavorites(products);
            console.log("like =>", products);
          }
    };

    useEffect(() => {

        fetchLiked();
    }, []);

    const handleUnfavorite = async (id) => {
        try {
            await apiDeleteFavourites(id);
            setFavorites(prevFavorites => {
                const updatedFavorites = prevFavorites.filter(favorite => favorite.id !== id);
                return updatedFavorites;
            });
        } catch (error) {
            console.error('Error removing from favorites:', error);
            console.log('SSS', id);
            session.remove("like",id);
            
            

            // setFavorites(() => {
            //     const likes = session.get("likes") || []; // Ensure likes is an array
            //     const updatedLikes = likes.filter(favorite => favorite !== id);
            //     // store.set("like", updatedLikes); // Update the session storage if necessary
            //     return updatedLikes;
            // });  
            
            fetchLiked();
        }
    };


    const getIconStyles = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '9px',
        backgroundColor: isActive ? 'var(--color-blue1)' : 'transparent',
        borderColor: isActive ? 'var(--color-blue1)' : 'grey',
        color: isActive ? '#fff' : 'inherit',
        borderRadius: '50%',
        border: '1px solid',
        transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
    });

    return (
        <Fragment>
            <div className="home-style3 cart-pg-1 py-10">
                <Container>
                    <section className="tc-cart p-5 radius-4 bg-white mt-3 mb-3">
                        <div className="row">
                            <div className="col-lg-15">
                                <div className="products">
                                    { favorites.length ? favorites.map(favorite => (

                                        <div className="product-card" key={isToken ? favorite.id :favorite.data.id}>
                                           <div className="top-inf" style={{display: "flex", justifyContent: "space-between"}}>
                                                <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
                                                <div className="icons">
                                                <a
                                                        href="#0"
                                                        className="icon fav"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleUnfavorite( isToken ? favorite.id :favorite.data.id);
                                                        }}
                                                        style={getIconStyles(true)} 
                                                    >
                                                        <FaHeart className="icon-heart" />
                                                    </a>
                                                </div>
                                            </div>
                                            <br />
                                            <a href="#0" className="img">
                                                <img src={isToken ? "https://www.work.dora.uz/public/storage/"+favorite.image : favorite.data.image} alt={isToken ? favorite.name_uz :favorite.data.name_uz} className="img-contain main-image" />
                                            </a>
                                            <div className="info">
                                                <div className="rating">
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, i) => <FaRegStar key={i} />)}
                                                    </div>
                                                    <span className="num"> (152) </span>
                                                </div>
                                                <h6><a href="#0" className="prod-title fsz-14 fw-bold mt-2 hover-green2">{isToken? favorite.name_uz: favorite.data.name_uz}</a></h6>
                                                <div className="price mt-15">
                                                    <h5 className="fsz-18 color-red1 fw-600">${isToken ? favorite.price : favorite.data.price}</h5>
                                                </div>
                                                <div className="meta">
                                                    <a href="#0" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>
                                                </div>
                                                <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1" /> {isToken ? favorite.status :     favorite.data.status} </p>
                                            </div>
                                        </div>
                                    )) : 
                                    <div className=" d-flex flex-column items-center"> 
                                    <img src="https://uzum.uz/static/img/hearts.cf414be.png" className="w-52" alt="free" />
                                        <div className="font-bold h2">Add what you like
                                        </div>
                                        <div className="">Click on ♡ in the product. Log in to your account and all your favorites will be saved.
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </Fragment>
    );
};

export default Favorites;



// import { Fragment, useEffect, useState } from "react";
// import Container from "../../components/shared/Container";
// import { FaRegStar, FaCheckCircle, FaRegHeart, FaHeart } from "react-icons/fa";
// import { apiDeleteFavourites, apiGetFavourites } from "../../services/HomeService";


// const Favorites = () => {
//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         const fetchLiked = async () => {
//             try {
//                 const response = await apiGetFavourites();
//                 if (response) {
//                     // Ensure that the data structure is handled correctly
//                     setFavorites(response.data); // Adjust based on actual response structure
//                   } else {
//                     console.error('Invalid favorites data structure:', response);
//                   }
//             } catch (error) {
//                 console.error('Error fetching favorites:', error);
//             }
//         };

//         fetchLiked();
//     }, []);
    
//     const handleUnfavorite = async (id) => {
//         try {
//             await apiDeleteFavourites(id);
//             setFavorites(favorites.filter(favorite => favorite.id !== id));
//         } catch (error) {
//             console.error('Error removing from favorites:', error);
//         }
//     };

//     return (
//         <Fragment>
//             <div className="home-style3 cart-pg-1 py-10">
//                 <Container>
//                     <section className="tc-cart p-5 radius-4 bg-white mt-3 mb-3">
//                         <div className="row">
//                             <div className="col-lg-15">
//                                 <div className="products">
//                                     {favorites.map(favorite => (
//                                         <div className="product-card" key={favorite.id}>
//                                            <div className="top-inf" style={{display: "flex", justifyContent: "space-between"}}>
//                                                 <small className="fsz-11 py-1 px-3 rounded-pill color-red1 border-red1 border"> 0% Installment </small>
//                                                 <div className="icons">
//                                                     <a
//                                                         href="#"
//                                                         className="icon fav"
//                                                         onClick={(e) => {
//                                                             e.preventDefault();
//                                                             handleUnfavorite(favorite.id);
//                                                         }}
//                                                     >
//                                                         <FaHeart className={`text-${favorites.some(fav => fav.id === favorite.id) ? 'black' : 'white'}`} />
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                             <br />
//                                             <a href="#0" className="img">
//                                                 <img src={favorite.image} alt={favorite.name_uz} className="img-contain main-image" />
//                                             </a>
//                                             <div className="info">
//                                                 <div className="rating">
//                                                     <div className="stars">
//                                                         {[...Array(5)].map((_, i) => <FaRegStar key={i} />)}
//                                                     </div>
//                                                     <span className="num"> (152) </span>
//                                                 </div>
//                                                 <h6><a href="#0" className="prod-title fsz-14 fw-bold mt-2 hover-green2">{favorite.name_uz}</a></h6>
//                                                 <div className="price mt-15">
//                                                     <h5 className="fsz-18 color-red1 fw-600">${favorite.price}</h5>
//                                                 </div>
//                                                 <div className="meta">
//                                                     <a href="#0" className="meta-item color-green2"> free shipping <span className="bg bg-green2"></span> </a>
//                                                 </div>
//                                                 <p className="fsz-12 mt-2"><FaCheckCircle className="color-green2 me-1" /> {favorite.status} </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </Container>
//             </div>
//         </Fragment>
//     );
// };

// export default Favorites;
