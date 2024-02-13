import React from "react";
import Layout from "../components/layout";
import About from "../components/about";
import Video from "../components/video";
import Service from "../components/service";
import Team from "../components/team";
import Contact from "../components/contact";
import Seo from "../components/seo";

const IndexPage: React.FC = () => {
    return (
        <Layout>
            <About />
            <Video />
            <Service />
            <Team />
            <Contact />
        </Layout>
    );
};

export default IndexPage;

export const Head = () => <Seo title="Home - Hair saloon" />;
