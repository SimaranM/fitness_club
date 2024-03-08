import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import FormInputs from "./FormInputs";
import CustomButton from "./CustomButton";
import "../styles/contact.scss";

interface FormInput {
    type: string;
    placeholder: string;
    name: string;
}

interface ContactData {
    mainTitle: string;
    title: string;
    news: string;
    desc: string;
    button: string;
    contactUs: { icon: string; link: string }[];
    formInputs: FormInput[];
    formTextArea: { name: string; placeholder: string };
    submitButton: { type: string; text: string };
}

const Contact: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allContactJson {
                nodes {
                    mainTitle
                    title
                    news
                    desc
                    button
                    contactUs {
                        icon
                        link
                    }
                    formInputs {
                        type
                        placeholder
                        name
                    }
                    formTextArea {
                        name
                        placeholder
                    }
                    submitButton {
                        type
                        text
                    }
                }
            }
        }
    `);

    const contactData: ContactData = data.allContactJson.nodes[0];

    const formInputs: FormInput[] = contactData.formInputs;
    const values: boolean[] = [true];

    const iconMapping: Record<string, IconDefinition> = {
        faFacebookF,
        faTwitter,
        faInstagram,
        faGoogle,
    };

    return (
        <React.Fragment>
            <section id="contact-top contact" className="contact">
                <div className="section-overlay" id="contact"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 pt-5 pb-5 text-center">
                            <h1>{contactData.mainTitle}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-page ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="contact-page-left">
                                <div className="section-title text-left mb-4">
                                    <span className="section-title-tagline fw-bold d-inline-block fs-6 lh-1 mb-5">
                                        {contactData.title}
                                    </span>
                                    <h2>{contactData.news}</h2>
                                </div>
                                <p className="contact-page-text">
                                    {contactData.desc}
                                </p>
                                <div className="contact-page-social d-flex mt-5 mb-3">
                                    {contactData.contactUs.map(
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
                        <div className="col-xl-8 col-lg-7">
                            <div className="contact-page-right">
                                <div className="contact-page-content">
                                    <form
                                        action=""
                                        className="contact-page-form">
                                        <div className="row">
                                            <FormInputs
                                                formInputs={formInputs}
                                            />
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="contact-page-form-input-box mb-4">
                                                <textarea
                                                    className="w-100 h-100 fs-6 ps-3 pb-5 pt-3 d-block"
                                                    name={
                                                        contactData.formTextArea
                                                            .name
                                                    }
                                                    placeholder={
                                                        contactData.formTextArea
                                                            .placeholder
                                                    }></textarea>
                                            </div>
                                            <div className="contact-page-btn-box">
                                                {values.map((v, idx) => (
                                                    <CustomButton
                                                        key={idx}
                                                        onClick={() => null}
                                                        buttonText={
                                                            contactData.button
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                    <div className="result"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Contact;
