import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/CustomButton.scss";

interface CustomButtonProps {
    onClick: () => void;
    buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, buttonText }) => {
    return (
        <Button className="btn" onClick={onClick}>
            {buttonText}
        </Button>
    );
};


export default CustomButton;
