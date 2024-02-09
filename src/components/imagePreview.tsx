import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import "../styles/team.scss";

interface ImagePreviewProps {
    image: IGatsbyImageData | undefined;
    imagePath: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, imagePath }) => {
    return <>{image && <GatsbyImage image={image} alt={imagePath} className="content-overlay" />}</>;
};

export default ImagePreview;
