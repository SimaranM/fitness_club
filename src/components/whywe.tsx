import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/whywe.scss";

interface AccordionItem {
    isOpen: boolean;
}

interface WhyWeData {
    mainTitle: string;
    title: string;
    news: string;
    desc: string;
    whyWe: {
        accordion: string;
        desc: string;
        iconRight: string;
        iconDown: string;
    }[];
}

const WhyWe: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allWhyweJson {
                nodes {
                    mainTitle
                    title
                    news
                    desc
                    icon
                    mainImage
                    absoluteImage
                    whyWe {
                        accordion
                        desc
                        iconRight
                        iconDown
                    }
                }
            }
            Whywe: allFile(filter: { relativeDirectory: { eq: "whywe" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData
                    }
                    name
                }
            }
        }
    `);
    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>(
        data.allWhyweJson.nodes[0].whyWe.map(() => ({ isOpen: false })),
    );

    const toggleAccordion = (index: number) => {
        const newAccordionItems = accordionItems.map((item, i) => {
            if (i === index) {
                return { ...item, isOpen: !item.isOpen };
            }
            return item;
        });
        setAccordionItems(newAccordionItems);
    };

    const whyweData: WhyWeData = data.allWhyweJson.nodes[0];
    const iconMapping: Record<string, IconDefinition> = {
        faArrowRight,
        faArrowDown,
    };

    const mainImageNode = data.Whywe.nodes.find(
        (node: { name: string }) => node.name === "mainImage",
    ) as { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | undefined;

    const absoluteImageNode = data.Whywe.nodes.find(
        (node: { name: string }) => node.name === "absoluteImage",
    ) as { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | undefined;

    const iconNode = data.Whywe.nodes.find(
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
        <section className="whywe-section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="container">
                            <div className="thumb">
                                <div className="box1">
                                    {mainImageData && (
                                        <GatsbyImage
                                            image={mainImageData}
                                            alt="Main Image"
                                            className="img-1"
                                        />
                                    )}
                                    <div className="img-2 jump">
                                        {absoluteImageData && (
                                            <GatsbyImage
                                                image={absoluteImageData}
                                                alt="Absolute Image"
                                                className="attachment-full size-full"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="box bounce-1">
                                    <div className="icon">
                                        {iconImageData && (
                                            <GatsbyImage
                                                image={iconImageData}
                                                alt="Icon"
                                            />
                                        )}
                                    </div>
                                    <div className="details">
                                        <h3 className="whywe-year">
                                            <span className="counter-number">
                                                25
                                            </span>{" "}
                                            +{" "}
                                        </h3>
                                        <span className="whywe-text">
                                            {whyweData.news}{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 accordion p-5">
                        <div className="container mb-5">
                            <div className=" text">
                                <span className="sub-title">
                                    {" "}
                                    {whyweData.title}{" "}
                                </span>
                                <h2 className="sec-title">
                                    {" "}
                                    {whyweData.mainTitle}{" "}
                                </h2>
                                <div className="sec-text mb-5">
                                    {" "}
                                    {whyweData.desc}{" "}
                                </div>
                            </div>
                            <div
                                className="accordion-area accordion"
                                id="faqAccordion">
                                {whyweData.whyWe.map((item, index) => (
                                    <div
                                        className={`accordion accordion-card ${
                                            accordionItems[index].isOpen
                                                ? "active"
                                                : ""
                                        }`}
                                        key={index}>
                                        <div
                                            className="accordion-header d-flex justify-content-between align-items-center"
                                            onClick={() =>
                                                toggleAccordion(index)
                                            }>
                                            <div>{item.accordion}</div>
                                            <div>
                                                {" "}
                                                {accordionItems[index]
                                                    .isOpen ? (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            iconMapping[
                                                                item.iconDown
                                                            ]
                                                        }
                                                        className="accordion-button"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            iconMapping[
                                                                item.iconRight
                                                            ]
                                                        }
                                                        className="accordion-button"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {accordionItems[index].isOpen && (
                                            <div
                                                id={`collapse-${index}`}
                                                className="accordion-collapse collapse show">
                                                <div className="accordion-body">
                                                    <p className="faq-text">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyWe;
