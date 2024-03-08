import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import ClassTimeTable from "../components/courseplan";
import "../styles/about.scss";

const About: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allAboutJson {
                nodes {
                    mainTitle
                    title
                    desc
                    button
                    paragraph
                    help
                    phoneNum
                    icon
                    mainImage
                    absoluteImage
                    allButton {
                        button
                    }
                }
            }
            About: allFile(filter: { relativeDirectory: { eq: "about" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData
                    }
                    name
                }
            }
        }
    `);

    const [showSchedule, setShowSchedule] = useState(false);

    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
    };
    const aboutData = data.allAboutJson.nodes[0];

    const mainImageNode = data.About.nodes.find(
        (node: { name: string }) => node.name === "aboutSmall",
    ) as { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | undefined;

    const absoluteImageNode = data.About.nodes.find(
        (node: { name: string }) => node.name === "aboutBig",
    ) as { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | undefined;

    const iconNode = data.About.nodes.find(
        (node: { name: string }) => node.name === "customer",
    ) as { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | undefined;

    const mainImageData: IGatsbyImageData | null = mainImageNode
        ? getImage(mainImageNode)!
        : null;
    const absoluteImageData: IGatsbyImageData | null = absoluteImageNode
        ? getImage(absoluteImageNode)!
        : null;
    const iconImageData: IGatsbyImageData | null = iconNode
        ? getImage(iconNode)!
        : null;

    return (
        <section className="about" id="about">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-image-wrapper">
                            <div className="container">
                                <div className="about-thumb mb-5 mb-lg-0">
                                    {absoluteImageData && (
                                        <GatsbyImage
                                            image={absoluteImageData}
                                            alt="About Big"
                                            className="about-img-1"
                                        />
                                    )}
                                    {mainImageData && (
                                        <GatsbyImage
                                            image={mainImageData}
                                            alt="About Small"
                                            className="about-img-2 jumpImage"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-content-wrapper">
                            <div className="container">
                                <div className="about-content">
                                    <div className="title-area mb-0">
                                        <span className="sub-title">
                                            {aboutData.mainTitle}
                                        </span>
                                        <h2 className="sec-title">
                                            {aboutData.title}
                                        </h2>
                                        <div className="sec-text">
                                            {aboutData.desc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mission">
                            <div className="about-tab-1">
                                <div className="filter-menu-active">
                                    {aboutData.allButton.map(
                                        (
                                            button: { button: string },
                                            index: number,
                                        ) => (
                                            <button
                                                key={index}
                                                data-filter={`.cat${index + 1}`}
                                                type="button"
                                                className={`btn btn-primary ${index === 0 ? "active" : ""
                                                    }`}>
                                                {" "}
                                                {button.button}{" "}
                                            </button>
                                        ),
                                    )}
                                </div>
                                <div className="filter-active-cat1">
                                    <div className="filter-item cat1">
                                        <div className="about-tab-icon">
                                            {iconImageData && (
                                                <GatsbyImage
                                                    image={iconImageData}
                                                    alt="About Icon" className="image"
                                                />
                                            )}
                                        </div>
                                        <p className="about-tab-text">
                                            {aboutData.paragraph}
                                        </p>
                                    </div>
                                    <div className="btn-wrap mt-4">
                                        <button
                                            className="btn"
                                            onClick={toggleSchedule}>
                                            {aboutData.button}
                                        </button>
                                        <div className="about-info-wrap">
                                            <div className="icon">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    className="fonticon"
                                                />
                                            </div>
                                            <div className="details">
                                                <p className="about-info-title">
                                                    {aboutData.help}
                                                </p>
                                                <a
                                                    className="about-info-link"
                                                    href="#"
                                                    target="_blank"
                                                    rel="nofollow">
                                                    {aboutData.phoneNum}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showSchedule && <ClassTimeTable />}
        </section>
    );
};

export default About;
