import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    faFacebookF,
    faTwitter,
    faInstagram,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faPhone,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./CustomButton";

import "../styles/footer.scss";

interface FooterMenuLink {
    label: string;
    url: string;
}

interface FooterImageData {
    relativePath: string;
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
    };
}

interface ContactDetail {
    text: string;
    icon: string;
}

const Footer: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allFooterJson {
                nodes {
                    logo
                    description
                    socialIcons {
                        link
                        icon
                    }
                    UsefulHeading
                    usefulLinksWidget {
                        links {
                            label
                            url
                        }
                    }
                    contactUs
                    contactWidget
                    contactDetails {
                        text
                        icon
                    }
                    NewsletterHeading
                    newsletterWidget {
                        description
                        formPlaceholder
                        subscribeButton
                    }
                    copyrightText
                    gymee
                    text
                    footerMenuLinks {
                        label
                        url
                    }
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

    const footerData = data.allFooterJson.nodes[0];
    const values: boolean[] = [true];
    const iconMapping: Record<string, IconDefinition> = {
        faFacebookF,
        faTwitter,
        faInstagram,
        faGoogle,
        faEnvelope,
        faPhone,
        faHouse,
    };

    const footerImage = data.images.nodes.find(
        (node: FooterImageData) => node.relativePath === footerData.logo,
    );
    const image = footerImage?.childImageSharp.gatsbyImageData;

    return (
        <footer className="footer-area">
            <div className="footer-top">
                <div className="container">
                    <div className="row pt-5 pb-5">
                        <div className="col-xl-3 col-md-6">
                            <div className="footer-widgets footer-about-widget">
                                <div className="footer-logo">
                                    <a href="index.html">
                                        {image && (
                                            <GatsbyImage
                                                image={image}
                                                alt="logo"
                                                className="invert"
                                            />
                                        )}
                                    </a>
                                </div>
                                <p>{footerData.description}</p>
                                <div className="social">
                                    {footerData.socialIcons.map(
                                        (
                                            icon: {
                                                link: string;
                                                icon: string;
                                            },
                                            index: number,
                                        ) => (
                                            <a key={index} href={icon.link}>
                                                <FontAwesomeIcon
                                                    icon={
                                                        iconMapping[icon.icon]
                                                    }
                                                />
                                            </a>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-6">
                            <div className="footer-widgets latest-news">
                                <h3 className="widget-title">
                                    {footerData.UsefulHeading}
                                </h3>
                                <ul>
                                    {footerData.usefulLinksWidget.links.map(
                                        (
                                            link: {
                                                label: string;
                                                url: string;
                                            },
                                            index: number,
                                        ) => (
                                            <li key={index}>
                                                <a href={link.url}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="footer-widgets contact-widget">
                                <h3 className="widget-title">
                                    {footerData.contactUs}
                                </h3>
                                <p>{footerData.contactWidget}</p>
                                <ul>
                                    {footerData.contactDetails.map(
                                        (
                                            detail: ContactDetail,
                                            index: number,
                                        ) => (
                                            <li key={index}>
                                                <FontAwesomeIcon
                                                    icon={
                                                        iconMapping[detail.icon]
                                                    }
                                                    className="icon"
                                                />
                                                <span>{detail.text}</span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="footer-widgets newsletters-widget">
                                <h3 className="widget-title">
                                    {footerData.NewsletterHeading}
                                </h3>
                                <p>{footerData.newsletterWidget.description}</p>
                                <form action="#">
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            placeholder={
                                                footerData.newsletterWidget
                                                    .formPlaceholder
                                            }
                                        />
                                    </div>
                                    <div>
                                        {values.map((v, idx) => (
                                            <CustomButton
                                                key={idx}
                                                onClick={() => null}
                                                buttonText={
                                                    footerData.newsletterWidget
                                                        .subscribeButton
                                                }
                                            />
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="copyright text-xl-left text-lg-left  mb-md-10 mb-xs-10">
                                <p>
                                    {footerData.copyrightText}{" "}
                                    <a href="index.html">{footerData.gymee}</a>{" "}
                                    {footerData.text}
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="footer-menu">
                                <ul>
                                    {footerData.footerMenuLinks.map(
                                        (
                                            link: FooterMenuLink,
                                            index: number,
                                        ) => (
                                            <li key={index}>
                                                <a href={link.url}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
