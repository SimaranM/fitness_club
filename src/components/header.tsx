import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { GatsbyImage } from "gatsby-plugin-image";
import NavbarMenu, { NavbarMenuProps } from "./NavbarMenu";
import "../styles/header.scss";

interface HeaderData {
    contact: string;
    phone: string;
    buttonName: string;
}

const Header: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allHeaderJson {
                nodes {
                    contact
                    phone
                    buttonName
                    navbar {
                        links {
                            linkName
                            linkURL
                        }
                    }
                }
            }
            allFile(filter: { relativeDirectory: { eq: "logo" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData(width: 200)
                    }
                }
            }
        }
    `);
    const headerData: HeaderData = data.allHeaderJson.nodes[0];
    const navbar: NavbarMenuProps = data.allHeaderJson.nodes[0].navbar;
    const imageData = data.allFile.nodes[0]?.childImageSharp?.gatsbyImageData;

    return (
        <section>
            <div className="bg-light header">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="py-3 text-center">
                            <Link to="/" className="logoimg">
                                {imageData && (
                                    <GatsbyImage
                                        image={imageData}
                                        alt="logo"
                                        className="invert"
                                    />
                                )}
                            </Link>
                        </div>
                        <div className="p-2 text-end">
                            <div className="d-inline-block mx-3 compact align-middle">
                                <span className="fs-3">
                                    {" "}
                                    {headerData.contact}{" "}
                                </span>
                                <br />
                                <span className="fs-5">{headerData.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <button
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#bottomnavbar"
                    className="button w-100 d-lg-none d-md-none d-sm-block d-xs-block rounded-0 p-2">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div
                    className="collapse navbar-collapse px-2"
                    id="bottomnavbar">
                    <div className="container-fluid">
                        <div id="removeflex">
                            <NavbarMenu links={navbar.links} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
