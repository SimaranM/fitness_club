import * as React from "react";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";
import ImagePreview from "./imagePreview";

interface ImageGalleryProps {
    imageList: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageList }) => {
    return (
        <>
            {imageList.length > 0 ? (
                imageList.map((imageUrl, index) => {
                    let templateLogo;
                    let imagePath = "";
                    if (imageUrl) {
                        templateLogo = getImage(
                            imageUrl.childImageSharp.gatsbyImageData,
                        );
                        if (templateLogo) {
                            imagePath =
                                templateLogo.images.fallback?.src ||
                                "Service Gallery";
                        }
                    }
                    return (
                        <div className="service-thumb" key={index}>
                            <a href={imagePath}>
                                <ImagePreview
                                    image={templateLogo}
                                    imagePath={imagePath}
                                />
                            </a>
                        </div>
                    );
                })
            ) : (
                <div className="col-12">
                    <p>No images available</p>
                </div>
            )}
        </>
    );
};
export default ImageGallery;
