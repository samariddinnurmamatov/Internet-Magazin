const BannerCard = ({ bannerProduct }) => {

    return (
        <div className="swiper-slide">
            <div className="slide-card">
                <div className="img th-450">
                    <img src={bannerProduct.image} alt="" className="w-full" />
                </div>
                <div className="info text-white">
                    <div className="cont">
                        <h2 className="fsz-35 fw-200"> {bannerProduct.name_uz} </h2>
                        <p className="fsz-12 mt-15 text-uppercase"> Smart Full HD Android TV  with Google Assistant  </p>
                        <div className="butn px-5 py-3 bg-blue1 text-white rounded-pill mt-60 fw-600"> <span> Shop Now </span> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}; 

export default BannerCard;




