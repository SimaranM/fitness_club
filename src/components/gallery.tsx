import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "./imageGallery";
import "../styles/gallery.scss";

const Gallery: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allGalleryJson {
                nodes {
                    mainTitle
                    title
                    button
                    lernmoreIcon
                    gallery {
                        image
                        icon
                        name
                        desc
                    }
                }
            }
            Gallery: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData(width: 1000)
                    }
                    name
                }
            }
        }
    `);

    const galleryData = data.allGalleryJson.nodes[0];
    const imageList = data.Gallery.nodes;

    return (
        <React.Fragment>
            <section id="gallery" className="gallery-main">
                <div className="gallery-area pt-5 pb-5">
                    <div className="container">
                        <div className="row align-items-center mb-5">
                            <div className="col-xl-9">
                                <div className="bar-theme-color gallery-title mb-3">
                                    <h3>{galleryData.title}</h3>
                                    <span>{galleryData.mainTitle}</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-xl-3 text-xl-right text-lg-right text-center">
                                <a href="about.html" className="btn btn-gra">
                                    {galleryData.button}{" "}
                                    <FontAwesomeIcon
                                        icon={galleryData.lernmoreIcon}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            {galleryData.gallery.map(
                                (
                                    galleryItem: {
                                        image: string;
                                        icon: string;
                                        name: string;
                                        desc: string;
                                    },
                                    index: number,
                                ) => (
                                    <div
                                        key={index}
                                        className={`col-lg-${
                                            index % 5 === 0 ? "8" : "4"
                                        }`}>
                                        <div className="gallery-wrap mb-5">
                                            <div className="gallery-thumb">
                                                <ImageGallery
                                                    imageList={imageList.filter(
                                                        (image: {
                                                            name: string;
                                                        }) =>
                                                            image.name ===
                                                            galleryItem.image,
                                                    )}
                                                />
                                                <div className="gallery-link">
                                                    <a href="gallery-details.html">
                                                        <FontAwesomeIcon
                                                            icon={faArrowRight}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="gallery-content">
                                                <h3>{galleryItem.name}</h3>
                                                <span>{galleryItem.desc}</span>
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Gallery;
