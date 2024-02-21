import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "../styles/video.scss";

interface VideoData {
    title: {
        prefix: string;
        mainText: string;
        centerText: string;
        suffix: string;
    };
    desc: string;
    learnMore: string;
    button: string;
    playIcon: string;
    Video: string;
    spinImage: string;
}

interface VideoImageData {
    relativePath: string;
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
    };
}

const iconMapping: Record<string, IconDefinition> = { faPlay };

const Video: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allVideoJson {
                nodes {
                    title {
                        prefix
                        mainText
                        centerText
                        suffix
                    }
                    desc
                    learnMore
                    button
                    playIcon
                    Video
                    spinImage
                }
            }
            images: allFile {
                nodes {
                    relativePath
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    `);

    const videoData: VideoData = data.allVideoJson.nodes[0];
    const thumbImage = data.images.nodes.find(
        (node: VideoImageData) => node.relativePath === videoData.Video,
    );
    const videoImage = thumbImage?.childImageSharp.gatsbyImageData;

    const shapeImage = data.images.nodes.find(
        (node: VideoImageData) => node.relativePath === videoData.spinImage,
    );
    const spinImage = shapeImage?.childImageSharp.gatsbyImageData;

    const [showLearnMore, setShowLearnMore] = useState(false);

    const toggleLearnMore = () => {
        setShowLearnMore(!showLearnMore);
    };

    return (
        <section className="video-area">
            <div className="container">
                <div className="row mb-80 pb-5">
                    <div className="col-xl-6 col-lg-6">
                        <div className="section-title">
                            <h3 className="bars">
                                <span>{videoData.title.prefix}</span>{" "}
                                {videoData.title.mainText}
                                <span>{videoData.title.centerText}</span>{" "}
                                {videoData.title.suffix}
                            </h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="video-text">
                            <p>{videoData.desc}</p>
                            {showLearnMore && <p>{videoData.learnMore}</p>}
                            <a
                                href="#"
                                className="btn btn-gra"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleLearnMore();
                                }}>
                                {showLearnMore ? "Learn Less" : "Learn More"}{" "}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="video-wrap">
                            {videoImage && (
                                <GatsbyImage
                                    image={videoImage}
                                    alt=""
                                    style={{ width: "2000" }}
                                />
                            )}
                            <div className="video-play">
                                <a href="" className="popup-video">
                                    <FontAwesomeIcon
                                        icon={iconMapping[videoData.playIcon]}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-shape">
                {spinImage && (
                    <GatsbyImage
                        image={spinImage}
                        className="rotateme"
                        alt="shape"
                    />
                )}
            </div>
        </section>
    );
};

export default Video;
