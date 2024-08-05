import { Fragment } from 'react';
import Container from "../../components/shared/Container";
import ContactImg from "../../assets/common/img/contact/contact.png"
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Contact = () => {
  return (
    <Fragment>
        <div className="home-style3 contact-pg-1 py-10">
            <Container>
            <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fw-bold mb-0">
                <li className="breadcrumb-item color-999"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active color-000" aria-current="page">contact</li>
              </ol>
            </nav>
          </section>
                <section className="contact p-30 radius-4 bg-white mt-3 wow fadeInUp">
                    <h6 className="fsz-18 fw-bold text-uppercase mb-30"> ready to work with us </h6>
                    <div className="checkout-form mt-50">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="fsz-16 color-666 mb-30"> Contact us for all your questions and opinions </p>
                                <form className="form">
                                    <div className="form-content">
                                        <div className="row gx-3">
                                            <div className="col-lg-6">
                                                <div className="form-group mb-4">
                                                    <label> First Name <span className="color-red1"> * </span> </label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-4">
                                                    <label> Last Name <span className="color-red1"> * </span> </label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label> Email Address <span className="color-red1"> * </span> </label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div> */}
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label> Phone Number </label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label> Country / Region <span className="color-red1"> * </span> </label>
                                                    <select className="form-control form-select">
                                                        <option value=""> United States (US) </option>
                                                        <option value=""> United States (US) </option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label> Subject <span className="color-666"> (Optional) </span> </label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div> */}
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label> Message </label>
                                                    <textarea rows="5" className="form-control" placeholder="Note about your order, e.g. special note for delivery "></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="account" />
                                                    <label className="form-check-label" htmlFor="account">
                                                        I want to receive news and updates once in a while. By submitting, I’m agreed to the <a href="#" className="color-blue1 text-decoration-underline"> Terms & Conditions </a>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <a href="#" className="butn bg-blue1 d-flex items-center justify-center text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-50 py-3"> <span> send message </span> </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-info mt-5 mt-lg-0">
                                    <div className="contact-info-card">
                                        <small className="fsz-12 color-666 text-uppercase mb-20"> Uzbekistan </small>
                                        <ul className="fsz-16 lh-lg">
                                            <li>
                                                <a href="#"> ул. Чиланзар 2/2, г. Ташкент, Узбекистан
                                                NY </a>
                                            </li>
                                            <li>
                                                <a href="#">+998 (90) 009 99 16 </a>
                                            </li>
                                            <li>
                                                <a href="#" className="color-blue1 text-decoration-underline"> info@elmag.uz </a>
                                            </li>
                                        </ul>
                                        {/* <small className="fsz-12 color-666 text-uppercase mb-20 mt-50"> united kingdom (branch) </small>
                                        <ul className="fsz-16 lh-lg">
                                            <li>
                                                <a href="#"> 12 Buckingham Rd, Thornthwaite, HG3 4TY, UK </a>
                                            </li>
                                            <li>
                                                <a href="#"> (+718) 895-5350 </a>
                                            </li>
                                            <li>
                                                <a href="#" className="color-blue1 text-decoration-underline"> contact@swattechmart.co.uk </a>
                                            </li>
                                        </ul> */}
                                        <div className="social-icons mt-50">
                                            <a href="#"><FaFacebookF /></a>
                                            <a href="#"> <FaInstagram /> </a>
                                            <a href="#"> <FaYoutube /></a>
                                        </div>
                                    </div>
                                    <div className="img th-380 mt-10">
                                        <img src={ContactImg} alt="" className="img-cover radius-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="map p-30 radius-4 bg-white mt-3 wow fadeInUp mb-3">
                    <h6 className="fsz-18 fw-bold text-uppercase mb-30"> find us on google map </h6>
                    <div className="map-content">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5995.424796273607!2d69.22525408399181!3d41.293363400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b7bb3e26fc1%3A0x93f3f483b0ab19c6!2sDORA!5e0!3m2!1sru!2s!4v1722847086314!5m2!1sru!2s" width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </section>
            </Container>
        </div>
    </Fragment>
  )
}


