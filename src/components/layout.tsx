import React, { ReactNode } from "react";
import ScrollToTopButton from "./scrollbutton";
import "../styles/layout.scss";

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container-fluid p-0">
            {children}
            <ScrollToTopButton />
        </div>
    );
};

export default Layout;
