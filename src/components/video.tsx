import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "../styles/video.scss";

interface VideoImageData {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

const VideoSection: React.FC = () => {
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

  const videoData = data.allVideoJson.nodes[0];
  const thumbImage = data.images.nodes.find(
    (node: VideoImageData) => node.relativePath === videoData.Video
  );
  const videoImage = thumbImage?.childImageSharp.gatsbyImageData;

  const shapeImage = data.images.nodes.find(
    (node: VideoImageData) => node.relativePath === videoData.spinImage
  );
  const spinImage = shapeImage?.childImageSharp.gatsbyImageData;

  const [showLearnMore, setShowLearnMore] = useState(false);

  const toggleLearnMore = () => {
    setShowLearnMore(!showLearnMore);
  };

  return (
    <div className="video-area pt-5">
      <div className="container">
        <div className="row mb-80 pb-5">
          <div className="col-xl-6 col-lg-6">
            <div className="section-title">
              <h3 className="bars">
                <span>{videoData.title.prefix}</span> {videoData.title.mainText}
                <span>{videoData.title.centerText}</span> {videoData.title.suffix}
              </h3>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="video-text">
              <p>{videoData.desc}</p>
              {showLearnMore && <p>{videoData.learnMore}</p>}
              <a href="#" className="btn btn-gra"
                onClick={(e) => {
                  e.preventDefault();
                  toggleLearnMore();
                }}
              >
                {showLearnMore ? "Learn Less" : "Learn More"}{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="video-wrap mb--130">
              {videoImage && <GatsbyImage image={videoImage} alt="" />}
              <div className="video-play">
                <a href="" className="popup-video">
                  <FontAwesomeIcon icon={faPlay} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-shape">
        {spinImage && (
          <GatsbyImage image={spinImage} className="rotateme" alt="shape" />
        )}
      </div>
    </div>
  );
};

export default VideoSection;