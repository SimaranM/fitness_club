import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import "../styles/service.scss";

interface ServiceImageData {
    name: string;
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
    };
}

interface SwiperSlideData {
    heading: string;
    dec: string;
    icon: string;
    image: string;
    text: string;
}

const Service: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allServiceJson {
                nodes {
                    sub_title
                    sec_title
                    Swiper {
                        heading
                        dec
                        icon
                        image
                        text
                    }
                }
            }
            Service: allFile(filter: { relativeDirectory: { eq: "service" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData(width: 70)
                    }
                    name
                }
            }
        }
    `);

    const serviceData = data.allServiceJson.nodes[0];
    const iconMapping: Record<string, IconDefinition> = { faArrowRight };

    return (
        <section className="service bg-fix pt-130 pb-100">
            <div className="container">
                <div className="section-head style-1 text-center">
                    <span className="sub-title">{serviceData.sub_title}</span>
                    <h2 className="sec-title">{serviceData.sec_title}</h2>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        "@1.50": {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mySwiper">
                    {serviceData.Swiper.map(
                        (slide: SwiperSlideData, index: number) => {
                            const thumbImage = data.Service.nodes.find(
                                (node: ServiceImageData) =>
                                    node.name === slide.image,
                            );
                            const serviceImage =
                                thumbImage?.childImageSharp?.gatsbyImageData;
                            return (
                                <SwiperSlide key={index}>
                                    <div className="service-card style2">
                                        <div className="service-card_icon">
                                            {serviceImage && (
                                                <GatsbyImage
                                                    image={serviceImage}
                                                    alt=""
                                                    className="fitness-icon"
                                                />
                                            )}
                                        </div>
                                        <div className="service-card_content">
                                            <h3 className="service-card_title mb-5">
                                                <a href="#">{slide.heading}</a>
                                            </h3>
                                            <p className="service-card.style2 service-card_text">
                                                {slide.dec}
                                            </p>
                                            <a
                                                href="#"
                                                target="_blank"
                                                rel="nofollow"
                                                className="link-btn">
                                                <FontAwesomeIcon
                                                    icon={
                                                        iconMapping[slide.icon]
                                                    }
                                                    className="icon"
                                                />
                                                {slide.text}
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        },
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default Service;
