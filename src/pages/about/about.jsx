import { Fragment } from 'react'
import Container from '../../components/shared/Container'
import { FaPlay } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import AboutBan2 from "../../assets/about-ban2.png";
import AboutBan3 from "../../assets/about-ban3.png";
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <Fragment>
      <main className=" home-style3 py-3 about-pg-1">
        <Container>
          <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fw-bold mb-0">
                <li className="breadcrumb-item color-999"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active color-000" aria-current="page">about</li>
              </ol>
            </nav>
          </section>
          <section className="tc-main-about p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
            <div className="main-card">
              <div className="about-banner">
                <h1 className="fw-400 fsz-45"> <strong> Best experience </strong> <br /> always wins </h1>
                <p className="fsz-14 color-666 mt-30"> #1 Online Marketplace for Electronic &amp; Technology <br /> in Mahanttan, CA </p>
              </div>
              <div className="about-numbers">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="info-text">
                      <h6 className="fsz-18 text-uppercase fw-bold lh-5"> our purpose is to <span className="color-green2"> enrich </span> <br /> <span className="color-green2"> and enhance lives </span> through <br /> technology </h6>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="numbers">
                      <div className="row justify-content-between">
                        <div className="col-lg-4">
                          <div className="num-card mt-4 mt-lg-0">
                            <h2 className="fsz-40 text-uppercase"> $12,5M </h2>
                            <p className="fsz-12 color-666 text-uppercase"> total revenue from <br /> 2001 - 2023 </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="num-card mt-4 mt-lg-0">
                            <h2 className="fsz-40 text-uppercase"> 12K+ </h2>
                            <p className="fsz-12 color-666 text-uppercase"> orders delivered <br /> successful on everyday </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="num-card mt-4 mt-lg-0">
                            <h2 className="fsz-40 text-uppercase"> 725+ </h2>
                            <p className="fsz-12 color-666 text-uppercase"> store and office in U.S <br /> and worldwide </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub-cards">
              <div className="row gx-2">
                <div className="col-lg-6 mt-3">
                  <div className="img">
                    <img src={AboutBan2} alt="" className="img-cover" />
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="info-card">
                    <div className="cont">
                      <h6 className="fsz-18 fw-bold"> We connect millions of buyers and sellers around the world, empowering people &amp; creating economic opportunity for all. </h6>
                      <p className="fsz-14 color-666 mt-30"> Within our markets, millions of people around the world connect, both online and offline, to make, sell and buy unique goods. We also offer a wide range of Seller Services and tools that help creative entrepreneurs start, manage &amp; scale their businesses. </p>
                      <a href="https://www.youtube.com/watch?v=qYgdnM3BC3g" className="butn gap-2 bg-blue1 text-white radius-4 fw-500 fsz-12 text-uppercase d-flex items-center justify-center mt-40 py-3" data-fancybox=""> <FaPlay className="me-1"/>our showreel  </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="tc-about-cards"> 
            <div className="row container ">
              <div className="col-lg-4 mt-3 radius-4 bg-white" >
                <div className="about-card  wow fadeInUp" style={{
                  position: "relative",
                  padding: "25px",
                  height: "100%",
                  visibility: "visible", animationName: "fadeInUp"
                }}>
                  <div className="title">
                    <h6 className="fsz-18 fw-bold text-uppercase"> 100% authentic <br /> products </h6>
                    <span className="icon"><CiCircleCheck /></span>
                  </div>
                  <div className="text fsz-14 color-666">
                    Swoo Tech Mart just distribute 100% authorized products &amp; guarantee quality. Nulla porta nulla nec orci vulputate, id rutrum sapien varius.
                  </div>
                </div>
              </div>
              <div className="col-lg-4 radius-4 mt-3 bg-white ">
                <div className="about-card wow radius-4 fadeInUp" data-wow-delay="0.2s" style={{
                  position: "relative",
                  padding: "25px",
                  height: "100%",
                   visibility: "visible",
                    animationdelay: "0.2s",
                     animationname: "fadeInUp"
                }}>
                  <div className="title">
                    <h6 className="fsz-18 fw-bold text-uppercase"> fast <br /> delivery </h6>
                    <span className="icon"><FaShippingFast /></span>
                  </div>
                  <div className="text fsz-14 -4 color-666">
                    Fast shipping with a lots of option to delivery. 100% guarantee that your goods alway on time and perserve quality.
                  </div>
                </div>
              </div>
              <div className="col-lg-4 radius-4 mt-3 bg-white">
                <div className="about-card wow fadeInUp" data-wow-delay="0.4s" style={{
                  position: "relative",
                  padding: "25px",
                  height: "100%",
                  visibility: "visible", animationdelay: "0.2s", animationname: "fadeInUp"
                }}>
                  <div className="title">
                    <h6 className="fsz-18 fw-bold text-uppercase"> affordable <br /> price </h6>
                    <span className="icon"><FaHandHoldingUsd /></span>
                  </div>
                  <div className="text fsz-14 radius-4 color-666">
                    We offer an affordable &amp; competitive price with a lots of special promotions.
                  </div>
                </div>
              </div>
            </div>
          </section> */}



          <section className="tc-mission-vision p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
            <div className="main-content pb-30 border-bottom">
              <h6 className="fsz-18 fw-bold text-uppercase mb-30"> our mission and vision </h6>
              <div className="text fsz-14 mb-30">
                Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras non elit vel magna molestie pellentesque in eu dui. Donec laoreet quis erat vitae finibus. Vestibulum enim eros, porta eget quam et, euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi id felis placerat porta vel sed augue. <strong> Vivamus mollis mauris </strong> vitae rhoncus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              </div>
              <div className="img th-400">
                <img src={AboutBan3} alt="" className="img-cover radius-4" />
              </div>
            </div>
            <div className="years-content pt-30 pb-30 border-bottom">
              <h6 className="fsz-18 fw-bold text-uppercase mb-30"> from a retail store to the global chain of stores </h6>
              <div className="text fsz-14 mb-30">
                Pellentesque laoreet justo nec ex sodales euismod. Aliquam orci tortor, bibendum nec ultricies ac, auctor nec purus. Maecenas in consectetur erat.
              </div>
              <div className="years">
                <div className="row gx-5">
                  <div className="col-lg-6">
                    <div className="year-card">
                      <strong className="color-000 me-2"> 1997: </strong>
                      <span> A small store located in Brooklyn Town, USA </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 1998: </strong>
                      <span> It is a long established fact that a reader will be distracted by the readable </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2000: </strong>
                      <span> Lorem Ipsum is simply dummy text of the printing and typesetting industry </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2002: </strong>
                      <span> Lorem Ipsum has been the industry's standard dummy text ever since the </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2004: </strong>
                      <span> Contrary to popular belief, Lorem Ipsum is not simply random text </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2005: </strong>
                      <span> The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2006: </strong>
                      <span> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2010: </strong>
                      <span> All the Lorem Ipsum generators on the Internet tend to repeat predefined </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2013: </strong>
                      <span> Lorem Ipsum comes from sections 1.10.32 </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2014: </strong>
                      <span> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2016: </strong>
                      <span> All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2020: </strong>
                      <span> Lorem Ipsum comes from sections 1.10.32 </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2021: </strong>
                      <span> Making this the first true generator on the Internet </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2022: </strong>
                      <span> Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour  </span>
                    </div>
                    <div className="year-card">
                      <strong className="color-000 me-2"> 2023: </strong>
                      <span> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </section>

          

          <section className="tc-banner-style3 mt-3 mb-3">
            <div className="banner-card text-center">
              <h6 className="d-block d-lg-inline-flex align-items-center fw-400 fsz-18 lh-5">
                {/* <img src="assets/img/star.png" alt="" className="icon-30 me-2" /> */}
                Member get
                <span className="text-uppercase text-color">
                  FREE SHIPPING*
                </span>
                with no order minimum!. *Restriction apply
                <a href="#" className="fsz-14 text-decoration-underline ms-2">
                  Try free 30-days trial!
                </a>
              </h6>
            </div>
          </section>
        </Container>
      </main>
    </Fragment>
  )
}

export default About;








