import React from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/scrollbutton.scss";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 1110) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {isVisible && (
                <div id="scrollup" onClick={scrollToTop}>
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        aria-label="Scroll to Top"
                    />
                </div>
            )}
        </div>
    );
};

export default ScrollToTopButton;
