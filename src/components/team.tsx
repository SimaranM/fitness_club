import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import ImageGallery from "./imageGallery";
import "../styles/team.scss";

interface TeamMember {
    imageSrc: string;
    description: string;
    name: string;
    role: string;
    socialLinks: {
        icon: string;
        link: string;
    }[];
}

interface TeamData {
    titleFitness: string;
    titleCoaches: string;
    desc: string;
    team: TeamMember[];
}

const Team: React.FC = () => {
    const data = useStaticQuery(graphql`
        query {
            allTeamJson {
                nodes {
                    titleFitness
                    titleCoaches
                    desc
                    team {
                        imageSrc
                        description
                        name
                        role
                        socialLinks {
                            icon
                            link
                        }
                    }
                }
            }
            Team: allFile(filter: { relativeDirectory: { eq: "team" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData
                    }
                    name
                }
            }
        }
    `);

    const teamData: TeamData = data.allTeamJson.nodes[0];
    const iconMapping: Record<string, IconDefinition> = {
        faFacebookF,
        faTwitter,
        faInstagram,
        faGoogle,
    };
    const imageList = data.Team.nodes;

    return (
        <section id="team-area" className="pt-150 pb-150 team-area">
            <div className="container">
                <div className="row ">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="section-title text-center">
                            <h2>
                                {teamData.titleFitness}{" "}
                                <span>{teamData.titleCoaches}</span>
                            </h2>
                            <p>{teamData.desc}</p>
                        </div>
                    </div>
                </div>
                <div className="team-content pt-5">
                    <div className="row">
                        {teamData.team.map((teamMember, index) => (
                            <div
                                className="col-lg-4 col-md-6 col-sm-6 team-container mb-3"
                                key={index}>
                                <div className="team-box effect-item mt-40">
                                    <div className="team-item ">
                                        <ul>
                                            <ImageGallery
                                                imageList={imageList.filter(
                                                    (image: { name: string }) =>
                                                        image.name ===
                                                        teamMember.imageSrc,
                                                )}
                                            />
                                        </ul>
                                        <div className="content-details fadeIn-top">
                                            <ul>
                                                {teamMember.socialLinks.map(
                                                    (socialLink, linkIndex) => (
                                                        <li key={linkIndex}>
                                                            <a
                                                                href={
                                                                    socialLink.link
                                                                }>
                                                                {" "}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        iconMapping[
                                                                            socialLink
                                                                                .icon
                                                                        ]
                                                                    }
                                                                />{" "}
                                                            </a>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            <p>{teamMember.description}</p>
                                        </div>
                                    </div>
                                    <div className="team-title text-center">
                                        <h3>
                                            {" "}
                                            <a href="#">
                                                {" "}
                                                {teamMember.name}{" "}
                                            </a>{" "}
                                        </h3>
                                        <p>{teamMember.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
