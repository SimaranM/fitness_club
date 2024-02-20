import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { StaticImage } from "gatsby-plugin-image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import "../styles/banner.scss";

const Header: React.FC = () => {

    return (
        <section className="hero-slider bg-fix pt-130 pb-100">

            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                modules={[Pagination, Autoplay]}
                autoplay={true}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="slider">
                        <StaticImage src="https://html.tonatheme.com/2020/fitnastic/images/main-slider/2.jpg" className="swiper-slide" alt="Banner" style={{ width: "100%", height: "100%", }} />

                        <div className="slider-content-3">
                            <span data-animation="fadeInUp"> we are professional &amp; expert </span>
                            <h2>  Making Different From Other Builds Health </h2>
                            <p >  Best GYM &amp; Fitness Center Build Your Health </p>
                            <a href="#" className="read-more fadeInUp animated" >  Get started  <FontAwesomeIcon icon={faChevronRight} className='icon' /></a>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider">
                        <StaticImage src="https://html.tonatheme.com/2020/fitnastic/images/main-slider/2.jpg" className="swiper-slide" alt="Banner" style={{ width: "100%", height: "100%", }} />
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-10">
                                    <div className="slider-content-3">
                                        <span data-animation="fadeInUp"> we are professional &amp; expert </span>
                                        <h2>  Making Different From Other Builds Health </h2>
                                        <p >  Best GYM &amp; Fitness Center Build Your Health </p>
                                        <a href="#" className="read-more fadeInUp animated" >  Get started  <FontAwesomeIcon icon={faChevronRight} className='icon' /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider">
                        <StaticImage src="https://html.tonatheme.com/2020/fitnastic/images/main-slider/3.jpg" className="swiper-slide" alt="Banner" style={{ width: "100%", height: "100%", }} />
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-10">
                                    <div className="slider-content-3">
                                        <span data-animation="fadeInUp"> we are professional &amp; expert </span>
                                        <h2>  Making Different From Other Builds Health </h2>
                                        <p >  Best GYM &amp; Fitness Center Build Your Health </p>
                                        <a href="#" className="read-more fadeInUp animated" >  Get started  <FontAwesomeIcon icon={faChevronRight} className='icon' /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </Swiper>
        </section>
    );
};

export default Header;
