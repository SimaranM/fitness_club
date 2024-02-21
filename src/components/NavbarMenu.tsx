import React from "react";
import { Link } from "gatsby";
interface LinkData {
    linkName: string;
    linkURL: string;
}
export interface NavbarMenuProps {
    links: LinkData[];
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ links }) => {
    return (
        <div className="flex-grow-1">
            {links.map((value, index) => (
                <Link
                    key={index}
                    to={value.linkURL}
                    className="nav-item nav-link d-inline-block customnav">
                    {value.linkName}
                </Link>
            ))}
        </div>
    );
};

export default NavbarMenu;
