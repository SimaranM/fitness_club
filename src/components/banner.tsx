
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import "../styles/banner.scss";

interface BannerImageData {
    name: string;
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
    };
}

interface BannerItem {
    mainTitle: string;
    title: string;
    desc: string;
    button: string;
    image: string;
}

const Banner: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allBannerJson {
                nodes {
                    slides {
                        mainTitle
                        title
                        desc
                        button
                        image
                    }
                }
            }
            Banner: allFile(filter: { relativeDirectory: { eq: "banner" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData
                    }
                    name
                }
            }
        }
    `);

    const bannerData = data.allBannerJson.nodes[0];

    return (
        <section className="hero-slider bg-fix pt-130 pb-100">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper">
                {bannerData.slides.map((bannerItem: BannerItem, index: number) => {
                    const thumbImage = data.Banner.nodes.find((node: BannerImageData) => node.name === bannerItem.image,);
                    const bannerImage = thumbImage?.childImageSharp?.gatsbyImageData;
                    return (
                        <SwiperSlide key={index}>
                            <div className="slider">
                                {bannerImage && (
                                    <GatsbyImage
                                        image={bannerImage}
                                        className="swiper-slide" alt="Banner" style={{ width: "100%", height: "100%" }}
                                    />
                                )}
                                <div className="slider-content-3">
                                    <span data-animation="fadeInUp">
                                        {" "}
                                        {bannerItem.mainTitle}{" "}
                                    </span>
                                    <h2>{bannerItem.title}</h2>
                                    <p>{bannerItem.desc}</p>
                                    <a href="#" className="read-more fadeInUp animated">
                                        {bannerItem.button}
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                            className="icon"
                                        />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                },)}
            </Swiper>
        </section>
    );
};

export default Banner;