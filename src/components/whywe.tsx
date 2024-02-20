import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import mainImage from "../images/whywe/mainImage.png"
import absolutIemage from "../images/whywe/absoluteImage.png"
import png from "../images/whywe/customer.png"
import "../styles/whywe.scss";

interface AccordionItem {
    isOpen: boolean;
}

const Team: React.FC = () => {
    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([
        { isOpen: false },
        { isOpen: false },
        { isOpen: false }
    ]);

    const toggleAccordion = (index: number) => {
        const newAccordionItems = accordionItems.map((item, i) => {
            if (i === index) {
                return { ...item, isOpen: !item.isOpen };
            }
            return item;
        });
        setAccordionItems(newAccordionItems);
    };

    return (
        <section className="whywe-section">
            <div className="container">
                <div className="d-flex main-section">
                    <div className="elementor">
                        <div className="elementor-widget-wrap">
                            <div className="elementor-element">
                                <div className="widget-container">
                                    <div className="about-image">
                                        <div className="container">
                                            <div className="thumb">
                                                <img src={mainImage} className="img-1" />
                                                <div className="img-2 jump">
                                                    <img src={absolutIemage} className="attachment-full size-full" alt="" />
                                                </div>
                                                <div className="box bounce-1">
                                                    <div className="icon">
                                                        <img src={png} />
                                                    </div>
                                                    <div className="details">
                                                        <h3 className="whywe-year"><span className="counter-number">25</span> + </h3>
                                                        <span className="whywe-text"> Years Experience </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="mb-5">
                            <div className="container text">
                                <span className="sub-title"> WHY CHOOSE US? </span>
                                <h2 className="sec-title"> Why Choose Us? </h2>
                                <div className="sec-text"> Our team of certified fitness professionals is committed to providing you with the highest level of expertise and support. </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="accordion-area accordion" id="faqAccordion">
                                <div className="accordion-area accordion" id="faqAccordion">
                                    {accordionItems.map((item, index) => (
                                        <div className={`accordion accordion-card ${item.isOpen ? 'active' : ''}`} key={index}>
                                            <div className="accordion-header d-flex justify-content-between align-items-center" onClick={() => toggleAccordion(index)}>
                                                <div>
                                                    What are your gym,s operating hours?
                                                </div>
                                                <div>
                                                    {item.isOpen ? <FontAwesomeIcon icon={faArrowDown} className="accordion-button" /> : <FontAwesomeIcon icon={faArrowRight} className="accordion-button" />}
                                                </div>
                                            </div>
                                            {item.isOpen && (
                                                <div id={`collapse-${index}`} className="accordion-collapse collapse show">
                                                    <div className="accordion-body">
                                                        <p className="faq-text">Your goals are our goals. Whether you're aiming to lose weight, build muscle, increase flexibility, or boost your endurance, we are dedicated to helping you achieve the results you desire.</p>
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
            </div>
        </section>
    );
};

export default Team;
