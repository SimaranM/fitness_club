import React, { ReactNode } from "react";
import Header from "./header";
import ScrollToTopButton from "./scrollbutton";
import Footer from "./footer";
import "../styles/layout.scss";

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container-fluid p-0">
            <Header />
            {children}
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default Layout;
