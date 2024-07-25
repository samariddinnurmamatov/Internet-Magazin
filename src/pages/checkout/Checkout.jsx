import { Fragment, useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { useSelector } from "react-redux";
import "./checkout.css";
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { createOrder } from "../../services/OrderService";
import { apiGetBasket } from "../../services/HomeService";
import { apiUserInfo } from "../../services/AuthService";
import { toast } from "react-toastify";

export const Checkout = () => {
  // const basketItems = useSelector((state) => state.basket);

  const [position, setPosition] = useState([51.505, -0.09]); // Default position

  const [basket, setBasket] = useState([]);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    region: "",
    district: "",
    street: ""
  });

  useEffect(() => {
      const fetchBasket = async () => {
          try {
              const response = await apiGetBasket();
              console.log(response.data);
              if (response) {
                  // Ensure that the data structure is handled correctly
                  setBasket(response.data); // Adjust based on actual response structure
                } else {
                  console.error('Invalid favorites data structure:', response);
                }
          } catch (error) {
              console.error('Error fetching favorites:', error);
          }
      };

      fetchBasket();
  }, []);
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiUserInfo();
      if (response && response.user) {
        setUserData({
          first_name: response.user.first_name || "",
          last_name: response.user.last_name || "",
          phone_number: response.user.phone_number || "",
          email: response.user.email || "",
          region: "", // Set default or fetched values if available
          district: "", // Set default or fetched values if available
          street: "" // Set default or fetched values if available
        });
      } else {
        toast.error('Failed to fetch user data.');
      }
    } catch (error) {
      toast.error('Failed to fetch user data.');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    });
  }, []);

  const DraggableMarker = () => {
    const [draggable, setDraggable] = useState(true);
    const eventHandlers = {
      dragend(e) {
        const marker = e.target;
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]);
      }
    };
    
    const toggleDraggable = () => {
      setDraggable(!draggable);
    };

    useMapEvents({
        click(e) {
          setPosition([e.latlng.lat, e.latlng.lng]);
        }
      });

      return (
        <Marker
          position={position}
          draggable={draggable}
          eventHandlers={eventHandlers}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
            </span>
          </Popup>
        </Marker>
      );
    };

  // basketItems.map((value, index, array) => {
  //   console.log(value.brand_id, index, array);
  // });

  

  const fetchData = async () => {
    try {
      let data = {
        "longitude": position[0],
        "latitude": position[1],
        "region": userData.region,
        "district": userData.district,
        "street": userData.street,
        "home": "1-4-83",
        "products": basket.map(item => ({ id: item.id, quantity: item.quantity })),
        "payment_method": "credit_card",
        "shipping_method": "standard"
      };
  
      const response = await createOrder(data);
  
      console.log("checkout", response.data);
    } catch (error) {
      console.log("Error during order creation:", error.response.data);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  

  return (
    <Fragment>
      <div className="home-style3 cart-pg-1 py-10 checkout-pg-1">
        <Container>
          <section
            className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fw-bold mb-0">
                <li className="breadcrumb-item color-999">
                  <a href="/">Home</a>
                </li>
                <li
                  className="breadcrumb-item active color-000"
                  aria-current="page"
                >
                  Checkout  {position}
                </li>
              </ol>
            </nav>
          </section>

          <section className="tc-checkout p-5 radius-4 bg-white mt-3 mb-3">
            <div className="checkout-form">
              <h6 className="fsz-18 fw-bold text-uppercase mb-4"> checkout </h6>

              <div className="row">
                <div className="col-lg-7">
                  <form className="form">
                    <div className="form-content">
                      <div className="row gx-3">
                        <div className="col-lg-12">
                          <h6 className="fsz-16 fw-bold mb-30">
                            {" "}
                            Billing Detail{" "}
                          </h6>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              First Name <span className="color-red1"> * </span>
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              value={userData.first_name}
                              onChange={handleInputChange}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Last Name <span className="color-red1"> * </span>
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-control"
                              value={userData.last_name}
                              onChange={handleInputChange}
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Phone Number{" "}
                              <span className="color-red1"> * </span>
                            </label>
                            <input
                              type="text"
                               name="phone_number"
                              className="form-control"
                              value={userData.phone_number}
                              onChange={handleInputChange}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Viloyat
                              <span className="color-red1"> * </span>
                            </label>
                            <select
                              name="region"
                              id=""
                              value={userData.region}
                              className="form-control form-select"
                            >
                              <option value=""> Surxondaryo </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Tuman/Shahar
                              <span className="color-red1"> * </span>
                            </label>
                            <select
                              name="district"
                              id=""
                              value={userData.district}
                              className="form-control form-select"
                            >
                              <option value=""> Qumqurg'on </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor=""> Street Address </label>
                            <input
                              type="text"
                              name="street"
                              className="form-control mb-2"
                              value={userData.street}
                              onChange={handleInputChange}
                              placeholder="House number and street name ..."
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Apartment, suite, unit, etc (Optional)"
                            />
                          </div>
                        </div>
                       
                        
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Email Address{" "}
                              <span className="color-red1"> * </span>
                            </label>
                            <input
                              type="text"
                              name="email"
                              value={userData.email}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 border">
                          <MapContainer
                            center={position}
                            zoom={13}
                            style={{ height: "500px", width: "100%" }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <DraggableMarker />
                          </MapContainer>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="account"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="account"
                            >
                              Create an account?
                            </label>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <h6 className="fsz-16 fw-bold mb-30 mt-50">
                            Additional Information
                          </h6>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="">
                              Order Notes{" "}
                              <span className="color-999">(Optional)</span>
                            </label>
                            <textarea
                              name=""
                              rows={5}
                              className="form-control"
                              placeholder="Note about your order, e.g. special note for delivery "
                              defaultValue={""}
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5">
                  <div className="order">
                    <h6 className="fsz-16 fw-bold mb-30"> Your Order </h6>
                    <div className="order-card">
                      <h6 className="card-title">
                        <span> Product </span> <span> sub total </span>
                      </h6>
                      <div className="prod-cont">
                        {basket.map((value, index, array) => {
                          return (
                              <div key={index} className="prod-card">
                                <div className="img-side">
                                  <div className="img">
                                    <img width={100} src={value.image} alt="" />
                                  </div>
                                  <div className="inf">
                                    <p className="fsz-14 fw-500 lh-3">
                                      {value.name_en}
                                    </p>
                                    <p className="fsz-14 color-666">
                                      {" "}
                                      x {value.quantity}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                          );
                        })}

                        <div className="worldwide d-flex justify-content-between py-2">
                          <span> Worldwide Standard Shipping Free </span>
                          <span className="color-red1"> + $9.50 </span>
                        </div>
                      </div>
                      <div className="total d-flex justify-content-between py-3 fsz-16 fw-bold">
                        <span> Order Total </span>
                        <span className="color-green2"> $1,746.50 </span>
                      </div>
                    </div>
                    <div className="payment-card">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultValue=""
                          id="payment2"
                          name="payment"
                        />
                        <label className="form-check-label" htmlFor="payment2">
                          <h6 className="fw-bold mb-10 fsz-14">
                            {" "}
                            Cash on Delivery{" "}
                          </h6>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ">
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultValue=""
                          id="payment3"
                          name="payment"
                        />
                        <label className="form-check-label" htmlFor="payment3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="fw-bold fsz-14">
                              Payme
                              <a
                                href="https://payme.uz/home/main"
                                className="text-decoration-underline text-primary fw-400 ms-1"
                              >
                                What’s Payme?
                              </a>
                            </h6>
                            <div className="img">
                              <img
                                width={80}
                                src="https://cdn.payme.uz/logo/payme_color.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <a
                        onClick={fetchData}
                        className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-30 py-3 px-3 w-100"
                      >
                        <span  > place order </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </Fragment>
  );
};
