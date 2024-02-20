import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import png from "../images/about/customer.png"
import AboutSmall from "../images/about/aboutSmall.png"
import AboutBig from "../images/about/aboutBig.png"
import "../styles/about.scss";


const About: React.FC = () => {

    return (
        <section className="about">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-image-wrapper">
                            <div className="container">
                                <div className="about-thumb mb-5 mb-lg-0">
                                    <img className="about-img-1" src={AboutBig} />
                                    <img className="about-img-2 jumpImage" src={AboutSmall} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-content-wrapper">
                            <div className="container">
                                <div className="about-content">
                                    <div className="title-area mb-0">
                                        <span className="sub-title"> MORE ABOUT US </span>
                                        <h2 className="sec-title">
                                            Unlock Your Full Potential, Achieve Your Goals.
                                        </h2>
                                        <div className="sec-text">
                                            Through our personalized approach and expert guidance, we will work together to identify your passions and ambitions. Our team of dedicated professionals is committed to providing you with the tools, resources, and support you need to overcome obstacles and make significant progress.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mission">
                            <div className="about-tab-1">
                                <div className="filter-menu-active">
                                    <button data-filter=".cat1" type="button" className="btn btn-primary active"> Our Mission </button>
                                    <button data-filter=".cat2" type="button" className="btn btn-primary"> Our Vision </button>
                                    <button data-filter=".cat3" type="button" className="btn btn-primary"> Our Goal </button>
                                </div>
                                <div className="filter-active-cat1">
                                    <div className="filter-item cat1">
                                        <div className="about-tab-icon">
                                            <img src={png} className="image" />
                                        </div>
                                        <p className="about-tab-text">Gyms play a vital role in promoting an active and healthy lifestyle. They provide a supportive and motivating environment for individuals to engage in regular physical activity.</p>
                                    </div>
                                    <div className="btn-wrap mt-4">
                                        <a href="https://wptf.themepul.co/fitmas/contact/" target="_blank" rel="nofollow" className="btn ">View Class Schedule</a>
                                        <div className="about-info-wrap">
                                            <div className="icon"><FontAwesomeIcon icon={faPhone} className="fonticon" />
                                            </div>
                                            <div className="details">
                                                <p className="about-info-title"> Need Help? </p>
                                                <a className="about-info-link" href="#" target="_blank" rel="nofollow"> (+258) 2569 2582 </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
